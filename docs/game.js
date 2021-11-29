// Game Pattern Function - Holds random selection for Game


// User Clicked Pattern Empty Array

var ucP = [];

// Button Colors Array
var bC = ['red', 'blue', 'green', 'yellow'];



// Level Variable
var level = 0;

// Game Pattern Empty Array
var gP = [];


// The started variable to track if the game has been started

var s = false;

function nS() {

    // The User Clicked Pattern array is emptied at when called by checkAnswer to get more selections to advance in the game

    ucP = [];

    // Increses the level number as the game progresses
    level++;

    // Selecting the h1 to change the level number as the game progresses

    $('#level-title').text('Level ' + level);

    // Random Number Variable
    var rN = Math.floor(Math.random() * 4);

    // Random Color Selector Variable
    var rC = bC[rN];

    // Game Pattern Push 
    gP.push(rC);

    // JQuery Selector for Button Select Animation
    $('#' + rC).fadeOut(100).fadeIn(100);

    // Sound Function to Specify Button Sounds
    playSound(rC);


}


// Event Listener for Button Clicks

$('.btn').on('click', function () {

    // variable to define the clicked button
    var uC = $(this).attr('id');

    // The pushing of the clicked button into the empty User Clicked Pattern Array
    ucP.push(uC);

    // Console Log of Clicked Colors
    console.log(uC);

    // The Sound Function to play each button's assigned sound
    playSound(uC);

    // Animation Function to add shadow to buttons upon being pressed
    animatePress(uC);

    // Calling checkAnswer to see if the user's input was correct or false
    checkAnswer(ucP.length - 1)
})

// Sound Function to fit multiple sounds from different variables

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}


// Animated Button Press Function

function animatePress(cC) {
    $('#' + cC).addClass('pressed');
    setTimeout(function () {
        $('#' + cC).removeClass('pressed')
    }, 100);
}

// JQuery to call Next Sequence Function When  a Key is Pressed


$(document).on('keypress', function (e) {
    if (!s) {
        nS();
        s = true;
    }
})

// checkAwnser function to check if the user has selected the right answer in order to move on.

function checkAnswer(currentLevel) {
    if (gP[currentLevel] === ucP[currentLevel]) {

        console.log('success');

        if (ucP.length === gP.length) {
            setTimeout(function () {
                nS();
            }, 1000 * 1);
        }
    } else {
        console.log('wrong');

        // Plays the wrong sound to tell the player they have lost

        playSound('wrong');

        // Adds the game-over class to the body breifly to flash red

        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);


        // Changes the h1 from the current level to to indicate how to restart
        $('#level-title').html(`Game Over, Press Any Key to Restart.<br> <br> Level Reached: ${currentLevel = gP.length}`);

        // Start Over Function is called to restart the game if the wants to restart.
        sO();
    }
}


// The Start Over function will restart the game when the game over screen is prompted
function sO() {
    

    // Resets The Game Pattern, Level, and Start Detection from the Next Sequence to Restart the Game
    level = 0;
    gP = [];
    s = false;
}