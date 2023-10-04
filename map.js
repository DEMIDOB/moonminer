class Map {
    constructor(noiseStep) {
        this.noiseStep = noiseStep;
        this.regions = {};
    }

    getRegionIdxAt(x) {
        return Math.floor(x / REGION_SIZE);
    }

    getGradientAt(x) {
        return this.getHeightAt(x - 1) - this.getHeightAt(x + 1);
    }

    createRegion(regIdx) {
        console.log("Generating region", regIdx);
        this.regions[regIdx] = new Region(regIdx * REGION_SIZE, this.noiseStep);
    }

    getRegionAt(x) {
        let regIdx = this.getRegionIdxAt(x);
        if (! (regIdx in this.regions)) {
            this.createRegion(regIdx);
        }

        return this.regions[regIdx];
    }

    getHeightAt(x) {
        x = Math.round(x);
        let region = this.getRegionAt(x);
        let localX = x % REGION_SIZE;
        // if (localX < 0) {
        //     localX = REGION_SIZE + localX;
        // }
        return region.getHeightAt(localX);
    }

    display(step = 1, offset = 0) {
        noFill();
        stroke(0);
        beginShape();
        vertex(0, height);
        for (let x = offset; x <= width / step + offset; ++x) {
            let y = height * (1 - this.getHeightAt(x));
            vertex((x - offset) * step, y);
        }
        vertex(width, height);
        endShape();
    }

    mineAt(x, mineRadius = 20, baseSpeed = 0.005) {
        x = Math.round(x);

        for (let lx = x - mineRadius; lx < x + mineRadius; ++lx) {
            let regIdx = this.getRegionIdxAt(lx);
            let localX = lx % REGION_SIZE;
            this.regions[regIdx].decreseHeightAt(localX, baseSpeed * (1 - (Math.abs(lx - x) / mineRadius)));
        }
    }
}