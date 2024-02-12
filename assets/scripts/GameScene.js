class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    powermeter
    actionButton
    hammer
    redButton
    scale
    scaleBar
    robot

    level
    state = 'default'

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('button-default', 'assets/images/redButton/button.png');
        this.load.image('button-active', 'assets/images/redButton/button-active.png');
        this.load.image('hammer', 'assets/images/hammer.png');
        this.load.image('powermeter-main', 'assets/images/powermeter/powermeter_main.png');
        this.load.image('powermeter', 'assets/images/powermeter/powermeter.png');
        this.load.image('powermeter1', 'assets/images/powermeter/powermeter1.png');
        this.load.image('powermeter2', 'assets/images/powermeter/powermeter2.png');
        this.load.image('powermeter3', 'assets/images/powermeter/powermeter3.png');
        this.load.image('powermeter4', 'assets/images/powermeter/powermeter4.png');
        this.load.image('powermeter5', 'assets/images/powermeter/powermeter5.png');
        this.load.image('powermeter6', 'assets/images/powermeter/powermeter6.png');
        this.load.image('powermeter7', 'assets/images/powermeter/powermeter7.png');
        this.load.image('powermeter8', 'assets/images/powermeter/powermeter8.png');
        this.load.image('ruby', 'assets/images/ruby/ruby.png');
        this.load.image('ruby-active', 'assets/images/ruby/ruby-active.png');
        this.load.image('robot-default', 'assets/images/robot/robot-default.png');
        this.load.image('robot-loss', 'assets/images/robot/robot-loss.png');
        this.load.image('robot-win', 'assets/images/robot/robot-win.png');
        this.load.image('scale-main', 'assets/images/scale/scale-main.png');
        this.load.image('scale', 'assets/images/scale/scale.png');
        this.load.image('start-button', 'assets/images/actionButton/button-start.png');
        this.load.image('punch-button', 'assets/images/actionButton/button-punch.png');
    }
    makeBar(x, y, color) {
        let bar = this.add.graphics();
        bar.fillStyle(color, 1);
        bar.fillRect(0, 0, 36, 143);
        bar.x = x;
        bar.y = y;
        return bar;
    }
    setValue(percentage) {
        this.scaleBar.scaleY = -percentage/100;
    }

    create() {
        this.add.sprite(config.width / 2, config.height / 2, 'background')
        this.add.sprite(185, 180, 'powermeter-main')
        this.add.sprite(50, 540, 'scale-main')
        this.scaleBar = this.makeBar(32, 611, 0x00D355)
        this.setValue(0)

        this.actionButton = new ActionButton(this, { x: 80, y: 575 },'start-button', 'punch-button')
        this.hammer = new Hammer(this, { x: 290, y: 430 }, 'hammer')
        this.redButton = new RedButton(this, { x: 120, y: 350 }, 'button-default', 'button-active')
        this.scale = new Scale(this, { x: 35, y: 470 }, 'scale', this.setValue.bind(this))
        this.robot = new Robot(this, { x: 265, y: 525 }, 'robot-default', 'robot-loss', 'robot-win')
        this.powermeter = new Powermeter(this, { x: 62, y: 20 }, 'powermeter', 'ruby', 'ruby-active')

        let  clickEnabled = true;
        this.input.on('gameobjectup', function (pointer, gameObject) {
        if (clickEnabled) {
            gameObject.emit('clicked', gameObject);
            clickEnabled = false;
            this.time.delayedCall(700, function () {
                clickEnabled = true;
                }, [], this);
            }
        }, this);
        this.actionButton.on('clicked', this.onClicked, this)

        this.createText();
    }

    setGameState(value) {
        // валидация value
        const validValues = ['default', 'readyToPunch']
        this.state = validValues.includes(value) ? value : 'default'
    }

    startGame() {
        if (this.level) this.setDefault()

        this.actionButton.start()
        this.setGameState('readyToPunch')
        this.scale.startRandomInterval()
        this.createText('punch');

    }

    setDefault() {
        // возвращаем спрайты на начальные позиции
        this.powermeter.setDefault();
        this.powermeter.setRuby();
        this.redButton.setDefault();
        this.hammer.setDefault();
        this.robot.setTextureElement();
    }

    punch() {
        this.scale.setIntervalActive(false)
        this.level = this.scale.returnLevel();

        this.actionButton.setVisible(false)
        this.deleteText();

        // вызываем анимации
        this.hammer.buttonPress(() => {
            this.redButton.setActive();
            this.powermeter.setDifficultyLevel(this.level, ['powermeter1','powermeter2','powermeter3','powermeter4','powermeter5','powermeter6', 'powermeter7', 'powermeter8'], () => {
                this.finishGame()
            });
        });
    }
    finishGame() {
        this.actionButton.setVisible(true)
        this.robot.setTextureElement(this.level);
        this.createText();
        this.actionButton.setDefault();
        this.setGameState('default')
    }
    
    onClicked() {
        const actionMap = {
            default: this.startGame,
            readyToPunch: this.punch,
        }
        actionMap[this.state].call(this)
    }

    deleteText() {
        if (this.text) this.text.destroy();

        if (this.additionalText) this.additionalText.destroy()
    }

    createText(arg) {
        this.deleteText();

        const textMap = {
            default: 'Привет!\nПроверим твою силу!',
            punch: 'Жми на кнопку\nв нужный момент!',
            retry: 'Неплохо!\nПопробуйте еще раз!!',
            success: 'ВОТ ЭТО СИЛА!\nТы выбил главный приз!'
        };
    
        let textToShow;
        if (arg) {
            textToShow = textMap[arg];
        } else {
            if (this.level === 8) {
                textToShow = textMap.success;
            } else if (this.level < 8) {
                textToShow = textMap.retry;
            } else {
                textToShow = textMap.default;
            }
        }
    
        this.text = this.add.text(170, 530, textToShow, {
            font: '700 14px Roboto',
            align: 'center',
            weight: 700,
        }).setOrigin(0.5);

        if (this.level === 8 && textToShow === textMap.success) {
            this.additionalText = this.add.text(170, 555, 'Рубин!', {
                font: '700 14px Roboto',
                align: 'center',
                weight: 700,
                fill: 'red'
            }).setOrigin(0.5);
        }
    }
}