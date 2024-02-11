class Hammer extends Phaser.GameObjects.Sprite {
    constructor(scene, position, hammer) {
        super(scene, position.x, position.y, hammer);
        this.scene = scene;
        this.setOrigin(0.5, 1);
        this.scene.add.existing(this);
        this.angle = -45;
        this.setDepth(3);
    }

    buttonPress(callback) {
        this.scene.tweens.add({
            targets: this,
            y: this.y - 80,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.scene.tweens.add({
                    targets: this,
                    x: this.x - 25,
                    angle: -90,
                    duration: 200,
                    onComplete: () => {
                        if (callback) {
                            callback();
                        }
                    }
                });
            }
        });
    }

    setDefault() {
        this.scene.tweens.add({
            targets: this,
            x: this.x + 25,
            angle: -45,
            duration: 200,
            ease: 'Power2',
            onComplete: () => {
                this.scene.tweens.add({
                targets: this,
                y: this.y + 80,
                duration: 500,
             });
            }
        });
    }
    
}
