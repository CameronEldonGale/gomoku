var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var room = {};
app.use(express.static('./public'));

io.on('connection', function(socket){

  socket.on('enter', function (name) {
    room[ socket.id] = name
    console.log(room[ socket.id] );
  })
    socket.on('chat', function(stuff){
      var chatMessage = {
        time: new Date(),
        name: room[ socket.id],
        message: stuff
      }
      console.log(room[socket.id]+' : '+ chatMessage.message);
      socket.emit("hey", chatMessage)
    })

    io.on('disconnect', function(){

    })

});

http.listen(9001, function(){
  console.log("I'm listening...");
})
