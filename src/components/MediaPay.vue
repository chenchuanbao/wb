<template>

	  <div style="width: 80%;margin:50px auto 0;text-align: left;">
      <el-form :label-position="labelPosition">
          <el-form-item style="display: none" label="姓名：" :label-width="formLabelWidth">
            <el-input v-model="vurl" auto-complete="off" placeholder="没有请不要填写"></el-input>
          </el-form-item>

          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="wbname" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="wbtel" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="微信 / QQ" :label-width="formLabelWidth">
            <el-input v-model="wbqq" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="来源" :label-width="formLabelWidth">
            <el-input v-model="wbclass" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="平台" :label-width="formLabelWidth">
            <el-radio-group  v-model="vurl">
              <el-radio label="广点通"></el-radio>
              <el-radio label="今日头条"></el-radio>
              <el-radio label="朋友圈"></el-radio>
               <el-radio label="B站"></el-radio>
               <el-radio label="快手"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="重要信息备注" :label-width="formLabelWidth">
            <el-input v-model="wbcalls" auto-complete="off"></el-input>
          </el-form-item>

           <el-form-item :label-width="formLabelWidth">
             <el-button style="width: 100%;margin:20px 0"  type="primary" @click="confirmsure">信息补录</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>



<script>

  export default {
    data() {
      return {
        labelPosition: 'top',
          formLabelWidth: '120px',
          wbname: '',
          wbtel: '',
          wbclass: '',
          wbqq:'',
          vurl:'',
          wbcalls:'',
        value: ''
      };
    },
    methods: {
      //信息更改表单----------------------------------------------------------------
    confirmsure(){
      //console.log(this.form.wbid);
      var _this= this;
      this.$axios.get('',{
          params: {
          wbname:this.wbname,
          wbtel:this.wbtel,
          wbqq:this.wbqq,
          wbclass:this.wbclass,
          wbcalls:this.wbcalls,
          vurl:this.vurl
          }
          })
          .then(function (response) {
            //console.log(response.data);
              if(response.data=='0'){
                    _this.$message({
                    message: '姓名不能为空',
                    type: 'err'
                  });
              }else if(response.data=='1'){
                   _this.$message({
                    message: '手机号不能为空',
                    type: 'err'
                  });
              }else if(response.data=='2'){
                   _this.$message({
                    message: '请选择对应平台',
                    type: 'err'
                  });
              }else{
                  _this.$message.success('信息成功补录到后台');
                  _this.wbname='';
                  _this.wbtel='';
                 _this.wbqq=''

                  // _this.$axios.get()
                  // .then(function (response) {

                  // })
                  // .catch(function (error) {
                  //   console.log(error);
                  // });
                  // _this.$router.push({path: '/MediaRouter'});

              }
              // if(response.data=='suc'){
              //     //location.reload();
              //      _this.$message({
              //       message: '恭喜你，成功添加消息',
              //       type: 'success'
              //     });
              // }

          })
          .catch(function (error) {
            console.log(error);
          });
    },

    }
  }
</script>


<style>
  .el-radio-group .el-radio{
    margin: 8px
  }
</style>
