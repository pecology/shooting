import { Scene, Actions, Geom } from "phaser";
import Enemy from "./Enemy";
import Ship from "./Ship";
import Bullet from "./Bullet";
import Bullets from "./Bullets";
import GameOverScene from "./GameOverScene";
import GameClearScene from "./GameClearScene";
import Beam from "./Beam";

export default class MainScene extends Scene {
    private ship: Ship;
    private bullets: Bullets;
    private enemy: Enemy;
    private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyB: Phaser.Input.Keyboard.Key;
    private bulletFiringIntervalMsec: number = 100;
    constructor() {
        super({ key: MainScene.name});
    }

    preload() {
        this.load.image(Ship.name, "https://labs.phaser.io/assets/sprites/shmup-ship2.png");
        this.load.image(Enemy.name, "https://labs.phaser.io/assets/sprites/poo.png");
        this.load.image(Bullet.name, "https://labs.phaser.io/assets/sprites/bullets/bullet3.png");
        this.load.image(Beam.name, "../resource/img/beam.png");
    }

    create() {
        this.ship = new Ship(this, 50, 300);
        this.bullets = new Bullets();
        this.enemy = new Enemy(this, 600, 300, 10);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey("A");
        this.keyB = this.input.keyboard.addKey("B") 
    }

    update() {
        if(this.input.keyboard.checkDown(this.keyA, this.bulletFiringIntervalMsec)) {
            const newBullet = new Bullet(this, this.ship.x, this.ship.y, 10, 1);
            this.bullets.push(newBullet);
        }

        if(this.keyB.isDown) {
            this.ship.emitBeam();
        }

        if(this.keyB.isUp) {
            this.ship.stopBeam();
        }

        this.moveObjects();

        this.executeHitProcess();

        if(this.ship.isDead) {
            this.scene.start(GameOverScene.name);
        }

        if(this.enemy.isDead) {
            this.scene.start(GameClearScene.name);
        }
    }

    moveObjects() {
        this.ship.move(this.cursorKeys);
        this.bullets.move();
        this.enemy.move();
    }

    executeHitProcess() {
        this.bullets.attack(this.enemy);
        this.enemy.attack(this.ship);
    }
}