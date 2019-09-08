import "phaser";
import { Game, Scene, BlendModes } from "phaser";

const preload = function(this: Scene) {
    this.load.setBaseURL("https://labs.phaser.io");
    
    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
}

const create = function(this: Scene) {
    this.add.image(400, 300, "sky");

    const text = this.add.text(400, 0, "SHOOTING GAME", {fontSize: "80px", fontFamily: "Impact"})
    text.displayOriginX = text.width / 2;

    this.physics.add.existing(text);
}


const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 100}
        }
    },
    scene: {
        preload: preload,
        create: create
    }
}

window.onload = () => {
    const game = new Game(config);
}