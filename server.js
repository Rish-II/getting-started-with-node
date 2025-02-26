var app = require('express')();
var mongoose = require('mongoose');
var fetch = require('node-fetch');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : 'srv-captain--ujsrthkwxa',
  user     : 'root',
  password : 'rk922989',
  database : 'test-db'
});

var sock = null;

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
  }

  console.log('connected as id ' + connection.threadId);
});

// var userSchema = new Schema({
//   name: {
//       firstName: {
//           type: String,
//           required: true
//       },
//       lastName: String
//   }
// });

// var User = mongoose.model('User', userSchema);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});

function insertNow(data)
{
    let insertQuery = 'INSERT INTO `test-table` (`id`,`user`,`email`,`password`) VALUES (?,?,?,?)';
    connection.execute(insertQuery, ["0",data,"teml","tpwd"], (er, rsp) =>
        {
      console.log(er);
            if (er) sock.emit("response message", er.toString());
            else
            {
                sock.emit("response message", "Task Done");
            }
        });
}

io.on('connection', function(socket){
  sock = socket;
    console.log('a user connected');
    socket.on('joined', function(data) {
        console.log(data);
//         socket.emit('acknowledge', 'Acknowledged');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
      fetch('https://bot-battle.cf/check.php?msg=' + msg);
        try {insertNow(msg);}catch(tt){console.log(tt);}
//         socket.emit('response message', msg + '  from server');
        //socket.broadcast.emit('response message', msg + '  from server');
    });
});

http.listen(8080, function(){
    console.log('listening on *:8080');
});
