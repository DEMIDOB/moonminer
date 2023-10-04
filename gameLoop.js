function gameLoop() {
    transformTerrain();

    movePlayer();

    moveEnemy();

    displayScore();

    gameOver = checkIfGameIsOver();
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