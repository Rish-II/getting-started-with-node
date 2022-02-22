var app = require('express')();
var mongoose = require('mongoose');
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
  try
  {
    mongoose.connect('mongodb://srv-captain--hqcidoyxst/tstsdb', function (err) {
       if (err) { console.log(err); return; }
       console.log('Successfully connected');
       
       // Create User Obiect 
        var UserObject = new User({
            name: {
              firstName: 'Sample',
              lastName: 'Example'
            }
         });
         
       //Save the document into User table.
       UserObject.save(function(err){
        if (err) console.log(err);
       })
       
       //Find the all user in User table.
//        User.find({}, function(err, dbUsers){
//         if (err) throw err;
//           console.log(JSON.stringify(dbUsers));
//        });
       
    });
  } catch (er) {console.log(er);}
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
        socket.emit('response message', msg + '  from server');
        //socket.broadcast.emit('response message', msg + '  from server');
    });
});

http.listen(8080, function(){
    console.log('listening on *:8080');
});
