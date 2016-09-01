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
var fs = require('fs');

var camera;
// List cameras / assign list item to variable to use below options
GPhoto.list(function (list) {
  if (list.length === 0) return;
  camera = list[0];
  console.log('Found', camera.model);
   
});

function takePicture() {
  //setInterval(function() {
    io.emit('taking photo');
    setTimeout(function() {
      camera.takePicture({download: true}, function (er, data) {
        var fileName = new Date();
        var path = __dirname + '/public/photos/';
        fs.writeFileSync('archive/' + fileName + '.jpg', data);
        
        var epeg = require("epeg");
        var image = new epeg.Image({data: data});
        buffer = image.downsize(1280, 900).process();
        fs.writeFileSync(path + fileName + '.jpg', buffer);
        
        io.emit('new photo', fileName + '.jpg');
      });
      //io.emit('new photo', 'test.jpg');
    }, 5000);
  //}, 60000);
}


// var Gpio = require('pigpio').Gpio;
// var button = new Gpio(14, {
//   mode: Gpio.INPUT,
//   pullUpDown: Gpio.PUD_DOWN,
//   edge: Gpio.EITHER_EDGE
// });

// button.on('interrupt', function (level) {
//   console.log('button pressed');
// });

