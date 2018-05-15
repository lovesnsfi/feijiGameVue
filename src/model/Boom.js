/**
 * 爆炸动画
 */
import { imgObj, boomArr } from "../utils/Container";
export default class Boom {
    constructor(enemy) {
            this.x = enemy.x;
            this.y = enemy.y;
            this.type = enemy.type;
            this.isDrawFinsh = true; //爆炸动画是否完成
            if (this.type == 0) {
                //小飞机爆炸
                this.imgs = [imgObj.enemy0_down1, imgObj.enemy0_down2, imgObj.enemy0_down3, imgObj.enemy0_down4]
            } else if (this.type == 1) {
                //中等飞机爆炸
                this.imgs = [imgObj.enemy1_down1, imgObj.enemy1_down2, imgObj.enemy1_down3, imgObj.enemy1_down4]
            } else if (this.type == 2) {
                //大飞机爆炸
                this.imgs = [imgObj.enemy2_down1, imgObj.enemy2_down2, imgObj.enemy2_down3, imgObj.enemy2_down4, imgObj.enemy2_down5, imgObj.enemy2_down6]
            }
            this.width = this.imgs[0].width;
            this.height = this.imgs[0].height;
        }
        /**
         * @name 绘画爆炸动画的方法
         * @param {Object} ctx  绘画对象 
         */
    draw(ctx) {
        if (this.isDrawFinsh) {
            this.isDrawFinsh = false; //告诉外边的绘画对象，这里的爆炸动画还没有播放完成
            let count = 0;
            let id = setInterval(() => {
                ctx.drawImage(this.imgs[count], this.x, this.y, this.width, this.height);
                count++;
                if (count >= this.imgs.length) {
                    this.isDrawFinsh = true;
                    clearInterval(id);
                    boomArr.removeByValue(this); //爆炸动画完成以后就把自己移除掉
                }
            }, 50);
        }
    }
}