<template>
 <div class="pay-order">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                        <div class="el-col el-col-12">
                                                <dl class="form-group">
                                                    <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                                    <dd>{{orderInfo.message}}</dd>
                                                </dl>
                                            </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <div id="container2">
                                    <!-- <canvas width="300" height="300"></canvas> -->
                                    <!-- 支付接口 后台给你 -->
                                    <qrcode :value="'http://47.106.148.205:8899/site/validate/pay/alipay/'+$route.params.orderid" :options="{ size: 200 }"></qrcode>
                                </div>
                            </div>
                            <input type="button" value="跳转到支付页" @click="goPayOrder">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
                                      
</template>

<script>
// 导入二维码模块
import VueQrcode from '@xkeshi/vue-qrcode';
// 注册二维码组件  全局注册
// Vue.component(VueQrcode.name, VueQrcode);
// 局部注册
    export default {
        name:"payOrder",
        data:function(){
            return{
                orderInfo:{}
            }
        },
       created() {
        this.$axios.get(`site/validate/order/getorder/${this.$route.params.orderid}`)
        .then(response=>{
            // console.log(response);
            this.orderInfo = response.data.message[0];
        });
        // 用定时器的方式 一直查询是否支付订单
       let interId = setInterval(()=>{
             this.$axios.get(`site/validate/order/getorder/${this.$route.params.orderid}`)
        .then(response=>{
            // console.log(response);
            if( response.data.message[0].status==2){
              // 支付成功
              this.$Message.success("支付成功！！！");
              setTimeout(()=>{
               // 提示用户  , 跳转到下一页
               this.$router.push("/paySuccess/"+this.$route.params.orderid);
              },1000)
            clearInterval(interId);
            }else{
                // 没有成功
            }
        });
        },1500)
    },
    components:{
         //   对象的属性名 默认不支持 使用 对象取值的方式来赋值
        // ES6中有这个语法
        [VueQrcode.name]: VueQrcode
   },
   // 方法
   methods: {
       goPayOrder(){
           window.open(
        "http://47.106.148.205:8899/site/validate/pay/alipay/" +
          this.$route.params.orderid
      ); 
       }
   }
 };
</script>
<style>
    /* .pay-order{
        min-height:300px;
    } */
</style>

