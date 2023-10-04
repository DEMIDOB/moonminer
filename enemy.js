function moveEnemy() {
    enemyX += enemyVx;
}

function displayEnemy() {
    let enemyY = m.getHeightAt(enemyX);
    fill(255, 0, 0);
    noStroke();
    circle((enemyX - mDrawOffset) * mapRenderStep, height * (1 - enemyY) - ballRadius, ballRadius * 2);
}