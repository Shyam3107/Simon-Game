var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

// adding all functions

function playSound(name) // to play sound
{
  var audio = new Audio(name + ".mp3");

  audio.play();
}


function nextSequence() // to generate sequence automatically
{
  userClickedPattern = [];
  level++;
  $("#content").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4); // range 0 to 3
  var randomChosenColour = buttonColours[randomNumber]; // choose random colour
  gamePattern.push(randomChosenColour);
  $("." + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // for animation, flash
  playSound(randomChosenColour);
}

function animateColour(color) // to add animation when user click the button
{
  $("." + color).addClass("pressed");
  setTimeout(function() {
    document.querySelector("." + color).classList.remove("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 1000);
    $("#content").text("Game Over, Press Any Key to Restart");
    newGame();
  }
}

function newGame() {
  started = false;
  level = 0;
  gamePattern = [];
}
// adding main events

$(document).keypress(function() // to start the game
  {
    if (!started) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      started = true;
    }
  });

$(".block").click(function() // when user click the button
  {
    var clickedButtonId = $(this).attr("id");

    playSound(clickedButtonId);

    animateColour(clickedButtonId);

    userClickedPattern.push(clickedButtonId);

    checkAnswer(userClickedPattern.length - 1);
  });
