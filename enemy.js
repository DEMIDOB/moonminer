function moveEnemy() {
    enemyX += enemyVx;
    enemyVx += 0.0003;
}

function displayEnemy() {
    let enemyY = m.getHeightAt(enemyX);
    fill(255, 0, 0);
    noStroke();
    circle((enemyX - mDrawOffset) * mapRenderStep, height * (1 - enemyY) - ballRadius, ballRadius * 2);
}