class Powermeter extends Phaser.GameObjects.Sprite {
    constructor(scene, position, measure, ruby, rubyActive ) {
        super(scene, position.x, position.y, measure);
        this.scene = scene;
        this.setOrigin(0,0);
        this.scene.add.existing(this);
        this.setDepth(1);

        this.imgDefault = measure;
        this.ruby = ruby;
        this.rubyActive = rubyActive;

        this.setRuby();
    }

    setDifficultyLevel(level, levels, callback) {
        for (let i = 1; i <= level; i++) {
            // Задержка для каждой текстуры
            setTimeout(() => {
                this.setTexture(levels[i - 1]);
                if (i === level && callback) {
                    callback();
                }
                if (i === level && level == 8) {
                    this.setRuby(this.rubyActive)
                }
            }, i * 300);
        }
    } 
    
    setDefault() {
        this.setTexture(this.imgDefault);
    }

    setRuby(img = this.ruby) {
        if (this.rubyImg) this.rubyImg.destroy();

        this.rubyImg = this.scene.add.image(120, 7, img);
        this.rubyImg.setOrigin(0, 0);
        this.rubyImg.setDepth(2);
    }
}