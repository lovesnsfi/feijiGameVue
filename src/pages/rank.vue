<template>
  <div class=" container">
    !<!--排行榜 -->
    <div class=" page-header">
      <h2 class=" text-center text-primary">排行榜</h2>
    </div>
    <div class=" table-responsive">
      <table class=" table table-hover table-striped">
        <thead>
          <tr>
            <th>排名</th>
            <th>昵称</th>
            <th>得分</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableList " :key="index">
            <td>{{index+1}}</td>
            <td>{{item.nickName}}</td>
            <td>{{item.score}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button type="button" class=" btn btn-primary btn-link" @click="$router.back()">返回</button>
  </div>
</template>

<script>
import {getScoreList} from "../utils/sqlHelper";
export default {
  name:"rank",
  data(){
    return {
      tableList:[]
    }
  },
  created(){
    getScoreList().then(results=>{
      this.tableList=results.rows;
    });
  }
}
</script>

<style>

</style>
