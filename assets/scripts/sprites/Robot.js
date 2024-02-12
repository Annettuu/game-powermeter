class Robot extends Phaser.GameObjects.Sprite {
    constructor(scene, position, robot, robot1, robot2) {
        super(scene, position.x, position.y, robot);
        this.scene = scene;
        this.setOrigin(0,0);
        this.scene.add.existing(this);

        this.robot = robot;
        this.robot1 = robot1;
        this.robot2 = robot2;
    }

    setTextureElement(level) {
        this.setTexture(level == 8 ? this.robot2 : level < 8 ? this.robot1 : this.robot);
    }
}