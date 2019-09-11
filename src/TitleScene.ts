import { Scene } from "phaser";

export default class TitleScene extends Scene {
    constructor() {
        super({ key: 'TitleScene'});
    }

    preload() {
        this.load.setBaseURL("https://labs.phaser.io");
        this.load.image('sky', 'assets/skies/space3.png');
    }

    create() {
        this.add.image(400, 300, "sky");

        const titleText = this.add.text(400, 200, "SHOOTING GAME")
                             .setFontSize(80)
                             .setFontFamily("Impact")
        titleText.displayOriginX = titleText.width / 2;

        const pushButtonText = this.add.text(400, 350, "press any button")
                                    .setFontSize(40)
                                    .setFontFamily("Impact");
        pushButtonText.displayOriginX = pushButtonText.width / 2;

        this.input.keyboard.on("keydown", () => this.scene.start("MainScene"));
    }
}