import { Scene, Actions, Geom } from "phaser";
import Enemy from "./Enemy";

export default class MainScene extends Scene {
    private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    private keyA: Phaser.Input.Keyboard.Key;
    private ship: Phaser.GameObjects.Image;
    private enemy: Enemy | null;
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
        this.enemy = new Enemy(this, 600, 300, "enemy", 10);

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
        if(this.keyA.isDown && this.game.getFrame() % 5 === 0) { // 5フレームに一回だけ
            //非アクティブの弾を射出する
            const inactiveBullet = this.bullets.find(b => !b.active);
            if(inactiveBullet !== undefined) {
                inactiveBullet.setPosition(this.ship.x, this.ship.y);
                inactiveBullet.active = true;
                inactiveBullet.visible = true;
            }
        }
        //弾を進める
        this.bullets.filter(b => b.active)
                    .forEach(b => b.setPosition(b.x + 20, b.y));
        //画面外の弾を非アクティブにする
        this.bullets.filter(b => b.active && b.x >= 900)
                    .forEach(b => b.active = false);

        //当たった弾を消す + ダメージ
        this.bullets.filter(b => b.active && this.isOverlap(b, this.enemy))
                    .forEach(b => {
                        b.active = false;
                        b.visible = false;

                        if(this.enemy !== null) {
                            this.enemy.damage(1);
                            if(this.enemy.isDead) {
                                this.enemy.destroy();
                                this.enemy = null;
                            }
                        }
                    });

        //うんこ
        if(this.enemy) {
            Actions.RotateAroundDistance([this.enemy], { x: 400, y: 300 }, 0.03, 100);
        }
    }

    isOverlap(image1: Phaser.GameObjects.Image | null, image2: Phaser.GameObjects.Image | null): boolean {
        if(!image1 || !image2) {
            return false;
        }

        const rect1 = image1.getBounds();
        const rect2 = image2.getBounds();

        const isOverlapVertical = rect1.bottom >= rect2.top && rect1.top <= rect2.bottom;
        const isOverlapHolizontal = rect1.right >= rect2.left && rect1.left <= rect2.right;
        return isOverlapVertical && isOverlapHolizontal;
    }
}