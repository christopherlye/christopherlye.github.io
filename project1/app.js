/*--------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////
----------------------------------------------------------------------
                        Chris' Snake Game
----------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////
--------------------------------------------------------------------*/


// accessing the canvas
let ctx = document.getElementById('ctx').getContext('2d');
let blueroundsWon = document.getElementById('blue-roundsWon');
let orangeroundsWon = document.getElementById('orange-roundsWon');

/*--------------------------------------------------------------------
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Create Sprites
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--------------------------------------------------------------------*/

// Food

let greenFastFood = document.createElement('img');
greenFastFood.setAttribute('id', 'fastFood');
greenFastFood.setAttribute('src', 'sprites/fast-food-3.png');
greenFastFood.setAttribute('style', 'display: none');
document.body.appendChild(greenFastFood);

let redSlowFood = document.createElement('img');
redSlowFood.setAttribute('id', 'slowFood');
redSlowFood.setAttribute('src', 'sprites/slow-food-3.png');
redSlowFood.setAttribute('style', 'display: none');
document.body.appendChild(redSlowFood);
console.log(redSlowFood);

// Orange Snake

let orangeSnakeBody = document.createElement('img');
orangeSnakeBody.setAttribute('id', 'orangeSnakeBody');
orangeSnakeBody.setAttribute('src', 'sprites/orange-snake-body.gif');
orangeSnakeBody.setAttribute('style', 'display: none');
document.body.appendChild(orangeSnakeBody);

let orangeSnakeHead = document.createElement('img');
orangeSnakeHead.setAttribute('id', 'orangeSnakeHead');
orangeSnakeHead.setAttribute('src', 'sprites/orange-snake-head-left.gif');
orangeSnakeHead.setAttribute('style', 'display: none');
document.body.appendChild(orangeSnakeHead);


// Blue Snake

let blueSnakeBody = document.createElement('img');
blueSnakeBody.setAttribute('id', 'blueSnakeBody');
blueSnakeBody.setAttribute('src', 'sprites/blue-snake-body.gif');
blueSnakeBody.setAttribute('style', 'display: none');
document.body.appendChild(blueSnakeBody);

let blueSnakeHead = document.createElement('img');
blueSnakeHead.setAttribute('id', 'blueSnakeHead');
blueSnakeHead.setAttribute('src', 'sprites/blue-snake-head-right.gif');
blueSnakeHead.setAttribute('style', 'display: none');
document.body.appendChild(blueSnakeHead);


/*--------------------------------------------------------------------
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                        Creating Snake Game
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
--------------------------------------------------------------------*/



//////////////////////////////////////////////////////////////////////
//Create Game Objects
//////////////////////////////////////////////////////////////////////

const game = {
    isRunning: false,
    isPaused: false,
    intervalVar: null,
    interval: null,
    goal: 50,
    roundsToWin: 3
}

class Snake {
    constructor(name, color, width, height, parts, direction, score, speed, roundsWon) {
        this.name = name;
        this.color = color;
        this.width = 20;
        this.height = 20;
        this.parts = [];
        this.direction = null;
        this.score = 0;
        this.speed = 0;
        this.roundsWon = 0;
    }
}

const snakeOne = new Snake('Orange Snake', 'orange');
const snakeTwo = new Snake('Blue Snake', 'blue');

class Food {
    constructor(color, width, height, eaten, items) {
        this.color = color;
        this.width = 20;
        this.height = 20;
        this.eaten = true;
        this.items = [];
    }
}

const fastFood = new Food('green');
const slowFood = new Food('red');


//////////////////////////////////////////////////////////////////////
//Global variables
//////////////////////////////////////////////////////////////////////

let ctxWidth = document.getElementById('ctx').width;
let ctxHeight = document.getElementById('ctx').height;
ctx.font = '20px courier';
ctx.fillStyle = 'green';
ctx.fillText('Click here to start the game', 80, 250);
ctx.fillText(`Goal: ${game.goal} points`, 170, 220);

// window.onload = () => {
//     ctx.drawImage(greenFastFood, 200, 200, 20, 20);
// }


