var socket = io();



var images = $('.images').data('images');
var currentImageDiv = $('.imageOne');
var nextImageDiv = $('.imageTwo');
var overlay = $('.overlay');
var bgText = $('.bg .text');
currentImageDiv.html('<img src="photos/' + images[0] + '">');

var slideshowInterval = null;
var slideshowTimer = null;


$('.photoBtn').click(function() {
  socket.emit('take photo');
});

// activateSlideshow();
// function activateSlideshow() {
//   slideshowTimer = setTimeout(function() {
//     slideshowInterval = setInterval(function() {
//       setNewImage(Math.floor(Math.random() * images.length));
//     }, 6000);
//   }, 30000);
// }

// function deactivateSlideshow() {
//   if (slideshowTimer) {
//     clearTimeout(slideshowTimer);
//     slideshowTimer = null;
//   }
//   if (slideshowInterval) {
//     clearInterval(slideshowInterval);
//     slideshowInterval = null;
//   }
// }


socket.on('loading', function(msg){
  bgText.text('Loading...');
});

socket.on('show photo', function(msg){
  setNewImage(msg);
});

socket.on('new photo', function(msg){
  $('.image').attr('src', 'photos/' + msg);
  images.push(msg);
  setNewImage(msg);
  console.log("new photo", msg);
});

socket.on('taking photo', function(msg){
  currentImageDiv.addClass('fadeOut');
  currentImageDiv.attr('style', '-webkit-transform: translate(' + ((Math.floor((Math.random() * 10) % 2) - 1) * 100) + '%, '  + (Math.random() * 200 -100) + '%) rotateZ(' + (Math.random() * 20 -10) + 'deg) scale(0)');
  setTimeout(function() { 
    bgText.text('3');
    setTimeout(function() { 
      bgText.text('2');
      setTimeout(function() { 
        bgText.text('1');
        setTimeout(function() { 
          bgText.text('cheese');
        }, 1000);
      }, 1000);
    }, 1000);
  }, 2000);
});





function setNewImage(imageFileName) {
  currentImageDiv.addClass('fadeOut');
  currentImageDiv.attr('style', '-webkit-transform: translate(' + ((Math.floor((Math.random() * 10) % 2) - 1) * 100) + '%, '  + (Math.random() * 200 -100) + '%) rotateZ(' + (Math.random() * 20 -10) + 'deg) scale(0)');

  currentImageDiv.removeClass('fadeIn');
  nextImageDiv.html('<img src="photos/' + imageFileName + '">');
  nextImageDiv.removeClass('fadeOut');
  nextImageDiv.addClass('fadeIn');
  //nextImageDiv.css('-webkit-transform', 'translateY(-50%) rotateZ(' + (Math.random() * 20 -10) + 'deg) scale(1)');
  nextImageDiv.attr('style', '-webkit-transform: translate(0, -50%) rotateZ(' + (Math.random() * 20 -10) + 'deg) scale(1)');
  var temp = currentImageDiv;
  currentImageDiv = nextImageDiv;
  nextImageDiv = temp;

  setTimeout(function() { 
    bgText.text('');
  }, 2000);
  
}