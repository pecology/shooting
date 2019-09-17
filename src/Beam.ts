import { GameObjects, Scene } from "phaser";

export default class Beam extends GameObjects.Image {
    constructor(scene: Scene, x: number, y: number, offensivePower: number) {
        super(scene, x, y, Beam.name);
        this.setOrigin(0, 0.5);
        scene.add.existing(this);
    }
}