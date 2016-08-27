var socket = io();



var images = $('.images').data('images');
var currentImageDiv = $('.imageOne');
var nextImageDiv = $('.imageTwo');
currentImageDiv.html('<img src="photos/' + images[0] + '">');

socket.on('new photo', function(msg){
  $('.image').attr('src', 'photos/' + msg);
  images.push(msg);
  setNewImage(images.length-1);
});

setInterval(function() {
  setNewImage(Math.floor(Math.random() * images.length));
}, 10000);


function setNewImage(imageIndex) {
  currentImageDiv.addClass('fadeOut');
  currentImageDiv.removeClass('fadeIn');
  nextImageDiv.html('<img src="photos/' + images[imageIndex] + '">');
  nextImageDiv.removeClass('fadeOut');
  nextImageDiv.addClass('fadeIn');
  var temp = currentImageDiv;
  currentImageDiv = nextImageDiv;
  nextImageDiv = temp;
}