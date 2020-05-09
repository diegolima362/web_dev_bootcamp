var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern;
var userClickedPattern;
var started;
var level;

resetGame();

function resetGame() {
    started = false;
    gamePattern = [];
    level = 0;
}

$(document).keypress(() => {
    if (!started) {
        started = true;

        $('#level-title').text(`Get ready`);

        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
});

$('.btn').on('click', function(event) {
    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {
    userClickedPattern = [];

    level++;

    $('#level-title').text(`Level ${level}`);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeOut(150).fadeIn(150);

    playSound(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass('pressed');
    setTimeout(() => {
        $(`#${currentColour}`).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            $('h1').text('Success!');
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');

        $('h1').text('Game Over, Press Any Key to Restart');
        $('body').addClass('game-over');

        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);

        resetGame();
    }
}