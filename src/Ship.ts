import { GameObjects, Scene } from "phaser";

export default class Ship extends GameObjects.Image {
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, Ship.name);
        scene.add.existing(this);
    }

    move(cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys) {
        let [moveX, moveY] = [0, 0];    
        if(cursorKeys.up!.isDown) {
            moveY -= 5;
        }
        if(cursorKeys.down!.isDown) {
            moveY += 5;
        }
        if(cursorKeys.left!.isDown) {
            moveX -= 5;
        }
        if(cursorKeys.right!.isDown) {
            moveX += 5
        }

        this.setPosition(this.x + moveX, this.y + moveY);
    }
}