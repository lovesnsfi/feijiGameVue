import { heroBulletArr, imgObj } from "../utils/Container";
export default class HeroBullet {
    constructor(x, y, speed) {
        this.speed = speed;
        this.img = imgObj.bullet2;
        this.width = this.img.width;
        this.height = this.img.height;
        this.x = x;
        this.y = y;
    }
    movie() {
        this.y -= this.speed;
        if (this.y <= 0) {
            heroBulletArr.removeByValue(this);
        }
    }
    draw(ctx) {
        this.movie();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}