//color sequence store
var gamePattern=[];

//user color choosen
var userClickPattern=[];

//add an array of four buttonColors
var buttonColors=["red", "blue", "green", "yellow"];
var started=false;
//level
var level= 0;

//start the game
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level );
    nextSequence();
    started=true;
  }
});


//Select button when click
$(".btn").click(function(){
  //store the id of the button in the variable
  var userChosenColor=$(this).attr("id");
  userClickPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickPattern.length-1);

});

//chcek answer
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickPattern[currentLevel]){

    if (userClickPattern.length===gamePattern.length){
        setTimeout(function(){
          nextSequence();
        },700);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over bro, Any key to restart");

    //restart the game
    startOver();
  }
}

//first step - Generate random number between 0-3
function nextSequence(){
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickPattern=[];
  level++;
  //change the value of level
  $("#level-title").text("Level " + level);
  //generate a random number
  var randomNumber=Math.floor(Math.random()*4);
  //Randomly Generated color
  randomChosenColor=buttonColors[randomNumber];
  //push colors to gamepettern
  gamePattern.push(randomChosenColor);
  //jQuery to Select the color id and Animate
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  //Query to set audio
  playSound(randomChosenColor);
}

function playSound(name){
  var audio=new Audio("sounds/"+ name + ".mp3");
  audio.play();
}

//click animation
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  },100);
}
//restart the game function
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
