<template>
	 
	  <el-aside class="elaside" style="background-color: #fff;overflow: hidden;position: relative;width: 64px;z-index: 999999999999999">

	   		<el-menu router default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
			 
			 <!--  <el-submenu index="1">
			    <template slot="title">
			      <i class="el-icon-menu"></i>
			      <span slot="title">导航一</span>
			    </template>
			    <el-menu-item-group style="background: #fff">
			      <span slot="title">内容管理</span>
			     
			      <el-menu-item index="/csxhmain">系统主页</el-menu-item>
			      <el-menu-item index="/csxhadministator">网报列表</el-menu-item>

			    </el-menu-item-group>
			  </el-submenu> -->

        <el-menu-item  index="/csxhmain">
          <i class="el-icon-menu"></i>
          <span slot="title">主页</span>
        </el-menu-item>

        <el-menu-item  index="/csxhadministator">
          <i class="el-icon-document"></i>
          <span slot="title">列表</span>
        </el-menu-item>
			 
			  <el-menu-item  index="/mychart">
			    <i class="el-icon-circle-plus"></i>
			    <span slot="title">图表</span>
			  </el-menu-item>

			  <el-menu-item index="/csxhadministator" @click='exportExcel'>
			    <i class="el-icon-upload"></i>
			    <span slot="title">导出</span>
			  </el-menu-item>

			  <el-menu-item index="4" @click="closes">
			    <i class="el-icon-setting"></i>
			    <span slot="title">退出</span>
			  </el-menu-item>
			</el-menu>
	  </el-aside>
  	
</template>



<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      closes(){
      	sessionStorage.removeItem("csxhusername");
      	this.$router.push({path: '/'});
      },
      exportExcel () {
         /* generate workbook object from table */
         var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
         /* get binary string as output */
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'wb.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
     }
    }
  }
</script>


<style>
 
</style>