//////////////////////////////////////////////////////////////////////
//Keyboard controls
//////////////////////////////////////////////////////////////////////

let spacebar, left, up, right, down, w, a, s, d;
[spacebar, left, up, right, down, w, a, s, d] = [32, 37, 38, 39, 40, 87, 65, 83, 68];


//////////////////////////////////////////////////////////////////////
//Event handlers
//////////////////////////////////////////////////////////////////////

const mouseClickStart = () => {
    if (game.isRunning) {
        // clear interval so that it won't repeat itself too many times
        clearInterval(game.interval);
        game.isRunning = false;
        fastFood.items = [];
    }
    startGame();
}

// start game function
// can't seem to get this working
// document.getElementById('ctx').addEventListener('onmousedown', mouseClickStart);

document.getElementById('ctx').onmousedown = () => {
    mouseClickStart();
}

// reset game event
document.getElementById('reset-game').onmousedown = () => {
    let userInput = confirm('Are you sure you want to reset the game?');
    if (userInput) {
        window.scrollTo(0, 0);
        setTimeout(() => {location.reload();}, 800);
    }
    else {
        return;
    }
}


// scroll events
document.getElementById('play-now').onmousedown = () => {
    window.scrollTo(0, 940);
}

document.getElementById('start-game').onmousedown = () => {
    window.scrollTo(0, 1880);
}

// keyboard events
document.onkeydown = (event) => {

    // snakeOne direction keys
    if (event.keyCode === up && snakeOne.direction != down) {
        snakeOne.direction = up;
        orangeSnakeHead.setAttribute('src', 'sprites/orange-snake-head-up.gif');
    }
    else if (event.keyCode === down && snakeOne.direction != up) {
        snakeOne.direction = down;
        orangeSnakeHead.setAttribute('src', 'sprites/orange-snake-head-down.gif');
    }
    else if (event.keyCode === right && snakeOne.direction != left) {
        snakeOne.direction = right;
        orangeSnakeHead.setAttribute('src', 'sprites/orange-snake-head-right.gif');
    }
    else if (event.keyCode === left && snakeOne.direction != right) {
        snakeOne.direction = left;
        orangeSnakeHead.setAttribute('src', 'sprites/orange-snake-head-left.gif');
    }
    // snakeTwo direction keys
    else if (event.keyCode === w && snakeTwo.direction != down) {
        snakeTwo.direction = up;
        blueSnakeHead.setAttribute('src', 'sprites/blue-snake-head-up.gif');
    }
    else if (event.keyCode === s && snakeTwo.direction != up) {
        snakeTwo.direction = down;
        blueSnakeHead.setAttribute('src', 'sprites/blue-snake-head-down.gif');
    }
    else if (event.keyCode === a && snakeTwo.direction != right) {
        snakeTwo.direction = left;
        blueSnakeHead.setAttribute('src', 'sprites/blue-snake-head-left.gif');
    }
    else if (event.keyCode === d && snakeTwo.direction != left) {
        snakeTwo.direction = right;
        blueSnakeHead.setAttribute('src', 'sprites/blue-snake-head-right.gif');
    }
    // pause game
    else if (event.keyCode === spacebar) {
        if (game.isPaused) {
            game.isPaused = false;
        }
        else {
            game.isPaused = true;
        }
    }
    event.preventDefault(); // prevents directional arrow keys from interfering with window scroll by removing default function
}

//////////////////////////////////////////////////////////////////////
//Collide objects
//////////////////////////////////////////////////////////////////////

const snakeCollideFood = (snakeObj, foodObj) => {
    let snakeHead = snakeObj.parts[0]; // first snake part is snake head
    let foodItem1 = foodObj.items[0]; // first food item
    // return true if both x and y coordinates of head of snake is close to / touching the food
    return ((Math.abs(snakeHead.x - foodItem1.x) < 20) &&
            (Math.abs(snakeHead.y - foodItem1.y) < 20));
}

