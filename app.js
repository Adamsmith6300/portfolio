$(document).ready(function(){

var view = ["rotateY(0deg)","rotateY(90deg)","rotateY(180deg)","rotateY(270deg)"];
var x = 0;
var y = 0;
var circles = $(".menu i");
var circleNum = ["one", "two", "three", "four"];

function jumpCircle(el){
  $(".menu i").removeClass("fa-circle");
  $(".menu i").addClass("fa-circle-thin");
  $(el).addClass("fa-circle");
  $(el).removeClass("fa-circle-thin");
}

$(".next").click(function(){
  x++;
  y = y + 90;
  jumpCircle(circles[x]);
  if (x > 3){
    x = 0;
    jumpCircle(circles[x]);
  }
  $("#room").css("transform", "rotateY(" + y + "deg)");
});

$(".back").click(function(){
  x--;
  y = y - 90;
  jumpCircle(circles[x]);
  if (x < 0) {
    x = 3;
    jumpCircle(circles[x]);
  }
  $("#room").css("transform", "rotateY(" + y + "deg)");
});

// circles menu control
$(circles).click(function(){
  for (var i = 0; i < circleNum.length; i++){
    if (this.classList.contains(circleNum[i])){
      $("#room").css("transform", view[i]);
      jumpCircle(this);
      x = i;
      y = i * 90;
    }
  }
});

// portfolio project caption control for desktop/mobile, hover vs click/tap
if ( $(window).width() > 900) {
  $("#room div").hover(function(){
    $(this).children("p").addClass("caption-full");
    $(this).find("small, a").removeClass("inactive");
  }, function(){
    $(this).children("p").removeClass("caption-full");
    $(this).find("small, a").addClass("inactive");
  });
} else {
  $(".caption").on("click touch", function(){
    $(".caption").toggleClass("caption-full");
    $(".caption").find("small, a").toggleClass("inactive");
  });
}

});



// These functions allow the user to see eight walls with portfolio content instead of just four when active
// function flipRoom(){
//   $(".room-five, .room-six, .room-seven, .room-eight").removeClass("inactive");
//   $(".room-one, .room-two, .room-three, .room-four").addClass("inactive");
// }
//
// function flipRoomBack(){
//   $(".room-five, .room-six, .room-seven, .room-eight").addClass("inactive");
//   $(".room-one, .room-two, .room-three, .room-four").removeClass("inactive");
// }

// original code for when there were eight walls in use
// $(".next").click(function(){
//   x++;
//   y = y + 90;
//   jumpCircle(circles[x]);
//   if (x === 4){
//     flipRoom();
//   } else if (x > 7) {
//     x = 0;
//     flipRoomBack();
//     jumpCircle(circles[x]);
//   }
//   $("#room").css("transform", "rotateY(" + y + "deg)");
// });
//
// $(".back").click(function(){
//   x--;
//   y = y - 90;
//   jumpCircle(circles[x]);
//   if (x === 3){
//     flipRoomBack();
//   } else if (x < 0) {
//     x = 7;
//     flipRoom();
//     jumpCircle(circles[x]);
//   }
//   $("#room").css("transform", "rotateY(" + y + "deg)");
// });
