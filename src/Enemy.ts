import { GameObjects, Scene, Actions } from "phaser";
import Ship from "./Ship";

export default class Enemy extends GameObjects.Image {
    private _hitPoint: number;
    constructor(scene: Scene, x: number, y: number, hitPoint: number) {
        super(scene, x, y, Enemy.name);
        scene.add.existing(this);

        this._hitPoint = hitPoint;
    }

    move() {
        Actions.RotateAround([this], { x: 400, y: 300 }, 0.03);
    }

    damage(value: number) {
        this._hitPoint -= value;
        if(this.isDead) {
            this.visible = false;
            this.destroy();
        }
    }

    attack(ship: Ship) {
        if(this.isDead) return;
        
        if(this.isOverlap(ship)) {
            ship.crash();
        }
    }

    get hitPoint() {
        return this._hitPoint;
    }

    get isDead() {
        return this._hitPoint <= 0;
    }
}