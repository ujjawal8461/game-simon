var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

var restartgame = 0;

if(localStorage.life == undefined){
  localStorage.life = 3;
  var life = localStorage.life;
}else{
  if(localStorage.life < 0){
    //localStorage.life = 3;
    var life = localStorage.life;
  }else{
    var life = localStorage.life;
  }
}

setstar();
$(".button").on("click", function(){
    $(".button").hide();
    $(".length").show();
    $(".score").hide();
    setCounter(1);
    setTimeout(function(){
      startgame(1);

    }, 1000);
  });


$(document).keypress(function() {
  if (!started && restartgame == 0 && localStorage.life > 0) {
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();
    countdown( "ten-countdown",1, 10 );
  }
  setstar();
});


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }else{
      playSound("wrong");
      $("body").addClass("game-over");
      
      localStorage.life = (localStorage.life)-1;
      checkgameover(gamePattern.length);
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function levelfail(){
/*  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    html: 'You Loss Try Again',
  }).then((result) => {
 //   startOver();
      location.reload();
  })*/
  var level =0;
  //$("#level-title").text("Level " + level);
  started = true;
  //nextSequence();
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function checkgameover(seq = null){
  setstar();
  console.log(localStorage.life);
  if(localStorage.life > 0){
    $("#level-title").text("You Loss! Press Any Key to Retry"); 
    levelfail();
    //location.reload();
  }else{
    $("#level-title").html("Game Over <br><br> Score:"+seq); 
    restartgame = 1;
    setstar();
    if(localStorage.life <= 0){
      //localStorage.life = 3;
      var life = localStorage.life;
    }
  }
}

function setstar(){
  var life = localStorage.life;
  var html = '';
  for(var a = 0; a< localStorage.life;a++){
    html += '<div class="life"><div class="heart" onclick="location.reload();"></div></div>';
  }
  $(".lifeline").html(html);
}

function resetGame(){
  Swal.fire({
    title: 'Enter Password to Reset Game',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Reset Game',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      if(login == "cdgi2022"){
        localStorage.life = 3;
        return 1;
      }else{
        return 0;
      }
    }
  }).then((result) => {
    location.reload();
  })
}