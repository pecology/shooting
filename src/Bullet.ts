import { GameObjects, Scene } from "phaser";
import Enemy from "./Enemy";

export default class Bullet extends GameObjects.Image {
    private _speed: number;
    private _isDestroyed: boolean = false;
    private _offensivePower: number;
    constructor(scene: Scene, x: number, y: number, speed: number, offensivePower: number) {
        super(scene, x, y, Bullet.name);
        scene.add.existing(this);

        this._speed = speed;
        this._offensivePower = offensivePower;
    }

    get speed() {
        return this._speed;
    }

    get isOutOfScreen() {
        return this.x >= 900;
    }

    move() {
        this.x += this.speed;
    }

    attack(enemy: Enemy) {
        if(enemy.isDead) return;
        
        if(this.isOverlap(enemy)) {
            enemy.damage(this._offensivePower);
            this.destroy();
        }
    }

    destroy() {
        super.destroy();
        this._isDestroyed = true;
    }

    get isDestroyed() {
        return this._isDestroyed;
    }
}