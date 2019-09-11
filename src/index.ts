import "phaser";
import { Game, Scene, BlendModes } from "phaser";
import TitleScene from "./TitleScene";
import MainScene from "./MainScene";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene : [new TitleScene(), new MainScene()]
}

window.onload = () => {
    new Game(config);
}