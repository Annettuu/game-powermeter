class Scale extends Phaser.GameObjects.Sprite {
    intervalActive = false
    propFunction
    value = 0

    constructor(scene, position, scale, valueSetter) {
        super(scene, position.x, position.y, scale);
        this.scene = scene;
        this.setOrigin(0,0);
        this.scene.add.existing(this);
        this.propFunction = valueSetter
    }

    setIntervalActive(boolean) {
        this.intervalActive = boolean
    }
    setPercent(value) {
        const percent = 100 / 10 * value
        this.propFunction(percent)
    }
    startRandomInterval() {
        this.setIntervalActive(true)
        const maxValue = 10
        const minValue = 0
        this.value = 0
        let vector = 'up' // down
        let tickTest = 5
        let tick = 1
        function getRandomBoolean () {
            return Math.random() * 10 > 3
        }
        function getRandomTick() {
            const random = Math.floor(Math.random() * 10)
            const minTick = 2
            return Math.max(...[minTick, random])
        }
        const scale = () => {
            if (this.value === maxValue) {
                vector = 'down'
            }
            if (this.value === minValue) {
                vector = 'up'
            }
            vector === 'up' ? this.value++ : this.value--
            setTimeout(() => {
                if (tick % tickTest === 0) {
                    vector = getRandomBoolean() ? 'up' : 'down'
                    tickTest = getRandomTick()
                }
                tick++
                if (this.intervalActive) {
                    this.setPercent(this.value)
                    scale()
                }
            }, 100)
        }
        scale()
    }
    returnLevel() {
        return this.value > 8 ? 8 : this.value < 1 ? 1 : this.value
    }
}