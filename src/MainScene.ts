import { Scene, Actions, Geom } from "phaser";

export default class MainScene extends Scene {
    private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    private ship: Phaser.GameObjects.Image;
    private enemy: Phaser.GameObjects.Image;
    constructor() {
        super({ key: 'MainScene'});
    }

    preload() {
        this.load.image("ship", "https://labs.phaser.io/assets/sprites/shmup-ship2.png");
        this.load.image("enemy", "https://labs.phaser.io/assets/sprites/poo.png");
    }

    create() {
        this.ship = this.add.image(50, 300, "ship");
        this.enemy = this.add.image(600, 300, "enemy");

        this.cursorKeys = this.input.keyboard.createCursorKeys();
    }

    update() {
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

        Actions.RotateAroundDistance([this.enemy], { x: 400, y: 300 }, 0.03, 100);
    }
}