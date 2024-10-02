var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomNumber;
var randomChosenColour;
var userChosenColour
var userClickedPattern = [];
var gameOn = false;
var level = 0;

$(".btn").on("click", function(event) {
    userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

$("#startButton").on("click", function() {
    $("#startButton").addClass("active");
    if (gameOn === false) {
        nextSequence();
        gameOn = true;
    }
})

function nextSequence() {
    userClickedPattern = [];
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    setTimeout(function(){
        $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
        level++
        $("#level-title").text("Level "+level);
        $("#startButton").hide()
    },200); 
}

function playSound(name) {
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed")
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if (gamePattern.length===userClickedPattern.length) {
            setTimeout (nextSequence,100);
        } 
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("#level-title").text("Game Over, Press Play button to Restart");
        $("#startButton").show()
        startOver();
    }  
}

function startOver() {
    level = 0;
    gameOn = false;
    gamePattern = [];
}
