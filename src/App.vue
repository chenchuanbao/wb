<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
	}
*{
  margin: 0;
  padding: 0;
  font-family: 'Microsoft Yahei'
}
#myChart,#myChartline>div{
  z-index: 100000!important
}
.el-table th>.cell{
  text-align: center;
}

.tb-edit .el-input {    display: none
}.tb-edit .current-row .el-input {    display: block
}.tb-edit .current-row .el-input+span {    display: none
}   
</style>

