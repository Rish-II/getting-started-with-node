var app = require('express')();
var mongoose = require('mongoose');
var fetch = require('node-fetch');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'srv-captain--ujsrthkwxa',
  user     : 'root',
  password : 'rk922989',
  database : 'test-db'
});

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
    let insertQuery = 'INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)';
    let query = mysql.format(insertQuery,["test-table","id","user","email","password","0",data,"teml","tpwd"]);
    connection.query(query, (er, rsp) =>
        {
            if (er) socket.emit("response message", er.toString());
            else
            {
                socket.emit("response message", "Task Done");
            }
        });
}

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('joined', function(data) {
        console.log(data);
//         socket.emit('acknowledge', 'Acknowledged');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
      fetch('https://bot-battle.cf/check.php?msg=' + msg);
        insertNow(msg);
//         socket.emit('response message', msg + '  from server');
        //socket.broadcast.emit('response message', msg + '  from server');
    });
});

http.listen(8080, function(){
    console.log('listening on *:8080');
});
