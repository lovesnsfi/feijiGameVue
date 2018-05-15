<template>
  <div class="index">
    <div class="gameBox">
      <transition enter-active-class="animated bounceInDown" leave-active-class=" animated zoomOutUp">
        <login-box v-if="showGameBox" @initGame="initGame"></login-box>
      </transition>
      <transition enter-active-class="animated bounceInRight" leave-active-class="animated flipOutY">
        <div class="nickBox form-group" v-if="showLoginBox">
          <div class=" input-group">
            <input type="text" placeholder="请输入昵称" class=" form-control" v-model="nickName">
            <div class=" input-group-btn">
              <button type="button" class="btn btn-default" @click="startGame">确定</button>
            </div>
          </div>
        </div>
      </transition>
      <result-box v-if="showResultBox"></result-box>
      <canvas  class="game" ref="game" width="480px" height="850px" @mousemove="mousemove($event)"></canvas>
    </div>
    <audio src="../../static/res/game_music.mp3" loop ref="bgm"></audio>
  </div>
</template>

<script>
import loginBox from "../components/LoginBox";
import BackGround from "../model/BackGround";
import Hero from "../model/Hero";
import {
  heroBulletArr,
  imgObj,
  enemyArr,
  boomArr,
  twoBulletArr,
  fullBoomArr
} from "../utils/Container";
import loadImgs from "../utils/loadImgs";
import Enemy from "../model/Enemy";
import Crash from "../utils/Crash";
import gameConfig from "../utils/gameConfig";
import resultBox from "../components/resultBox";
import { insertScore } from "../utils/sqlHelper";
import TwoBullet from "../model/TwoBullet";
import FullBoom from "../model/FullBoom";
export default {
  name: "index",
  data() {
    return {
      showGameBox: true,
      showLoginBox: false,
      showResultBox: false,
      nickName: "",
      ctx: null,
      hero: null,
      bg: null,
      gameId: null, //游戏定时器ID
      fireId: null //发射子弹定时器ID
    };
    //获取画布绘画对象
  },
  components: {
    loginBox,
    resultBox
  },
  mounted() {
    loadImgs().then(() => {
      //游戏开始时，默认显示背景图
      this.ctx = this.$refs.game.getContext("2d");
      this.bg = new BackGround(3);
      this.bg.draw(this.ctx);
    });
  },
  methods: {
    initGame() {
      this.showGameBox = false;
      this.showLoginBox = true;
    },
    startGame() {
      if (
        this.nickName != null &&
        this.nickName != "" &&
        this.nickName != undefined
      ) {
        //保存用户昵称
        gameConfig.nickName = this.nickName;
        this.showLoginBox = false;
        //播放背景音乐
        this.$refs.bgm.play();
        this.hero = new Hero(200, 600);
        //绘画游戏对象的定时器
        this.gameId = setInterval(() => {
          this.drawGameObject();
        }, 50);

        //发射子弹的方法
        this.fireId = setInterval(() => {
          this.hero.fire();
        }, 400);
      } else {
        alert("请输入昵称");
      }
    },
    //鼠标移动，飞机移动
    mousemove(event) {
      var x = event.pageX - event.currentTarget.getBoundingClientRect().left;
      var y = event.pageY - event.currentTarget.getBoundingClientRect().top;
      if (this.hero != null) {
        this.hero.x = x;
        this.hero.y = y;
      }
    },
    //绘制游戏对象
    drawGameObject() {
      this.randomAddEnemy(); //添加敌人飞机
      this.checkCrash(); //碰撞检测
      this.randomAddTwoEnemy();  //添加双排子弹的道具
      if (this.bg != null) {
        this.bg.draw(this.ctx);
      }
      if (this.hero != null) {
        this.hero.draw(this.ctx);
      }
      //绘画玩家子弹
      for (var i = 0; i < heroBulletArr.length; i++) {
        heroBulletArr[i].draw(this.ctx);
      }
      //绘画敌人飞机
      for (var i = 0; i < enemyArr.length; i++) {
        enemyArr[i].draw(this.ctx);
      }
      //绘画爆炸动画
      for (let i = 0; i < boomArr.length; i++) {
        boomArr[i].draw(this.ctx);
      }
      //绘画双排子弹的倒道
      for(let i=0;i<twoBulletArr.length;i++){
        twoBulletArr[i].draw(this.ctx);
      }
      //画全屏爆炸的道具
      for(let i=0;i<fullBoomArr.length;i++){
        fullBoomArr[i].draw(this.ctx);
      }
      //绘画游戏得分
      this.ctx.fillStyle = "red";
      this.ctx.font = "20pt 微软雅黑";
      this.ctx.fillText("得分:" + gameConfig.score, 20, 30);
    },
    //随机添加敌人飞机
    randomAddEnemy() {
      var count = 4 - enemyArr.length;
      if (count > 0) {
        for (var i = 0; i < count; i++) {
          enemyArr.push(new Enemy());
        }
      }
    },
    //随机添加双排子弹的道具
    randomAddTwoEnemy() {
      if (
        twoBulletArr.length == 0 &&
        this.hero.isTwo == false &&
        Math.random() * 100 > 90
      ) {
        var twoBullet = new TwoBullet();
        twoBulletArr.push(twoBullet);
      }

      //添加全屏爆炸的道具
      if(fullBoomArr.length==0&&Math.random() * 100 > 90){
        fullBoomArr.push(new FullBoom());
      }
      
    },

    //碰撞检测
    checkCrash() {
      //检测玩家子弹与敌人飞机是否发生碰撞
      heroBullet: for (let i = 0; i < heroBulletArr.length; i++) {
        for (let j = 0; j < enemyArr.length; j++) {
          if (Crash(heroBulletArr[i], enemyArr[j])) {
            //说明发生碰撞
            enemyArr[j].life--;
            enemyArr[j].isDie();
            //移除当前子弹
            heroBulletArr.splice(i, 1);
            break heroBullet;
          }
        }
      }

      //检测玩家飞机与敌人飞机的碰撞行为
      for (let i = 0; i < enemyArr.length; i++) {
        if (Crash(enemyArr[i], this.hero)) {
          //发生碰撞了
          //游戏停止，显示分页
          clearInterval(this.gameId);
          clearInterval(this.fireId);
          this.showResultBox = true;
          insertScore(this.nickName, gameConfig.score);
          //停止背景音乐
          this.$refs.bgm.pause();
          break;
        }
      }

      //检测玩家与道具机的碰撞
      if (twoBulletArr.length > 0) {
        if (Crash(twoBulletArr[0], this.hero)) {
          this.hero.isTwo = true;
          twoBulletArr.splice(0,1);
          setTimeout(() => {
            //15秒以后重新恢复单排子弹
            this.hero.isTwo = false;
          }, 15000);
        }
      }

      //检测玩家飞机与全屏爆炸的道具碰撞
      if(fullBoomArr.length>0){
        if(Crash(fullBoomArr[0],this.hero)){
          for(let i=enemyArr.length-1;i>=0;i--){
            enemyArr[i].life=0;
            enemyArr[i].isDie();
          }
          fullBoomArr.splice(0,1);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/common.scss";
.index {
  .gameBox {
    width: 480px;
    height: 850px;
    margin: auto;
    border: 1px solid black;
    position: relative;
    overflow: hidden;
    .nickBox {
      height: 70px;
      background-color: lightgray;
      border-radius: 10px;
      border: 3px solid gray;
      position: absolute;
      bottom: 100px;
      left: 50%;
      width: 400px;
      margin-left: -200px;
      @include flexbox() {
        align-items: center;
      }
      box-sizing: border-box;
      padding: 0px 20px;
    }
  }
}
</style>
