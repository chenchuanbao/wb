<template>
  <div>
    <div id="Chartday" :style="{width: '1200px', height: '400px'}"></div>
  </div>

</template>



<script>

	export default{
    data(){
      return{
        datat:[],
        datas:[],
        hcount:[]
      }
    },
		components:{

      },
     mounted(){

      this.getcounts();
      //this.hcounts();
     },
     methods:{

      getcounts(){
        var _this= this;
        this.$axios.get('')
          .then(function (response) {
             //console.log(response.data);
           //_this.counts=response.data[0]["count(*)"];
            for(var i=0;i<response.data.length;i++){
              var s = response.data[i].days;
              var d = response.data[i].count;
              _this.datat.push(s);
              _this.datas.push(d);
             _this.drawLine();
              //console.log( _this.datat);
            };

          })
          .catch(function (error) {
            console.log(error);
          });
      },

      hcounts(){
        var _this= this;
        this.$axios.get('')
          .then(function (response) {
             console.log(response.data);
           //_this.counts=response.data[0]["count(*)"];
            for(var i=0;i<response.data.length;i++){
              var hd = response.data[i].count;
              _this.hcount.push(hd);

              //console.log( _this.datat);
            };

          })
          .catch(function (error) {
            console.log(error);
          });
      },


      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let Chartday = this.$echarts.init(document.getElementById('Chartday'))
        // 绘制图表
        Chartday.setOption({
              title: {
        text: '日数据统计'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              //data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.datat
          },
          yAxis: {
              type: 'value'
          },
          // dataZoom: {
          //     show: true,
          //     realtime: true,
          //     x: 36,
          //     height: 20,
          //     start: 80,
          //     end: 20,
          //     type: 'slider',
          // },
          series: [
              {
                  name:'信息总数',
                  type:'line',
                  stack: '总量',
                  data:this.datas
              }


          ]
        });
       }


     }
	}
</script>


<style scoped>
#Chartday{
  z-index: 99999999
}
</style>
