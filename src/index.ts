import "phaser";
import { Game, Types } from "phaser";
import TitleScene from "./TitleScene";
import MainScene from "./MainScene";
import "./ImageExtention";
import GameOverScene from "./GameOverScene";

const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene : [new TitleScene(), new MainScene(), new GameOverScene()],
}

window.onload = () => {
    new Game(config);
}