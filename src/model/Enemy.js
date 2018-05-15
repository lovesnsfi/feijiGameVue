import { imgObj, enemyArr, boomArr } from "../utils/Container";
import { playDieMusic } from "../utils/commonFunction";
import gameConfig from "../utils/gameConfig";
import Boom from "../model/Boom";
export default class Enemy {
    constructor() {
        this.x = parseInt(Math.random() * 480);
        this.y = -100;
        var temp = parseInt(Math.random() * 100);
        if (temp < 60) {
            //小飞机
            this.type = 0;
            this.img = imgObj.enemy0;
            this.speed = 5;
            this.life = 1;
        } else if (temp >= 60 && temp < 90) {
            //中等飞机
            this.type = 1;
            this.img = imgObj.enemy1;
            this.speed = 4;
            this.life = 3;
        } else {
            //大飞机
            this.type = 2;
            this.img = imgObj.enemy2;
            this.speed = 3;
            this.life = 5;
        }
        this.width = this.img.width;
        this.height = this.img.height;

        //防止敌人飞机超出屏幕
        if (this.x > 480 - this.width) {
            this.x = 480 - this.width;
        }
    }
    movie() {
        this.y += this.speed;
        if (this.y > 850) {
            enemyArr.removeByValue(this);
        }
    }
    draw(ctx) {
        this.movie();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    isDie() {
        if (this.life <= 0) {
            //已经死亡
            /**
             * 第一步：移除自己
             * 第二步：播放声音
             * 第三步：播放死亡动画
             * 第四步：记录得分
             */
            playDieMusic();
            //创建爆炸动画
            var boom = new Boom(this);
            boomArr.push(boom);
            enemyArr.removeByValue(this);
            gameConfig.score += (this.type + 1) * 10;

        }
    }
}