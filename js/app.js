/**
 * Global variables. userOptions & renderGame are used to load the game once a
 * player has selected his options.
 * 'char' stands for character, anything marked with char has to do with functionality
 * of the selected character.
 * Load charImages (loads the character images); charIndex is used to keep track
 * of player selection. Set enemy speed & collision factor.
 * Set var lives, load gemImages tracked by gemIndex.
 * Set starImage & starPoints. Start points at 0 and ser var minutes.
 * allX & allY are coordinates to be used.
 */
var userOptions = [false, false, false];
var renderGame = false;
var charImages = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];
var charIndex;
var enemySpeed = 200;
var collisionP = 20;
var lives;
var gemImages = [
    'images/Gem Green.png',
    'images/Gem Blue.png',
    'images/Gem Orange.png'
];
var gemIndex;
var gemPoints;
var starImage = 'images/Star.png';
var starPoints = 100;
var totalScore = 0;
var minutes;
var allX = [0, 100, 200, 300, 400];
var allY = [60, 143, 226];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = allY[Math.floor(Math.random() * 3)];
    this.speed = Math.floor(100 + (Math.random() * enemySpeed));
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > 550) {
        this.x = -100;
        this.y = this.y + 83;
        this.speed = Math.floor(100 + (Math.random() * enemySpeed));
        if (this.y > 226) {
            this.y = 60;
        }
    }
    if (player.y >= this.y - collisionP && player.y <= this.y + collisionP) {
        if (player.x >= this.x - collisionP && player.x <= this.x +
            collisionP) {
            player.reset();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 400;
};

// Functions for player
Player.prototype.update = function() {
    if (this.ctrlKey === 'left' && this.x > 0) {
        this.x = this.x - 100;
    } else if (this.ctrlKey === 'right' && this.x != 400) {
        this.x = this.x + 100;
    } else if (this.ctrlKey === 'up') {
        this.y = this.y - 83;
    } else if (this.ctrlKey === 'down' && this.y != 400) {
        this.y = this.y + 83;
    }
    this.ctrlKey = null;
    if (this.y < 60) {
        this.reset();
    }
};

// Render player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(charImages[charIndex]), this.x, this.y);
};

// Set Controls
Player.prototype.handleInput = function(key) {
    this.ctrlKey = key;
};

// Game Reset
Player.prototype.reset = function() {
    player.x = 200;
    player.y = 400;
    lives--;
    document.getElementById('lives').innerHTML = 'Lives: ' + lives;
    if (lives < 0) {
        endGame();
    }
};

// Gem Class
var Gem = function() {
    this.x = allX[Math.floor(Math.random() * 5)];
    this.y = allY[Math.floor(Math.random() * 3)];
};

// If player catches a gem, add points & reset gem location
Gem.prototype.update = function() {
    if (player.y === this.y + 8 && player.y === this.y + 8) {
        if (player.x === this.x && player.x === this.x) {
            totalScore = totalScore + gemPoints;
            this.x = allX[Math.floor(Math.random() * 5)];
            this.y = allY[Math.floor(Math.random() * 3)];
        }
    }
    document.getElementById('points').innerHTML = 'Points: ' + totalScore;
};

// Render gem
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(gemImages[gemIndex]), this.x, this.y);
};

// Star Class
var Star = function() {
    this.x = allX[Math.floor(Math.random() * 5)];
    this.y = allY[Math.floor(Math.random() * 3)];
};

// If player catches a star, add points & reset gem location
Star.prototype.update = function() {
    if (player.y === this.y + 8 && player.y === this.y + 8) {
        if (player.x === this.x && player.x === this.x) {
            totalScore = totalScore + starPoints;
            this.x = allX[Math.floor(Math.random() * 5)];
            this.y = allY[Math.floor(Math.random() * 3)];
        }
    }
    document.getElementById('points').innerHTML = 'Points: ' + totalScore;
};

// Render star
Star.prototype.render = function() {
    ctx.drawImage(Resources.get(starImage), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Place the gem object in variable called gem.
// Place the star obect in variable called star.
var enemyA = new Enemy();
var enemyB = new Enemy();
var enemyC = new Enemy();
var enemyD = new Enemy();
var allEnemies = [enemyA, enemyB, enemyC, enemyD];

var player = new Player();

var gem = new Gem();

var star = new Star();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Character selection
function charClick(imgId, imgIndex) {
    charIndex = imgIndex;
    var buttons = document.getElementsByClassName('charImg');
    for (var i = 0, length = buttons.length; i < length; i++) {
        buttons[i].style.border = '3px solid white';
    }
    document.getElementById(imgId).style.border = '3px solid red';
    userOptions[0] = true;
}

// Difficulty selection
function difficultyClick(buttonID, rating) {
    switch (rating) {
        case 'Easy':
            enemySpeed = 200;
            collisionP = 30;
            lives = 4;
            gemIndex = 0;
            gemPoints = 50;
            break;
        case 'Medium':
            enemySpeed = 400;
            collisionP = 60;
            lives = 6;
            gemIndex = 1;
            gemPoints = 80;
            break;
        case 'Hard':
            enemySpeed = 600;
            collisionP = 100;
            lives = 8;
            gemIndex = 2;
            gemPoints = 150;
    }
    var buttons = document.getElementsByClassName('levelButton');
    for (var i = 0, length = buttons.length; i < length; i++) {
        buttons[i].style.border = '1px solid #333333';
    }
    document.getElementById(buttonID).style.border = '2px solid red';
    document.getElementById('lives').innerHTML = 'Lives: ' + lives;
    document.getElementById('dificultyText').innerHTML = 'Difficulty: ' +
        rating;
    userOptions[1] = true;
}

// Game duration
function timeClick(buttonID, duration) {
    switch (duration) {
        case 'one':
            minutes = 1;
            break;
        case 'two':
            minutes = 2;
            break;
        case 'four':
            minutes = 4;
    }
    var buttons = document.getElementsByClassName('timeButton');
    for (var i = 0, length = buttons.length; i < length; i++) {
        buttons[i].style.border = '1px solid #333333';
    }
    document.getElementById(buttonID).style.border = '2px solid red';
    userOptions[2] = true;
}

// Start button
// Selection check
function startClick() {
    var selectionCount = 0;
    for (var i = 0, length = userOptions.length; i < length; i++) {
        if (userOptions[i] === true) {
            selectionCount++;
        }
    }
    if (selectionCount === 3) {
        document.getElementById('selectionPopup').style.display = 'none';
        renderGame = true;
        timer(minutes);
    } else {
        alert(
            'Please pick a level, set game time and choose a character to play!'
        );
    }
}

// Game timer
function timer(minutes) {
    var seconds = 60;
    var mins = minutes;

    function tick() {
        var counter = document.getElementById("timer");
        var current_minutes = mins - 1;
        seconds--;
        counter.innerHTML =
            current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") +
            String(seconds);
        if (seconds > 0) {
            setTimeout(tick, 1000);
        } else {
            if (mins > 1) {
                setTimeout(function() {
                    timer(mins - 1);
                }, 1000);
            }
        }
        if (current_minutes === 0 && seconds === 0) {
            endGame();
        }
    }
    tick();
}

// Game Over Screen
function endGame() {
    renderGame = false;
    document.getElementById('pointsSummary').innerHTML = totalScore;
    document.getElementById('gameOverPopup').style.display = 'block';
}