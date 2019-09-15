import { Scene } from "phaser";
import MainScene from "./MainScene";

export default class TitleScene extends Scene {
    constructor() {
        super({key: TitleScene.name});
    }

    preload() {
        this.load.image('backGround', 'https://labs.phaser.io/assets/skies/space3.png');
    }

    create() {
        this.add.image(400, 300, "backGround");

        this.add.text(400, 200, "SHOOTING GAME")
            .setFontSize(80)
            .setFontFamily("Impact")
            .setOrigin(0.5, 0.5);

        this.add.text(400, 350, "press any button")
                .setFontSize(40)
                .setFontFamily("Impact")
                .setOrigin(0.5, 0.5);

        this.input.keyboard.on("keydown", () => this.scene.start(MainScene.name));
    }
}