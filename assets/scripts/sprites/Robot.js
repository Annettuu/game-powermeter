class Robot extends Phaser.GameObjects.Sprite {
    constructor(scene, position, robotDefaul, robotLoss, robotWin) {
        super(scene, position.x, position.y, robotDefaul);
        this.scene = scene;
        this.setOrigin(0,0);
        this.scene.add.existing(this);

        this.robotDefaul = robotDefaul;
        this.robotLoss = robotLoss;
        this.robotWin = robotWin;
    }

    setTextureElement(level) {
        this.setTexture(level == 8 ? this.robotWin : level < 8 ? this.robotLoss : this.robotDefaul);
    }
}