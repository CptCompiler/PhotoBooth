var socket = io();



var images = $('.images').data('images');
var currentImageDiv = $('.imageOne');
var nextImageDiv = $('.imageTwo');
var overlay = $('.overlay');
currentImageDiv.html('<img src="photos/' + images[0] + '">');

socket.on('new photo', function(msg){
  $('.image').attr('src', 'photos/' + msg);
  images.push(msg);
  setNewImage(images.length-1);
});

setInterval(function() {
  setNewImage(Math.floor(Math.random() * images.length));
}, 5000);


function setNewImage(imageIndex) {
  //currentImageDiv.addClass('fadeOut');
  //currentImageDiv.css('-webkit-transform', 'translateY(-50%) rotateZ(' + (Math.random() * 20 -10) + 'deg) scale(0.5)');
  //currentImageDiv.attr('style', '-webkit-transform: translateY(150%) ');

  //currentImageDiv.removeClass('fadeIn');

  overlay.addClass('visible');
  setTimeout(function() {
    currentImageDiv.attr('src', 'photos/' + images[imageIndex]);
    
    setTimeout(function() {
      overlay.removeClass('visible');
    }, 2000);
  }, 1000);
  
  
  
  //nextImageDiv.removeClass('fadeOut');
  //nextImageDiv.addClass('fadeIn');
  //nextImageDiv.css('-webkit-transform', 'translateY(-50%) rotateZ(' + (Math.random() * 20 -10) + 'deg) scale(1)');
  //nextImageDiv.attr('style', '-webkit-transform: translateY(-50%) ');
  //var temp = currentImageDiv;
  //currentImageDiv = nextImageDiv;
  //nextImageDiv = temp;
}