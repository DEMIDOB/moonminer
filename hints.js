function displayDesktopControlsHints() {
    noStroke();
    fill(100);
    textSize(15);
    textAlign(RIGHT);
    // text("Use the arrow keys or [A]-[D] to move the camera", width - 20, height - 20);
    text("Click to transform the terrain", width - 20, height - 20);
}

function displayGameOverHints() {
    textAlign(CENTER);
    textSize(20);
    fill(0);
    text("Score: " + score, width / 2, height / 2 + 45);
    text("Press [R] to restart", width / 2, height / 2 + 70);

    if (mouseY > height / 2 + 70 - 20 && mouseY < height / 2 + 70 + 10) {
        cursor(HAND);

        if (mouseIsPressed) {
            reset();
            cursor(ARROW);
        }
    } else {
        cursor(ARROW);
    }
}