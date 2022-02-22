var app = require('express')();
var mongoose = require('mongoose');
var fetch = require('node-fetch');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var userSchema = new Schema({
  name: {
      firstName: {
          type: String,
          required: true
      },
      lastName: String
  }
});

var User = mongoose.model('User', userSchema);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('joined', function(data) {
        console.log(data);
        socket.emit('acknowledge', 'Acknowledged');
    });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
      fetch('https://bot-battle.cf/check.php?msg=' + msg);
        socket.emit('response message', msg + '  from server');
        //socket.broadcast.emit('response message', msg + '  from server');
    });
});

http.listen(8080, function(){
    console.log('listening on *:8080');
});
