let m;
let mDrawOffset = 0;
let bx;
let bvx = 0;

const friction = 0.01;

const mapRenderStep = 1;
const ballRadius = 5;

let score = 0;
let mineSign = 1, miningRadius = 20;

let enemyX;

let gameOver = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    // createCanvas(400, 400);

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
//     bx = mouseX + mDrawOffset * mapRenderStep;
//     bx /= mapRenderStep;
//     bvx = 0;
}

function keyPressed() {
    switch (key) {
        case 's':
            mineSign *= -1;
            break;
    }

    switch (keyCode) {
        case 82: // r
            reset();
            break;
    }
}

function draw() {
    background(220);

    // let offsetDiff = Math.round(bx - width / 2 / mapRenderStep) - mDrawOffset;
    // if (offsetDiff > width / 4 / mapRenderStep) {
    //     mDrawOffset += offsetDiff;
    // }

    m.display(mapRenderStep, mDrawOffset);

    if (keyIsPressed) {
        switch(keyCode) {
            case 37: case 65:
//                 bax = max(-Math.abs(bax * 1.1), bax - 0.05);
                mDrawOffset -= 5 / mapRenderStep;
                break;
            case 39: case 68:
                // bax = min(Math.abs(bax * 1.1), bax + 0.05);
                mDrawOffset += 5 / mapRenderStep;
                break;
        }
    }

    if (!gameOver) {
        gameLoop();
    } else {
        gameOverLoop();
    }

    displayPlayer();
    displayEnemy();

    noStroke();
    fill(100);
    textSize(15);
    textAlign(RIGHT);
    text("Use arrow keys or A-D to move the camera", width - 20, height - 20);
    text("Click to transform the terrain", width - 20, height - 40);

    // noFsuseX + miningRadius, 0, mouseX + miningRadius, height);
}

const REGION_SIZE = 16;

