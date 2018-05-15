
<template>
  <div class="loginBox" >
    <img src="../../static/res/name.png" alt="">
    <button type="button" class="btnInitGame" @click="$emit('initGame')">开始游戏</button>
  </div>
</template>

<script>
export default {
  name:"loginBox"
}
</script>

<style lang="scss" scoped>
@import "../scss/common.scss";
  .loginBox{
    width:400px;
    height:200px;
    border:3px solid gray;
    position: absolute;
    left: 50%;
    margin-left: -200px;
    top:100px;
    background-color: lightgray;
    border-radius: 10px;
    @include flexbox(column){
      justify-content: space-around;
      align-items: center;
    }
    >img{
      width: 80%;
      height: auto;
      display: block;
    }
    >.btnInitGame{
      width:110px;
      height:45px;
      border-radius:10px;
      outline: none;
      border: 3px solid gray;
      cursor: pointer;
    }
  }
</style>

