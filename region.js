class Region {
    constructor(offset, noiseStep, steepness = 0.5) {
        this.heightMap = [];
        this.offset = offset;
        this.noiseStep = noiseStep;
        this.steepness = steepness;
    }

    isGenerated() {
        return this.heightMap.length === REGION_SIZE;
    }

    generate() {
        this.heightMap = [];

        for (let i = this.offset; i < this.offset + REGION_SIZE; i++) {
            this.heightMap.push(noise(i * this.noiseStep) * this.steepness);
        }
    }

    getHeightAt(localX) {
        if (!this.isGenerated()) {
            this.generate();
        }
        return this.heightMap[localX];
    }

    decreseHeightAt(localX, by = 0.001) {
        if (!this.isGenerated()) {
            this.generate();
        }

        this.heightMap[localX] -= by;
    }
}