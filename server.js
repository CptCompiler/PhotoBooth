var express = require('express');
var app = express();

const path = require('path');

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index',
    { pics : fs.readdirSync(__dirname + '/public/photos/').filter(function(e) {
      return e.indexOf('.jpg') != -1;
    }) }
  );
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('take photo', function() {
    camera.takePicture({download: true}, function (er, data) {
    var fileName = new Date();
    var path = __dirname + '/public/photos/';
    fs.writeFileSync(path + fileName + '.jpg', data);
    io.emit('new photo', fileName + '.jpg');
   });
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
  var open = require('open');
  open('http://localhost:3000');
});


// var chokidar = require('chokidar');

// var watcher = chokidar.watch('public/photos/*.jpg', {
//   ignored: /[\/\\]\./, persistent: true
// });

// watcher.on('add', function(newFile) {
//   io.emit('new photo', path.basename(newFile));
// });




var gphoto2 = require('gphoto2');
var GPhoto = new gphoto2.GPhoto2();
var fs = require('fs');

var camera;
// List cameras / assign list item to variable to use below options
GPhoto.list(function (list) {
  if (list.length === 0) return;
  camera = list[0];
  console.log('Found', camera.model);
  takePicture();  
});

function takePicture() {
  setInterval(function() {
    camera.takePicture({download: true}, function (er, data) {
      var fileName = new Date();
      var path = __dirname + '/public/photos/';
      fs.writeFileSync('archive/' + fileName + '.jpg', data);
      
      var epeg = require("epeg");
      var image = new epeg.Image({data: data});
      buffer = image.downsize(100, 100).process();
      fs.writeFileSync(path + fileName + '.jpg', buffer);
      
      io.emit('new photo', fileName + '.jpg');
    });
  }, 20000);
}