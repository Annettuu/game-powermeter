class ActionButton extends Phaser.GameObjects.Sprite {
    constructor(scene, position, startButton, punchButton) {
        super(scene, position.x, position.y, startButton);
        this.scene = scene;
        this.startButton = startButton;
        this.punchButton = punchButton;

        this.setOrigin(0,0);
        this.scene.add.existing(this);
        this.setInteractive();
    }

    setDefault() {
        this.setTexture(this.startButton);
    }
    start() {
        this.setTexture(this.punchButton);
    }
}