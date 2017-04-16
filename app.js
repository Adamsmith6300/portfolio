$(document).ready(function(){

var view = ["rotateY(0deg)","rotateY(90deg)","rotateY(180deg)","rotateY(270deg)","rotateY(360deg)","rotateY(450deg)","rotateY(540deg)","rotateY(630deg)"];
var x = 0;
var y = 0;
var circles = $(".menu i");
var circleNum = ["one", "two", "three", "four", "five", "six", "seven", "eight"];

// need to create crazy long offset delayed transitions to smooth out room flips
function flipRoom(){
  $(".room-five, .room-six, .room-seven, .room-eight").removeClass("inactive");
  $(".room-one, .room-two, .room-three, .room-four").addClass("inactive");
}

function flipRoomBack(){
  $(".room-five, .room-six, .room-seven, .room-eight").addClass("inactive");
  $(".room-one, .room-two, .room-three, .room-four").removeClass("inactive");
}

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
  if (x === 4){
    flipRoom();
  } else if (x > 7) {
    x = 0;
    flipRoomBack();
    jumpCircle(circles[x]);
  }
  $("#room").css("transform", "rotateY(" + y + "deg)");
});

$(".back").click(function(){
  x--;
  y = y - 90;
  console.log(x);
  jumpCircle(circles[x]);
  if (x === 3){
    flipRoomBack();
  } else if (x < 0) {
    x = 7;
    flipRoom();
    jumpCircle(circles[x]);
  }
  $("#room").css("transform", "rotateY(" + y + "deg)");
});

// circles menu control
$(circles).click(function(){
  for (var i = 0; i < circleNum.length; i++){
    if (this.classList.contains(circleNum[i])){
      $("#room").css("transform", view[i]);
      flipRoomBack();
      jumpCircle(this);
      x = i;
      y = i * 90;
    }
  }
});

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
