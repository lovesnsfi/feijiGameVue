import HeroBullet from "./HeroBullet";
import { heroBulletArr, imgObj } from "../utils/Container";
/**
 * 玩家飞机对象
 */
export default class Hero {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.img = imgObj.hero1;
        //飞机高度与宽度除以2。变小一点
        this.width = this.img.width / 2;
        this.height = this.img.height / 2;
        this.isTwo = false; //是否是双排子弹
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    fire() {
        if (this.isTwo) {
            //发送双排子弹
            var heroBullet0 = new HeroBullet(this.x + (imgObj.hero1.width / 2 - this.width / 2) - 25, this.y, 50);
            var heroBullet1 = new HeroBullet(this.x + (imgObj.hero1.width / 2 - this.width / 2) + 25, this.y, 50);
            heroBulletArr.push(heroBullet0);
            heroBulletArr.push(heroBullet1);
        } else {
            var heroBullet = new HeroBullet(this.x + (imgObj.hero1.width / 2 - this.width / 2), this.y, 50);
            heroBulletArr.push(heroBullet);
        }
    }
}