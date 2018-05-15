import { imgObj, fullBoomArr } from "../utils/Container";
export default class FullBoom{
    constructor() {
        this.x = parseInt(Math.random() * 480)
        this.y = -50;
        this.speed = 5;
        this.img = imgObj.prop_type_1;
        this.width = this.img.width;
        this.height = this.img.height;
    }
    movie() {
        this.y += this.speed;
        if (this.y >= 850) {
            //移动到屏幕最下方
            fullBoomArr.removeByValue(this); //删除自已
        }
    }
    draw(ctx) {
        this.movie();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}