const snakeCollideItself = (snakeHead, snakeBody) => {
    // return true if both x and y coordinates of head of a snake is close to / touching another part of a snake
    return ((Math.abs(snakeHead.x - snakeBody.x) < 5) &&
            (Math.abs(snakeHead.y - snakeBody.y) < 5));
}

// one snake head collides on another's body
const snakeCollideAnotherBody = (snakeHead, snakeAnother) => {
    // return true if both x and y coordinates of head of a snake is close to / touching another part of opponent's snake
    return ((Math.abs(snakeHead.x - snakeAnother.x) < 10) &&
            (Math.abs(snakeHead.y - snakeAnother.y) < 10));
}

// one snake head collides on another's head
const snakeCollideAnotherHead = (snakeHead, snakeAnotherHead) => {
    // return true if both x and y coordinates of head of a snake is close to / touching another part of opponent's snake
    return ((Math.abs(snakeHead.x - snakeAnotherHead.x) < 20) &&
            (Math.abs(snakeHead.y - snakeAnotherHead.y) < 20));
}


//////////////////////////////////////////////////////////////////////
//Draw objects - cannot refactor this as I'm using a callback (forEach)
//////////////////////////////////////////////////////////////////////

const drawSnakeOne = (snakeObj, i) => { // snakeObj is snake object, i is the index of the array (i.e. other parts of the snake)
    ctx.save(); //saves state of canvas
    if (i === 0) {
        // ctx.fillStyle = 'black'; // create different colour for snakeObj head
        // ctx.fillRect(snakeObj.x, snakeObj.y, snakeTwo.width, snakeTwo.height);
        ctx.drawImage(orangeSnakeHead, snakeObj.x, snakeObj.y, snakeOne.width, snakeOne.height);
    }
    else {
        ctx.drawImage(orangeSnakeBody, snakeObj.x, snakeObj.y, snakeOne.width, snakeOne.height);
    }
    ctx.restore(); //restores state of canvas
}

const drawSnakeTwo = (snakeObj, i) => { // snakeObj is snake object, i is the index of the array (i.e. other parts of the snake)
    ctx.save(); //saves state of canvas
    if (i === 0) {
        ctx.drawImage(blueSnakeHead, snakeObj.x, snakeObj.y, snakeOne.width, snakeOne.height);
    }
    else {
        ctx.drawImage(blueSnakeBody, snakeObj.x, snakeObj.y, snakeOne.width, snakeOne.height);
    }
    // ctx.fillRect(snakeObj.x, snakeObj.y, snakeTwo.width, snakeTwo.height); // draw the rectangle
    ctx.restore(); //restores state of canvas
}

const drawFastFood = () => {
    ctx.save();
    ctx.fillStyle = fastFood.color;
    // ctx.fillRect(fastFood.items[0].x, fastFood.items[0].y, fastFood.width, fastFood.height);
    ctx.drawImage(greenFastFood, fastFood.items[0].x, fastFood.items[0].y, fastFood.width, fastFood.height);
    ctx.restore();
}

const drawSlowFood = () => {
    ctx.save();
    ctx.fillStyle = slowFood.color;
    ctx.drawImage(redSlowFood, slowFood.items[0].x, slowFood.items[0].y, slowFood.width, slowFood.height);
    ctx.restore();
}

// const drawGoal = () => {
//     ctx.save();
//     ctx.fillStyle = 'green';
//     ctx.fillText(`Goal: ${game.goal} points`, 170, 30);
// }

//////////////////////////////////////////////////////////////////////
//Move snake
//////////////////////////////////////////////////////////////////////

