<template>	 
	 <el-header style="background: #333744">
          <el-row :gutter="20">
            <el-col :span="6" style="padding-left: 12px;"><div class="grid-content bg-purple"  style="color: #fff">网报系统</div></el-col>
            <el-col :span="13"><!-- <div class="grid-content bg-purple">&nbsp;</div> -->

            	<!-- <el-date-picker
				      v-model="value7"
				      type="daterange"
				      align="right"
				      unlink-panels
				      range-separator="至"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      format="yyyy 年 MM 月 dd 日"
				      value-format="timestamp">
				      :picker-options="pickerOptions2">
				    </el-date-picker> -->
            </el-col>
             <el-dropdown style="position: absolute;right: 50px">
				  <img src="../../static/p.png" style="width: 40px;height: 40px;border-radius: 50%;position: relative;top: 10px;left: -12px;cursor: pointer;">
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item> <span  @click="closes()">退出</span></el-dropdown-item>
				   <!--  <el-dropdown-item>狮子头</el-dropdown-item> -->	  
				  </el-dropdown-menu>
				</el-dropdown>
          </el-row>
      </el-header>
</template>



<script>
	export default{
		data(){
			return{
				value7: ''
			}
		},
		methods: {
			closes(){
	      	sessionStorage.removeItem("csxhusername");
	      	this.$router.push({path: '/'});
      }
	}
	}
</script>



<style>
	.el-icon-menu{
		position: relative;
		
		font-size: 20px;
		top: 2px;
	}
	.el-header{
		text-align: left !important;
	}
</style>