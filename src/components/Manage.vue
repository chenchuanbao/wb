<template>
  <div>
    <Header></Header>
  <el-container  style="height: 700px">
          <Aside></Aside>
          <el-main>
            <el-card class="box-card">
              <div class="text item" style="margin-bottom: 100px;">
                  <el-form ref="form" :model="form" label-width="80px">

                     <!--  <el-form-item label="活动区域">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item> -->

                      <el-form-item label="帐号">
                        <el-input v-model="form.username"></el-input>
                      </el-form-item>

                       <el-form-item label="密码">
                        <el-input v-model="form.password"></el-input>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" @click="onSubmitUser">添加</el-button>
                      </el-form-item>

                    </el-form>
              </div>



                <el-table @row-click="handleCurrentChanges"
                    :data="userData"
                    style="width: 100%">


                    <el-table-column
                      prop="username"
                      label="工号"
                      width="280">
                    </el-table-column>

                    <el-table-column  width="280"
                      prop="password"
                      label="密码">
                    </el-table-column>


                    <el-table-column label="操作" width="220"  @cell-click="tableVis(row)">
                      <template slot-scope="scope">

                          <el-button size="mini" type="info" icon="el-icon-delete" @click='userdel(scope.$index, scope.row)' v-show="true">删除</el-button>

                      </template>
                    </el-table-column>



                  </el-table>


            </el-card>
            <span style="display: inline-block;padding: 15px 0">长沙新华电脑学院 版权所有</span>
          </el-main>
  </el-container>
  </div>
</template>

<script>
	import Aside from './Aside'
  import Header from './Header'
	export default{
    data(){
      const item = {
         username:'',
          password:'',
          id:''
      };
      return{
          userData:Array(10).fill(item),
           form: {
          username:'',
          password:'',
          id:'',
          delivery: false,
          type: [],
          resource: '',
          desc: ''

        }
      }
    },
		components:{
        Aside,
        Header,

      },
     mounted(){
       this.getWbuser();
     },
     methods:{
         handleCurrentChanges(row, event, column) {
          //console.log(row, event, column, event.currentTarget)
          //console.log(row.wbid);
          this.form.id=row.id;

         // console.log(row.wvdate);
    },


        onSubmitUser(){
           var _this = this;
                this.$axios.get('',{
                params: {
                username: this.form.username,
                password:this.form.password
                }
                })
                .then(function (response) {
                 console.log(response.data);
                    if(response.data=='suc'){
                        _this.$message({
                          message: '添加成功',
                          type: 'success'
                        });
                       _this.wbcallfs==='';
                    }else if(response.data==3){
                         _this.$message({
                          message: '添加失败'+response.data,
                          type: 'danger'
                        });
                    }

                })
                .catch(function (error) {
                  console.log(error);
                });
        },

        getWbuser(){
               var _this = this;
                this.$axios.get('')
                .then(function (response) {
                 console.log(response.data);
                   _this.userData=response.data;

                })
                .catch(function (error) {
                  console.log(error);
                });
        },
        userdel(index,row){
            var _this = this;
                this.$axios.get('',{
                  params: {
                  id: this.form.id
                  }
                  })
                .then(function (response) {
                 console.log(response.data);
                  if(response.data=='suc'){
                       _this.$message({
                          message: '删除成功',
                          type: 'success'
                        });
                       _this.getWbuser();
                  }

                })
                .catch(function (error) {
                  console.log(error);
                });
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
