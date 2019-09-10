import { Scene, Actions, Geom } from "phaser";

export default class MainScene extends Scene {
    private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    private keyA: Phaser.Input.Keyboard.Key;
    private ship: Phaser.GameObjects.Image;
    private enemy: Phaser.GameObjects.Image;
    private bullets: Array<Phaser.GameObjects.Image> = [];
    constructor() {
        super({ key: 'MainScene'});
    }

    preload() {
        this.load.image("ship", "https://labs.phaser.io/assets/sprites/shmup-ship2.png");
        this.load.image("enemy", "https://labs.phaser.io/assets/sprites/poo.png");
        this.load.image("bullet", "https://labs.phaser.io/assets/sprites/bullets/bullet3.png");
    }

    create() {
        this.ship = this.add.image(50, 300, "ship");
        this.enemy = this.add.image(600, 300, "enemy");

        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey("A") 

        for(let i = 0; i < 20; i++) {
            const bullet = this.add.image(-100, -100, "bullet");
            bullet.active = false;
            this.bullets.push(bullet);
        }
    }

    update() {
        //機体
        let [moveX, moveY] = [0, 0]
        if(this.cursorKeys.up!.isDown) {
            moveY -= 3;
        }
        if(this.cursorKeys.down!.isDown) {
            moveY += 3;
        }
        if(this.cursorKeys.left!.isDown) {
            moveX -= 3;
        }
        if(this.cursorKeys.right!.isDown) {
            moveX += 3
        }
        this.ship.setPosition(this.ship.x + moveX, this.ship.y + moveY);

        //弾
        if(this.keyA.isDown) {
            //非アクティブの弾を射出する
            const inactiveBullet = this.bullets.find(b => !b.active);
            if(inactiveBullet !== undefined) {
                inactiveBullet.setPosition(this.ship.x, this.ship.y);
                inactiveBullet.active = true;
            }
            console.log(this.bullets)
        }
        //弾を進める
        this.bullets.filter(b => b.active)
                    .forEach(b => b.setPosition(b.x + 20, b.y));
        //画面外の弾を非アクティブにする
        this.bullets.filter(b => b.active && b.x >= 900)
                    .forEach(b => b.active = false);

        //うんこ
        Actions.RotateAroundDistance([this.enemy], { x: 400, y: 300 }, 0.03, 100);
    }
}