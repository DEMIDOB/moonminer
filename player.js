function movePlayer() {
    let bax = m.getGradientAt(bx) * 10 / mapRenderStep;
    bvx *= 1 - friction;
    bvx += bax;
    bx += bvx;
    if (bx <= 1) {
        bx = 1;
        bvx *= -1;
        bx += bvx;
    }
}

function displayPlayer() {
    let by = m.getHeightAt(bx);
    fill(0);
    noStroke();
    circle((bx - mDrawOffset) * mapRenderStep, height * (1 - by) - ballRadius, ballRadius * 2);
}