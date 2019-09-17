import { GameObjects, Scene } from "phaser";
import Beam from "./Beam";

export default class Ship extends GameObjects.Image {
    private _isdead: boolean;
    private _beam: Beam;
    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, Ship.name);
        scene.add.existing(this);

        this._beam = new Beam(scene, x, y, 1);
        this._beam.visible = false;

        this._isdead = false;
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

    emitBeam() {
        this._beam.setPosition(this.x + 20, this.y);
        this._beam.visible = true;
    }

    stopBeam() {
        this._beam.visible = false;
    }

    crash() {
        this.destroy();
        this._isdead = true;
    }

    get isDead() {
        return this._isdead;
    }
}