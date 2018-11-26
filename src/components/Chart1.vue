<template>
  <div style="">
  <div id="myChart" :style="{width: '1200px', height: '400px'}"></div>
  </div>

</template>



<script>

	export default{
    data(){
      return{
        counts:'',
        datas:[
          {value:'', name:'有效信息'},
          {value:'', name:'无效信息'},
          {value:'', name:'继续跟进'},
          {value:'', name:'重复信息'},
          {value:'', name:'无备注'},
          {value:'', name:'其他'},
        ]
      }
    },
		components:{

      },

     mounted(){
     this.getcount1();
     this.getcount2();
     this.getcount3();
     this.getcount4();
     this.getcount5();
     this.getcount6();
     //this.getcount7();
     },
     methods:{

        getcount1(){
          var _this= this;
          this.$axios.get('')
          .then(function (response) {
            //console.log(response.data[0]["count(*)"]);
            //console.log(_this.tableData.length);
            _this.datas[0].value=response.data[0]["count(*)"];

          })
          .catch(function (error) {
            console.log(error);
          });
      },

      getcount2(){
          var _this= this;
          this.$axios.get('')
          .then(function (response) {
            //console.log(response.data[0]["count(*)"]);
            //console.log(_this.tableData.length);
            _this.datas[1].value=response.data[0]["count(*)"];

          })
          .catch(function (error) {
            console.log(error);
          });
      },

      getcount3(){
          var _this= this;
          this.$axios.get('')
          .then(function (response) {
            //console.log(response.data[0]["count(*)"]);
            //console.log(_this.tableData.length);
            _this.datas[2].value=response.data[0]["count(*)"];

          })
          .catch(function (error) {
            console.log(error);
          });
      },

      getcount4(){
          var _this= this;
          this.$axios.get('')
          .then(function (response) {
            //console.log(response.data[0]["count(*)"]);
            //console.log(_this.tableData.length);
            _this.datas[3].value=response.data[0]["count(*)"];

          })
          .catch(function (error) {
            console.log(error);
          });
      },

      getcount5(){
          var _this= this;
          this.$axios.get('')
          .then(function (response) {
            //console.log(response.data[0]["count(*)"]);
            //console.log(_this.tableData.length);
            _this.datas[4].value=response.data[0]["count(*)"];

          })
          .catch(function (error) {
            console.log(error);
          });
      },

      getcount6(){
          var _this= this;
          this.$axios.get('')
          .then(function (response) {
            //console.log(response.data[0]["count(*)"]);
            //console.log(_this.tableData.length);
             _this.counts=response.data[0]["count(*)"];
             _this.datas[5].value=_this.counts-_this.datas[0].value-_this.datas[1].value-_this.datas[2].value-_this.datas[3].value-_this.datas[4].value;
            _this.drawLine();
          })
          .catch(function (error) {
            console.log(error);
          });
      },


      getcount7(){
        var _this= this;
          this.$axios.get('')
          .then(function (response) {
            console.log(response.data);
            //console.log(_this.tableData.length);
            //response.data[0]["count(*)"];

          })
          .catch(function (error) {
            console.log(error);
          });

      },




         drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title : {
            text: '网报信息统计表',
            subtext: '重要信息',
            x:'center'
            },
            tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
            orient: 'vertical',
            left: 'left',

           },
            series: [{
                name: '数据统计',
                type: 'pie',
                radius : '55%',
                data: this.datas
            }]
        });
       }
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
    width: 480px;
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
