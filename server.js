var express = require('express');
var app = express();

const path = require('path');

var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.static('public'));

var photos = fs.readdirSync(__dirname + '/public/photos/').filter(function(e) {
  return e.indexOf('.jpg') != -1;
});

var takingPhoto = false;

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
    console.log('taki photo!!');
    takePicture();
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
  var open = require('open');
  open('http://localhost:3000');
});





var gphoto2 = require('gphoto2');
var GPhoto = new gphoto2.GPhoto2();


var camera;
// List cameras / assign list item to variable to use below options
GPhoto.list(function (list) {
  if (list.length === 0) return;
  camera = list[0];
  console.log('Found', camera.model);
   
});

function takePicture() {
  if (takingPhoto) {
    return;
  }
  takingPhoto = true;
  deactivateSlideshow();
  io.emit('taking photo');
  setTimeout(function() {

    camera.takePicture({download: true}, function (er, data) {
      io.emit('loading');
      var fileName = new Date();
      var path = __dirname + '/public/photos/';
      fs.writeFileSync('archive/' + fileName + '.jpg', data);
      
      var epeg = require("epeg");
      var image = new epeg.Image({data: data});
      buffer = image.downsize(1280, 900).process();
      fs.writeFileSync(path + fileName + '.jpg', buffer);
      photos.push(fileName + '.jpg');
      io.emit('new photo', fileName + '.jpg');
      activateSlideshow();
      takingPhoto = false;
    });
  }, 5000);
}



var slideshowInterval = null;
var slideshowTimer = null;


activateSlideshow();
function activateSlideshow() {
  slideshowTimer = setTimeout(function() {
    slideshowInterval = setInterval(function() {
      io.emit('show photo', photos[Math.floor(Math.random() * photos.length)]);
    }, 6000);
  }, 30000);
}

function deactivateSlideshow() {
  if (slideshowTimer) {
    clearTimeout(slideshowTimer);
    slideshowTimer = null;
  }
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
  }
}


// var Gpio = require('pigpio').Gpio;
// var button = new Gpio(4, {
//   mode: Gpio.INPUT,
//   pullUpDown: Gpio.PUD_DOWN,
//   edge: Gpio.EITHER_EDGE
// });

// button.on('interrupt', function (level) {
//   console.log('button pressed');
// });

