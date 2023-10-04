function gameOverLoop() {
    noStroke();
    fill(255, 200);
    rect(0, height / 2 - 100, width, 200);

    noStroke();
    fill(200, 0, 0);
    textAlign(CENTER);
    textSize(60);
    text("Game Over!", width / 2, height / 2);

    textSize(20);
    fill(0);
    text("Score: " + score, width / 2, height / 2 + 40);
    text("Press R to restart", width / 2, height / 2 + 60);
}