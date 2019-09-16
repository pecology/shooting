import { Scene, Actions, Geom } from "phaser";
import Enemy from "./Enemy";
import Ship from "./Ship";
import Bullet from "./Bullet";
import Bullets from "./Bullets";
import GameOverScene from "./GameOverScene";

export default class MainScene extends Scene {
    private ship: Ship;
    private bullets: Bullets;
    private enemy: Enemy;
    private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    private keyA: Phaser.Input.Keyboard.Key;
    constructor() {
        super({ key: MainScene.name});
    }

    preload() {
        this.load.setBaseURL("https://labs.phaser.io/assets/");
        this.load.image(Ship.name, "sprites/shmup-ship2.png");
        this.load.image(Enemy.name, "sprites/poo.png");
        this.load.image(Bullet.name, "sprites/bullets/bullet3.png");
    }

    create() {
        this.ship = new Ship(this, 50, 300);
        this.bullets = new Bullets();
        this.enemy = new Enemy(this, 600, 300, 10);
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey("A") 
    }

    update() {
        if(this.input.keyboard.checkDown(this.keyA, 200)) {
            const newBullet = new Bullet(this, this.ship.x, this.ship.y, 10, 1);
            this.bullets.push(newBullet);
        }

        this.moveObjects();

        this.executeHitProcess();

        if(this.ship.isDead) {
            this.scene.start(GameOverScene.name);
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