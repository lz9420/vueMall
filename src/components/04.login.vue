<template>
<div>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <el-input v-model.trim="name" placeholder="请输入账号"></el-input>
                         <br><br>
                        <el-input v-model.trim="password" type="password" placeholder="请输入密码"></el-input>
                         <br><br>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" type="submit" @click="login" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>

</div>
</template>

<script>
    export default {
      name: "login",
      data:function(){
          return{
             name:"admin",
             password:"123"
          };
      },
      methods:{
          // 登录
          login(){
               // iview组件里，进度条
              // 设置进度条的颜色，尺寸
              this.$Loading.config({
                  color:"skyblue",
                  failedColor: "blue",
                  height:10
              });
              // 显示进度条
              this.$Loading.start();
              // 获取用户名，密码，提交用户名密码，获取登录结果
              this.$axios.post("/site/account/login",{
                  user_name: this.name,
                  password: this.password
              })
              .then(response=>{
                  console.log(response);
                if(response.data.status==0){  // 这里等于0 说明登录成功了
                  // 修改vuex中的数据 ， 提交载荷
                  this.$store.commit('changeLoginStatus',true);
                  // 跳回你来时的页面
                  this.$router.push(this.$store.state.fromPath);
                }
                // 关闭进度条 ，finish选择的进度条速度
                this.$Loading.finish();
              })
              .catch(response=>{
                  this.$Loading.error();
              })
          }
      }
    }
</script>

<style>

</style>

