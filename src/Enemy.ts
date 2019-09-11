import { GameObjects, Scene } from "phaser";

export default class Enemy extends GameObjects.Image {
    private _hitPoint: number;
    constructor(scene: Scene, x: number, y: number, texture: string, hitPoint: number) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this._hitPoint = hitPoint;
    }

    damage(value: number) {
        this._hitPoint -= value;
    }

    get hitPoint() {
        return this._hitPoint;
    }

    get isDead() {
        return this._hitPoint <= 0;
    }
}