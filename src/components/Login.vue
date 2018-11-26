<template>
	<div  id="particles">
		<div class="login">
		<h3 style="color: #666;padding: 15px 0 30px 0;text-align: center;">管理中心</h3>
		<el-form :label-position="labelPosition" :rules=rules  label-width="0px" :model="account"  ref="account" >
		  <el-form-item label=""  prop="username">
		    <el-input v-model="account.username" placeholder="帐号"></el-input>
		  </el-form-item>
		  <el-form-item label=""  prop="password">
		    <el-input v-model="account.password" type="password" placeholder="密码"></el-input>
		</el-form-item>
		<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    	<el-button  @click.native.prevent="handleLogin" type="primary" >登入</el-button>
		  </el-form-item>
			</el-form>
			</div>

		</el-form>
	</div>
</template>


<script>
	import {requestLogin} from '../api/api'
	import particles from 'particles.js'
 	export default {
    data() {
    	var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入正确帐号密码'));
        }
      };

      return {
      	//loading: false,
          labelPosition: 'left',
    	  account: {
          username: 'admin',
          password: '123456'
        },
        rules:{
       username: [
            { required: true, message: '请输入正确帐号用户名', trigger: 'blur' },
            { min: 9, max: 18, message: '长度在 9 到 13 个字符', trigger: 'blur' }
          ],
           password: [
            { validator: validatePass, trigger: 'blur' }
          ]
      },
     	checked: true
    	}
	},
	mounted(){
    particlesJS.load('particles','../../static/particles.json');
	},

    methods:{

    	handleLogin(){

    		var _this= this;
        	this.$axios.get('',
	        		{
				    params: {
				      username: _this.account.username,
				      password: _this.account.password
				    }
				  })
        		.then(function (response) {
	            //if(response.data=="suc"){
	            if(response){
	      		_this.$message({
		          message: '欢迎归来，系统登录成功！',
		          type: 'success'
		        });
	            sessionStorage.setItem("csxhusername",_this.account.username);
	            _this.$router.push({path: '/csxhmain'});
	            }else{
	            	 _this.$message.error('登录失败，出现了未知的错误');
	            	_this.$router.push({path: '/csxhlogin'});
            		_this.account.username='';
            		_this.account.password='';
	            }

	          })
	          .catch(function (error) {
	            console.log(error);
	          });
    	}
      }

  }
</script>

<style scoped="">
	.login{
		width: 350px;
		height: auto;
		margin: 210px auto 0
	}

	button{
		width: 100% !important;
	}
.remember{
	margin-bottom: 15px;
}
#particles{
      position: fixed;
      left: 0;
      top:0;
      right: 0;
      bottom: 0;
      background: #fff
}

canvas{
	position: fixed !important;
	top:0% !important;
}
</style>
