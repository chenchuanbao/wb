<template>
  <div>
    <Header></Header>
  <el-container v-loading="loading" style="height: 700px">
          <Aside></Aside>
          <el-main>
            <el-card class="box-card">
              <div class="text item" style="margin-bottom: 100px;">
                当前共有网报信息 <span class="counts">{{counts}}</span> 条
                <!-- <el-button type="danger" @click='tolist' icon="el-icon-view" style="margin-left: 50px;">查看列表</el-button> -->
              </div>

            <Chartday></Chartday>
            </el-card>
            <span style="display: inline-block;padding: 15px 0">陈传宝 版权所有</span>
          </el-main>
  </el-container>
  </div>
</template>

<script>
	import Aside from './Aside'
  import Header from './Header'
  import Chartday from './Chartday'
	export default{
    data(){
      return{
        counts:'',
        loading: true,
      }
    },
		components:{
        Aside,
        Header,
       Chartday
      },
     mounted(){
      this.vid(),
      this.getcounts();
      //this.test();
     },
     methods:{
        //验证登录信息-----------------------------------------------
      vid(){
         var value = sessionStorage.getItem("csxhusername");
          if(!value){
              this.$router.push({path: '/csxhlogin'});
          }
      },
      getcounts(){
        var _this= this;
        _this.loading=true;
        this.$axios.get('')
          .then(function (response) {
            //console.log(response.data);
            //console.log(_this.tableData.length);
           _this.counts=response.data[0]["count(*)"];
           _this.loading=false
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      // test(){
      //   var _this= this;
      //   this.$axios.get('')
      //     .then(function(response){
      //         console.log(response)
      //     })
      //     .catch(function(error){

      //     })
      // },


      tolist(){
        this.$router.push({path: '/csxhadministator'});
      }
     }
	}
</script>


<style scoped>
#Chartday{
  z-index: 99999999
}
.counts{
  font-size: 22px;
  font-weight: bold;
  color: #333744
}
  .text {
    font-size: 14px;
    text-align: left;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width:100%;
    min-height: 600px;
  }

.el-form-item{
  text-align: left;
}
h1, h2 {
  font-weight: normal;
}
.el-table th>.cell{
  text-align: center !important;
}
.el-table th>.cell{
  text-align: center;
}
.el-pagination{
  padding: 15px 0;
  text-align: left;
}
a {
  color: #42b983;
}
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
   .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;

  }

  body > .el-container {
    margin-bottom: 40px;
  }
    .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-menu{
    height: 100%;
    position: fixed;
    bottom: 0;
    top: 60px;
    left: 0;
    width: 200px;
  }
  .el-header{
        background-color: rgb(84, 92, 100);
  }

 .source>i {
    color: #fff;
    margin: 0 20px;
    font-size: 1.5em !important;
    vertical-align: middle;
}
</style>
