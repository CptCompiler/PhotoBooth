var express = require('express');
var app = express();

const path = require('path');

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
  var open = require('open');
  open('http://localhost:3000');
});


var chokidar = require('chokidar');

var watcher = chokidar.watch('public/photos/*.jpg', {
  ignored: /[\/\\]\./, persistent: true
});

watcher.on('add', function(newFile) {
  io.emit('new photo', path.basename(newFile));
});