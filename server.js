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

  // get configuration tree
  camera.getConfig(function (er, settings) {
    console.log(settings);
  });

  // // Set configuration values
  // camera.setConfigValue('capturetarget', 1, function (er) {
  //   //...
  // });


  setInterval(function {
    camera.takePicture({download: true}, function (er, data) {
      var fileName = new Date();
      var path = __dirname + '/public/photos/';
      fs.writeFileSync(path + fileName + '.jpg', data);
      io.emit('new photo', fileName + '.jpg');
      // require('lwip').open(path + fileName + '.jpg', function(err, image){
      //   console.log(err);
      //   // check err...
      //   // define a batch of manipulations and save to disk as JPEG:
      //   image.batch()
      //     .scale(0.1)          // scale to 75%
      //     //.rotate(45, 'white')  // rotate 45degs clockwise (white fill)
      //     //.crop(200)            // crop a 200X200 square from center
      //     //.blur(5)              // Gaussian blur with SD=5
      //     .writeFile(path + fileName + '_small.jpg', function(err){
      //       // check err...
      //       // done.
      //       console.log(err);

      //     });

      // });
    });
  }, 5000);
});
