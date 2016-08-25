var socket = io();



$(document).ready(function(){
  var owlContainer = $('.owl-carousel');
  var owl = owlContainer.owlCarousel({
    loop:false,
    margin:10,
    nav:true,
    items: 1
  });

  owl.on('change.owl.carousel', function() {
    console.log('changed');
  });


  socket.on('new photo', function(msg){
    console.log('message: ' + msg);
    owl.trigger('add.owl.carousel', ['<img src="photos/' + msg + '">', 0]);
  });
  
});