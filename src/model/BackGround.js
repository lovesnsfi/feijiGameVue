import { imgObj } from "../utils/Container";
export default class BackGround {
    /**
     * 游戏背景对象
     * @param {Number} speed 背景移动速度
     */
    constructor(speed) {
            this.x = 0;
            this.y = -850;
            this.speed = speed;
            this.img = imgObj.background;
            this.width = this.img.width;
            this.height = this.img.height;
        }
        /**
         * 移动的方法
         */
    movie() {
            this.y += this.speed;
            if (this.y >= 0) {
                this.y = -850;
            }
        }
        /**
         * 
         * @param {Object} ctx 绘画对象 
         */
    draw(ctx) {
        this.movie();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

}