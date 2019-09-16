import { Scene } from "phaser";
import MainScene from "./MainScene";

export default class GameOverScene extends Scene {
    constructor() {
        super({key: GameOverScene.name});
    }

    preload(){
        
    }

    create() {
        this.add.text(400, 200, "GAME OVER")
                .setFontSize(80)
                .setFontFamily("Impact")
                .setOrigin(0.5, 0.5);

        this.add.text(400, 350, "press any button to retry")
                .setFontSize(40)
                .setFontFamily("Impact")
                .setOrigin(0.5, 0.5);

        this.input.keyboard.on("keydown", () => this.scene.start(MainScene.name));
    }
}