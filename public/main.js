var socket = io();



var images = $('.images').data('images');
var currentImageDiv = $('.imageOne');
var nextImageDiv = $('.imageTwo');
var overlay = $('.overlay');
var overlayText = $('.overlay .text');
currentImageDiv.html('<img src="photos/' + images[0] + '">');

var slideshowInterval = null;
var slideshowTimer = null;

activateSlideshow();
function activateSlideshow() {
  slideshowTimer = setTimeout(function() {
    slideshowInterval = setInterval(function() {
      setNewImage(Math.floor(Math.random() * images.length));
    }, 4000);
  }, 1000);
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



// socket.on('new photo', function(msg){
//   $('.image').attr('src', 'photos/' + msg);
//   images.push(msg);
//   setNewImage(images.length-1);
//   activateSlideshow();
// });

// socket.on('taking photo', function(msg){
//   deactivateSlideshow();
//   overlay.addClass('visible');
//   setTimeout(function() { 
//     overlayText.text('3');
//     setTimeout(function() { 
//       overlayText.text('2');
//       setTimeout(function() { 
//         overlayText.text('1');
//         setTimeout(function() { 
//           overlayText.text('cheese');
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// });





function setNewImage(imageIndex) {
  currentImageDiv.addClass('fadeOut');
  //currentImageDiv.css('-webkit-transform', 'translateY(-50%) rotateZ(' + (Math.random() * 20 -10) + 'deg) scale(0.5)');
  currentImageDiv.attr('style', '-webkit-transform: translate(' + ((Math.floor((Math.random() * 10) % 2) - 1) * 100) + '%, '  + (Math.random() * 200 -100) + '%) rotateZ(' + (Math.random() * 20 -10) + 'deg) scale(0)');

  currentImageDiv.removeClass('fadeIn');
  nextImageDiv.html('<img src="photos/' + images[imageIndex] + '">');
  nextImageDiv.removeClass('fadeOut');
  nextImageDiv.addClass('fadeIn');
  //nextImageDiv.css('-webkit-transform', 'translateY(-50%) rotateZ(' + (Math.random() * 20 -10) + 'deg) scale(1)');
  nextImageDiv.attr('style', '-webkit-transform: translate(0, -50%) rotateZ(' + (Math.random() * 20 -10) + 'deg) scale(1)');
  var temp = currentImageDiv;
  currentImageDiv = nextImageDiv;
  nextImageDiv = temp;


  // overlay.addClass('visible');
  // setTimeout(function() {
  //   currentImageDiv.attr('src', 'photos/' + images[imageIndex]);
  //   setTimeout(function() {
  //     overlay.removeClass('visible');
  //   }, 2000);
  // }, 1000);
}