$(document).ready(function(){

var view = ["rotateY(0deg)","rotateY(90deg)","rotateY(180deg)","rotateY(270deg)","rotateY(360deg)","rotateY(450deg)","rotateY(540deg)","rotateY(630deg)"];
var x = 0;
var y = 0;
var circles = $("p i");

function flipRoom(){
  $(".room-five, .room-six, .room-seven, .room-eight").removeClass("inactive");
  $(".room-one, .room-two, .room-three, .room-four").addClass("inactive");
}

function flipRoomBack(){
  $(".room-five, .room-six, .room-seven, .room-eight").addClass("inactive");
  $(".room-one, .room-two, .room-three, .room-four").removeClass("inactive");
}

function jumpCircle(el){
  $("p i").removeClass("fa-circle");
  $("p i").addClass("fa-circle-thin");
  $(el).addClass("fa-circle");
  $(el).removeClass("fa-circle-thin");
}

$(".next").click(function(){
  x++;
  y = y + 90;
  jumpCircle(circles[x]);
  if (x === 4){
    setTimeout(flipRoom, 200);
    // flipRoom();
  } else if (x > 7) {
    x = 0;
    setTimeout(flipRoomBack, 200);
    // flipRoomBack();
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
    setTimeout(flipRoomBack, 200);
    // flipRoomBack();
  } else if (x < 0) {
    x = 7;
    setTimeout(flipRoom, 200);
    // flipRoom();
    jumpCircle(circles[x]);
  }
  $("#room").css("transform", "rotateY(" + y + "deg)");
});


// NEEDS TO BE REFACTORED********
$(circles[0]).click(function(){
  $("#room").css("transform", view[0]);
  setTimeout(flipRoomBack, 250);
  jumpCircle(this);
  x = 0;
  y = 0;
});

$(circles[1]).click(function(){
  $("#room").css("transform", view[1]);
  setTimeout(flipRoomBack, 250);
  jumpCircle(this);
  x = 1;
  y = 90;
});

$(circles[2]).click(function(){
  $("#room").css("transform", view[2]);
  setTimeout(flipRoomBack, 250);
  jumpCircle(this);
  x = 2;
  y = 180;
});

$(circles[3]).click(function(){
  $("#room").css("transform", view[3]);
  setTimeout(flipRoomBack, 300);
  jumpCircle(this);
  x = 3;
  y = 270;
});

$(circles[4]).click(function(){
  $("#room").css("transform", view[4]);
  setTimeout(flipRoom, 300);
  jumpCircle(this);
  x = 4;
  y = 360;
});

$(circles[5]).click(function(){
  $("#room").css("transform", view[5]);
  setTimeout(flipRoom, 300);
  jumpCircle(this);
  x = 5;
  y = 450;
});

$(circles[6]).click(function(){
  $("#room").css("transform", view[6]);
  setTimeout(flipRoom, 300);
  jumpCircle(this);
  x = 6;
  y = 540;
});

$(circles[7]).click(function(){
  $("#room").css("transform", view[7]);
  setTimeout(flipRoom, 300);
  jumpCircle(this);
  x = 7;
  y = 630;
});


$("#room a").hover(function(){
  $(this).children("p").addClass("caption-full");
  $(this).find("small").removeClass("inactive");
}, function(){
  $(this).children("p").removeClass("caption-full");
  $(this).find("small").addClass("inactive");
});

});
