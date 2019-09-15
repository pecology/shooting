import Bullet from "./Bullet";
import Enemy from "./Enemy";

export default class Bullets extends Array<Bullet> {
    constructor() {
        super();
        Object.setPrototypeOf(this, Bullets.prototype);
    }

    move() {
        this.forEach(b => b.move());

        //画面外の弾を消去
        const outOfBoundsBullets = this.filter(b => b.isOutOfScreen)
        outOfBoundsBullets.forEach(b => b.destroy());
        this.removeDestroyedBullets();
    }

    attack(enemy: Enemy) {
        this.forEach(b => b.attack(enemy));
        this.removeDestroyedBullets();
    }

    removeDestroyedBullets() {
        for(let i = this.length - 1; i >= 0; i--) {
            if(this[i].isDestroyed) {
                this.splice(i, 1)
            }
        }
    }
}