const moveSnake = (snakeObj) => {
    // for all parts of the snake
    for (let i = snakeObj.parts.length - 1; i >= 0; i--) {
        if (snakeObj.direction === left) { // if snakeObj.direction is left
            if (i === 0) { // if this is the snake's head
                snakeObj.parts[i].x = snakeObj.parts[i].x - snakeObj.speed; // decrease x value by 5
            }
            // update the tail of the snake with the position of the body
            else {
                snakeObj.parts[i].x = snakeObj.parts[i - 1].x;
                snakeObj.parts[i].y = snakeObj.parts[i - 1].y;
            }
        }
        else if (snakeObj.direction === up) { // if snakeObj.direction is up
            if (i === 0) { // if this is the snake's head
                snakeObj.parts[i].y = snakeObj.parts[i].y - snakeObj.speed; // decrease y value by 5
            }
            else {
                snakeObj.parts[i].x = snakeObj.parts[i - 1].x;
                snakeObj.parts[i].y = snakeObj.parts[i - 1].y;
            }
            // update the tail of the snake with the position of the body
        }
        else if (snakeObj.direction === right) { // if snakeObj.direction is right
            if (i === 0) { // if this is the snake's head
                snakeObj.parts[i].x = snakeObj.parts[i].x + snakeObj.speed; // increase x value by 5
            }
            // update the tail of the snake with the position of the body
            else {
                snakeObj.parts[i].x = snakeObj.parts[i - 1].x;
                snakeObj.parts[i].y = snakeObj.parts[i - 1].y;
            }
        }
        else if (snakeObj.direction === down) { // if snakeObj.direction is down
            if (i === 0) { // if this is the snake's head
                snakeObj.parts[i].y = snakeObj.parts[i].y + snakeObj.speed; // increase y value by 5
            }
            // update the tail of the snake with the position of the body
            else {
                snakeObj.parts[i].x = snakeObj.parts[i - 1].x;
                snakeObj.parts[i].y = snakeObj.parts[i - 1].y;
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////
//Check if snake is out of canvas
//////////////////////////////////////////////////////////////////////

const checkSnakePosition = (snake) => {
    let snakeHead = snake.parts[0];
    if (snakeHead.x > ctxWidth) { // if snake's head goes past the right side of canvas
        snakeHead.x = 0; // regenerate from the left side
    }
    else if (snakeHead.x < 0) { // if snake's head goes past the left side of canvas
        snakeHead.x = 500;
    }
    else if (snakeHead.y > ctxHeight) { // if snake's head goes past the bottom side of canvas
        snakeHead.y = 0;
    }
    else if (snakeHead.y < 0) { // if snake's head goes past the upper side of canvas
        snakeHead.y = 500;
    }
}


//////////////////////////////////////////////////////////////////////
//Update length of snakes if snakes eat food
//////////////////////////////////////////////////////////////////////

const snakeEatFastFood = (snakeObj) => {
    if (snakeCollideFood(snakeObj, fastFood)) { // when snake and fastFood collide do the following
        fastFood.items = []; // fastFood is eaten
        fastFood.eaten = true;
        document.getElementById('munching-sound').play();
        createFood(fastFood);
        if (snakeObj.speed < 10) {
            snakeObj.speed += 0.5;
        }
        else {
            snakeObj.speed = 10;
        }
        snakeObj.score += 1;
        clearInterval(game.interval);
        game.intervalVar -= 1;
        game.interval = setInterval(updateScreen, game.intervalVar);
        let new_X, new_Y; // create new x and y positions for the snake after eating the fastFood
        if (snakeObj.direction === left) { // left
            new_X = snakeObj.parts[0].x - 10;
            new_Y = snakeObj.parts[0].y;
        }
        else if (snakeObj.direction === up) { // up
            new_X = snakeObj.parts[0].x;
            new_Y = snakeObj.parts[0].y - 10;
        }
        else if (snakeObj.direction === right) { // right
            new_X = snakeObj.parts[0].x + 10;
            new_Y = snakeObj.parts[0].y;
        }
        else if (snakeObj.direction === down) { // down
            new_X = snakeObj.parts[0].x;
            new_Y = snakeObj.parts[0].y + 10;
        }
        snakeObj.parts.unshift({x:new_X, y:new_Y}); // add to the head of the snake
    }
}

const snakeEatSlowFood = (snakeObj, otherSnakeObj) => {
    if (snakeCollideFood(snakeObj, slowFood)) { // when snake and slowFood collide do the following
        slowFood.items = []; // slowFood is eaten
        slowFood.eaten = true;
        document.getElementById('munching-sound').play();
        createFood(slowFood);
        otherSnakeObj.score += 5;
        clearInterval(game.interval);
        if (otherSnakeObj.speed > 5) {
            otherSnakeObj.speed -= 0.5;
        }
        else {
            otherSnakeObj.speed = 5;
        }
        game.intervalVar += 1;
        game.interval = setInterval(updateScreen, game.intervalVar);
        for (let i = 0; i < 7; i++) {
            let new_X, new_Y; // create new x and y positions for the snake after eating the fastFood
            if (otherSnakeObj.direction === left) { // left
                new_X = otherSnakeObj.parts[0].x - 10;
                new_Y = otherSnakeObj.parts[0].y;
            }
            else if (otherSnakeObj.direction === up) { // up
                new_X = otherSnakeObj.parts[0].x;
                new_Y = otherSnakeObj.parts[0].y - 10;
            }
            else if (otherSnakeObj.direction === right) { // right
                new_X = otherSnakeObj.parts[0].x + 10;
                new_Y = otherSnakeObj.parts[0].y;
            }
            else if (otherSnakeObj.direction === down) { // down
                new_X = otherSnakeObj.parts[0].x;
                new_Y = otherSnakeObj.parts[0].y + 10;
            }
            otherSnakeObj.parts.unshift({x:new_X, y:new_Y}); // add to the head of the snake
        }
    }
}


//////////////////////////////////////////////////////////////////////
//Start Game function - used only when event triggered
//////////////////////////////////////////////////////////////////////

const startGame = () => {
    snakeOne.parts = [{x: 450, y: 50},{x: 460, y: 50},{x: 470, y: 50}]; // head body tail
    snakeTwo.parts = [{x: 30, y: 450},{x: 20, y: 450},{x: 10, y: 450}];
    snakeOne.score = 0;
    snakeTwo.score = 0;
    snakeOne.speed = 5;
    snakeTwo.speed = 5;
    game.isRunning = true;
    game.isPaused = false;
    game.intervalVar = 30 - (snakeOne.roundsWon + snakeTwo.roundsWon) * 4;
    game.interval = setInterval(updateScreen, game.intervalVar);
}

//////////////////////////////////////////////////////////////////////
//Game over function
//////////////////////////////////////////////////////////////////////

const selfCollision = (snakeObj1, snakeObj2) => {
    for (i in snakeObj1.parts) {
        if (i == 0) {
            continue; // ignore collision on its own head
        }
        // snake head collide with part any part of it's body
        if (snakeCollideItself(snakeObj1.parts[0], snakeObj1.parts[i])) {
            snakeObj2.roundsWon += 1;
            clearInterval(game.interval);
            ctx.fillText(`${snakeObj2.name} wins the round!`, 100, 250);
            document.getElementById('winning-sound').play();
            // ctx.fillText(`Click here for a new round!`, 100, 250);
            return;
        }
    }
}

const collideAnother = (snakeObj1, snakeObj2) => {
    if (snakeCollideAnotherHead(snakeObj1.parts[0], snakeObj2.parts[0])) {
        clearInterval(game.interval);
        ctx.fillText(`It's a tie!`, 190, 250);
        document.getElementById('uh-oh-sound').play();
        // ctx.fillText(`Click here for a new round!`, 100, 250);
        return;
    }
        // snake head collide with part any part of other snake's body
    else {
        for (i in snakeObj2.parts) {
            if (snakeCollideAnotherBody(snakeObj1.parts[0], snakeObj2.parts[i])) {
                snakeObj2.roundsWon += 1;
                clearInterval(game.interval);
                ctx.fillText(`${snakeObj2.name} wins the round!`, 100, 250);
                document.getElementById('winning-sound').play();
                // ctx.fillText(`Click here for a new round!`, 100, 250);
                return;
            }
        }
    }
}


const checkWins = (snakeObj1, snakeObj2) => {
    if (snakeObj1.roundsWon === game.roundsToWin) {
        clearInterval(game.interval);
        ctx.fillText(`${snakeObj1.name} is the winner!`, 100, 250);
        document.getElementById('yay-sound').play();
        // document.getElementById('ctx').removeEventListener('onmousedown', mouseClickStart);
        return;
    }
    else if (snakeObj2.roundsWon === game.roundsToWin) {
        clearInterval(game.interval);
        ctx.fillText(`${snakeObj2.name} is the winner!`, 100, 250);
        document.getElementById('yay-sound').play();
        // document.getElementById('ctx').removeEventListener('onmousedown', mouseClickStart);
        return;
    }
    else if (snakeObj1.score  >= game.goal) {
        snakeObj1.roundsWon += 1;
        clearInterval(game.interval);
        ctx.fillText(`${snakeObj1.name} wins the round!`, 100, 250);
        document.getElementById('winning-sound').play();
        // document.getElementById('ctx').removeEventListener('onmousedown', mouseClickStart);
        return;
    }
    else if (snakeObj2.score >= game.goal) {
        snakeObj2.roundsWon += 1;

        clearInterval(game.interval);
        ctx.fillText(`${snakeObj2.name} wins the round!`, 100, 250);
        document.getElementById('winning-sound').play();
        // document.getElementById('ctx').removeEventListener('onmousedown', mouseClickStart);
        return;
    }
}

//////////////////////////////////////////////////////////////////////
//Randomise food
//////////////////////////////////////////////////////////////////////


const createFood = (foodObj) => {
    let pos_x = Math.random() * 485 + 5; // foodObj appears randomly at 5 - 490
    let pos_y = Math.random() * 485 + 5;
    foodObj.items[0] = {x:pos_x, y:pos_y};
    foodObj.eaten = false;
}


//////////////////////////////////////////////////////////////////////
//Update functions
//////////////////////////////////////////////////////////////////////


const updateScreen = () => {
    if (!game.isPaused) {
        if (fastFood.items.length === 0) {
            createFood(fastFood);
            createFood(slowFood);
        }

        // clear the canvas
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);

        // draw objects
        fastFood.items.forEach(drawFastFood); // for each fastFood item, draw it on the screen
        slowFood.items.forEach(drawSlowFood); // for each slowFood item, draw it on the screen
        // drawGoal();

        // draw snakes
        snakeOne.parts.forEach(drawSnakeOne); // for each part of the snake, draw it on the screen
        snakeTwo.parts.forEach(drawSnakeTwo); // for each part of the snake, draw it on the screen

        // snake eats food
        snakeEatFastFood(snakeOne);
        snakeEatFastFood(snakeTwo);
        snakeEatSlowFood(snakeOne, snakeTwo);
        snakeEatSlowFood(snakeTwo, snakeOne);

        // update score board
        // ctx.fillText(`Orange: ${snakeOne.score}`, 410, 30);
        // ctx.fillText(`Blue: ${snakeTwo.score}`, 10, 30);
        orangeroundsWon.innerText = snakeOne.roundsWon;
        blueroundsWon.innerText = snakeTwo.roundsWon;


        // check game over

        if (snakeOne.score >= game.goal || snakeTwo.score >= game.goal || snakeOne.roundsWon === game.roundsToWin || snakeTwo.roundsWon === game.roundsToWin) {
            checkWins(snakeOne, snakeTwo);
        }
        else {
            selfCollision(snakeOne, snakeTwo);
            selfCollision(snakeTwo, snakeOne);
            // checkScore(snakeOne, snakeTwo);
            collideAnother(snakeOne, snakeTwo);
            collideAnother(snakeTwo, snakeOne);
        }

        // check if snake is out of canvas, regenerate on other side if true
        checkSnakePosition(snakeOne);
        checkSnakePosition(snakeTwo);

        // move snake
        moveSnake(snakeOne); // update the x and y coordinates of the snake based on the user input
        moveSnake(snakeTwo); // update the x and y coordinates of the snake based on the user input
        // console.log(game.intervalVar);

        // update snake current score on scoreboard
        document.getElementById('orange-currentScore').innerText = snakeOne.score;
        document.getElementById('blue-currentScore').innerText = snakeTwo.score;
    }
    else {
        // no updating of items / movements if game is paused
        ctx.fillText('Game paused', 200, 250);
    }
}