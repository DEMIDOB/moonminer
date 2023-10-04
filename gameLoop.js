function gameLoop() {
    transformTerrain();
    movePlayer();
    moveEnemy();
    displayScore();

    gameOver = checkIfGameIsOver();
}

function moveMap() {
    // let offsetDiff = Math.round(bx - width / 2 / mapRenderStep) - mDrawOffset;
    // if (offsetDiff > width / 4 / mapRenderStep || mDrawOffsetSpeed > 0 && offsetDiff > width / 2 / mapRenderStep) {
    //     mDrawOffsetSpeed = offsetDiff / 50;
    // } else {
    //     mDrawOffsetSpeed = 0;
    // }

    if (bx - mDrawOffset > width / mapRenderStep) {
        mDrawOffsetSpeed = 10 / mapRenderStep;
    }

    if (mDrawOffsetSpeed > 0 && Math.round(bx - width / 2 / mapRenderStep) - mDrawOffset < 0) {
        mDrawOffsetSpeed = 0;
    }

    if (gameOver && keyIsPressed) {
        switch(keyCode) {
            case 37: case 65:
                mDrawOffset -= 5 / mapRenderStep;
                break;
            case 39: case 68:
                mDrawOffset += 5 / mapRenderStep;
                break;
        }
    } else {
        mDrawOffset += mDrawOffsetSpeed;
    }
}

function transformTerrain() {
    if (mouseIsPressed || touches.length > 0) {
        let inGameMouseX = Math.round(mouseX / mapRenderStep + mDrawOffset);
        let heightAtMouseX = m.getHeightAt(inGameMouseX);
        let relMouseY = 1 - mouseY / height;
        m.mineAt(inGameMouseX, miningRadius, 0.1 * (heightAtMouseX - relMouseY));
    }
    circle(mouseX, mouseY, miningRadius);
}

function checkIfGameIsOver() {
    return bx <= enemyX;
}

function displayScore() {
    score = max(Math.floor((bx - width / 2 / mapRenderStep) * 0.1 * mapRenderStep), score);

    fill(0);
    textAlign(LEFT);
    textSize(30);
    text("Score: " + score, 20, 40);
}