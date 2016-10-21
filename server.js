var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('./public'));

io.on('connection', function(socket){
  console.log(socket.id);
    socket.on('test', function(stuff){
      console.log(stuff);
      console.log('test');
      socket.emit("hey", stuff)
    })

    io.on('disconnect', function(){

    })

});

http.listen(9001, function(){
  console.log("I'm listening...");
})
