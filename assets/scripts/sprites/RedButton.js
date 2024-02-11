class RedButton extends Phaser.GameObjects.Sprite {
    constructor(scene, position, buttonDefault, buttonActive) {
        super(scene, position.x, position.y, buttonDefault);
        this.scene = scene;
        this.setOrigin(0,0);
        this.scene.add.existing(this);

        this.buttonActive = buttonActive;
        this.buttonDefault = buttonDefault;
    }
    setActive() {
        this.setTexture(this.buttonActive);
    }

    setDefault() {
        this.setTexture(this.buttonDefault);
    }
}