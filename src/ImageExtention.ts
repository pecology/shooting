declare namespace Phaser.GameObjects {
    interface Image {
        isOverlap(other: Image): boolean
    }
}

Phaser.GameObjects.Image.prototype.isOverlap = function(other: Phaser.GameObjects.Image) {
    const rect1 = this.getBounds();
    const rect2 = other.getBounds();

    const isOverlapVertical = rect1.bottom >= rect2.top && rect1.top <= rect2.bottom;
    const isOverlapHolizontal = rect1.right >= rect2.left && rect1.left <= rect2.right;
    return isOverlapVertical && isOverlapHolizontal;
}