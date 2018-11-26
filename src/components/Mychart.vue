<template> 
  <div>
    <Header></Header>
  <el-container style="height: 700px">
          <Aside></Aside>
          <el-main>
            <el-card class="box-card">
            <Chart1></Chart1>
            <Chartline></Chartline>
            </el-card>

          </el-main>

  </el-container>

  </div>
	
</template>



<script>
	import Aside from './Aside'
  import Header from './Header'
  import Chart1 from './Chart1'
  import Chartline from './Chartline'
	export default{
    data(){
      return{
        counts:''
      
      }
    },
		components:{
        Aside,
        Header,
        Chart1,
        Chartline
      },
     mounted(){
      
     },
     methods:{
     
     
     

     
     } 
	}
</script>


<style scoped>

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