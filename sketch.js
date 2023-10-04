let m;
let mDrawOffset = 0;
let bx;
let bvx = 0;

const friction = 0.01;

const mapRenderStep = 1;
const ballRadius = 5;

let score = 0;
let mineSign = 1, miningRadius = 20;

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
    }
}

function draw() {
    background(220);

//     mDrawOffset = Math.round(bx - width / 2 / mapRenderStep);
    m.display(mapRenderStep, mDrawOffset);

    let bax = m.getGradientAt(bx) * 10 / mapRenderStep;

    if (keyIsPressed) {
        switch(keyCode) {
            case 37:
//                 bax = max(-Math.abs(bax * 1.1), bax - 0.05);
                mDrawOffset -= 5 / mapRenderStep;
                break;
            case 39:
                // bax = min(Math.abs(bax * 1.1), bax + 0.05);
                mDrawOffset += 5 / mapRenderStep;
                break;
        }
    }

    if (mouseIsPressed || touches.length > 0) {
        let inGameMouseX = Math.round(mouseX / mapRenderStep + mDrawOffset);
        let heightAtMouseX = m.getHeightAt(inGameMouseX);
        let relMouseY = 1 - mouseY / height;
        m.mineAt(inGameMouseX, miningRadius, 0.1 * (heightAtMouseX - relMouseY));
        circle(mouseX, mouseY, miningRadius);
    }

    bvx *= 1 - friction;
    bvx += bax;
    bx += bvx;
    if (bx <= 1) {
        bx = 1;
        bvx *= -1;
        bx += bvx;
    }
    let by = m.getHeightAt(bx);
    fill(0);
    noStroke();
    circle((bx - mDrawOffset) * mapRenderStep, height * (1 - by) - ballRadius, ballRadius * 2);

    score = max(Math.floor((bx - width / 2 / mapRenderStep) * 0.1 * mapRenderStep), score);
    textSize(30);
    text("Score: " + score, 20, 40);

    // noFsuseX + miningRadius, 0, mouseX + miningRadius, height);
}

const REGION_SIZE = 16;

