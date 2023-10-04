let m;
let mDrawOffset = 0, mDrawOffsetSpeed = 0;
let bx;
let bvx = 0;

const friction = 0.01;

const mapRenderStep = 1;
const ballRadius = 5;

let score = 0;
let mineSign = 1, miningRadius = 20;

let enemyX;

let gameOver = false;

var isMobile = false;

function setup() {
    createCanvas(windowWidth, windowHeight);

    reset();
}

function reset() {
    noiseSeed(random(1000000));
    m = new Map(0.01 * mapRenderStep);

    bx = width / 2;
    bx /= mapRenderStep;
    bvx = 0;
    mDrawOffset = 0;
    score = 0;

    gameOver = false;

    enemyX = bx - width / 2 / mapRenderStep + 1;
    enemyVx = 0.8;
}

function mousePressed() {
    if (mouseY < 100) {
        reset();
    }

    if (gameOver && isMobile) {
        reset();
    }
}

function keyPressed() {
    switch (key) {
        case 's':
            mineSign *= -1;
            break;
        case '`':
            gameOver = true;
            break;
    }

    switch (keyCode) {
        case 82: // r
            reset();
            break;
    }
}

function touchesEnded() {
    if (isMobile && gameOver && mouseY > height / 2 + 70 - 20 && mouseY < height / 2 + 70 + 10) {
        reset();
    }
}

function draw() {
    background(220);

    if (touches.length > 0) {
        isMobile = true;
    }

    m.display(mapRenderStep, mDrawOffset);

    moveMap();

    if (!gameOver) {
        gameLoop();
    } else {
        gameOverLoop();
    }

    displayPlayer();
    displayEnemy();

    displayDesktopControlsHints();

    // noFsuseX + miningRadius, 0, mouseX + miningRadius, height);
}

const REGION_SIZE = 16;

