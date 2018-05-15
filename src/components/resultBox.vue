<template>
  <div class="resultBox">
    <div class="header">
      飞机大战
    </div>
    <div class="content">
      最终得分：<span class="scroe">{{score}}</span>
    </div>
    <div class="footer">
      <button type="button" @click="restart">重新开始</button>
      <button type="button" @click="$router.push({name:'rank'})">查看排行榜</button>
    </div>
  </div>
</template>

<script>
import gameConfig from "../utils/gameConfig";
export default {
  name:"resultBox",
  computed:{
    score(){
      return gameConfig.score;   //游戏得分
    }
  },
  methods:{
    restart(){
      window.location.reload();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/common.scss";
.resultBox
{
  position: absolute;
  left: 50%;
  top: 100px;
  width: 400px;
  margin-left: -200px;
  background-color: lightgray;
  border: 3px solid gray;
  border-radius: 10px;
  >.header{
    height:50px;
    @include flexbox(){
      justify-content: center;
      align-items: center;
    }
  }
  >.content{
    border-top: 3px solid gray;
    border-bottom: 3px solid gray;
    height: 150px;
    @include flexbox(){
      justify-content: center;
      align-items: center;
    } 
    font-size: 20px;
    >.scroe{
      font-weight: bold;
      color: red;
      font-size: 24px;
    }
  }
  >.footer{
    height: 50px;
    @include flexbox(){
      justify-content: space-around;
      align-items: center;
    }

    >button{
      padding: 5px;
      cursor:pointer;
      border:2px solid gray;
      border-radius: 5px;
      &:hover{
        background-color: gray;
      }
    }
  }
}
</style>
