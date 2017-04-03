var p1Button = document.querySelector("#p1");
var p2Button = document.querySelector("#p2");
var p1Scoreboard = document.querySelector("#p1Score");
var p2Scoreboard = document.querySelector("#p2Score");
var p1Score = 0;
var p2Score = 0;
var endScore = 5;
var endScoreDisplay = document.querySelector("p span");
var gameOver = false;
var input = document.querySelector("input");
var resetButton = document.querySelector("#reset");


input.addEventListener("change", function(){
	endScoreDisplay.textContent = input.value
	endScore = Number(input.value);
	reset();

});

p1Button.addEventListener("click", function(){
	if (!gameOver){
	p1Score += 1;
	p1Scoreboard.textContent = p1Score;
	if (p1Score === endScore){
		p1Scoreboard.classList.add("winner");
		gameOver = true;
	};
};
});

p2Button.addEventListener("click", function(){
	if (!gameOver){
	p2Score += 1;
	p2Scoreboard.textContent = p2Score;
	if (p2Score === endScore){
		p2Scoreboard.classList.add("winner");
		gameOver = true;
	};
};

});

resetButton.addEventListener("click", reset);

function reset() {

	p1Score = 0;
	p2Score = 0;
	p1Scoreboard.textContent = p1Score;
	p2Scoreboard.textContent = p2Score;
	p1Scoreboard.classList.remove("winner");
	p2Scoreboard.classList.remove("winner");
	gameOver = false;

}



