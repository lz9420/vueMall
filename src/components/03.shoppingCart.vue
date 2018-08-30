<template>
 <div>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr>
                                    <!-- 没有商品时显示 -->
                                    <td v-if="message.length==0" colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <router-link to="/index" >马上去购物</router-link>
                                                    吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 商品列表 -->
                                <tr v-for="item in message" :key="item.id">
                                    <td>
                                        <!-- 这里的开关，删除按钮，和计数器在elment组件里找的 -->
                                        <el-switch
                                        v-model="item.selected"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td>
                                        <img style="width:65px" :src="item.img_url" alt="">
                                    </td>
                                    <td>
                                        {{item.title}}
                                    </td>
                                    <td>{{item.sell_price}}</td>
                                                   <!-- min='0' 它解析的是字符串 -->
                                                   <!-- $event 详情去开vue -->
                                              <!-- 如果要保留原始的形参，额外增加一个自定义的实参  $event 保留时间参数，在后面增加自定义参数-->
                                    <td> <el-input-number size="mini" :min="0" v-model="item.buycount" @change="numchange($event,item.id)"></el-input-number></td>
                                    <td>{{item.buycount*item.sell_price}}</td>
                                    <td> <el-button @click="delone(item.id)" type="danger" icon="el-icon-delete" circle></el-button></td>
                                    </tr>
                                    <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalcount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalprice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/index">
                                 <button class="button">继续购物</button>
                            </router-link>
                           
                            <button class="submit" @click="checkAndsubmit">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>


</div>
</template>

<script>
export default {
  // 在开发者工具中看到组件的名字
  name: "shoppingCart",
  data: function() {
    return {
      message: []
    };
  },
  // 声明周期函数（钩子函数）
  created() {
    // console.log(this.$store.state.cartDate);
    // 定义变量暂存一个
    let cartDate = this.$store.state.cartDate;
    // 定义拼接的数据
    let ids = "";
    for (const key in cartDate) {
      ids += key;
      ids += ",";
    }
    // 去掉最后多余的空格 -1就是最后一个不要
    ids = ids.slice(0, -1);
    // console.log(ids);
    // 调用接口获取数据
    this.$axios.get(`/site/comment/getshopcargoods/${ids}`).then(response => {
      // console.log(response);
      // 因为服务器返回的数据 没有购买数量 他们也不知道
      // 我们自行拼接个数
      response.data.message.forEach(v => {
        // 获取 vuex中的 id对应的值
        v.buycount = cartDate[v.id];
        // 设置是否被选中
        v.selected = true;
      });
      // 在赋值给 message即可
      this.message = response.data.message;
    });
  },
  // 计算属性
  computed:{         
      // 总金额       buycout 总个数     sell_proce 总金额
      totalprice(){
          // 被选中
          let totalprice =0;
          // 购买的个数乘以价格
          this.message.forEach(v=> {
              if(v.selected==true){
                  // 累加，返回
                  totalprice+=v.sell_price*v.buycount;  
              }
          })
          return totalprice;
      },
      // 总个数
      totalcount(){
          // 被选中
          let totalcount =0;
          this.message.forEach(v=> {
              if(v.selected==true){   // parseInt 转成整数
              // 变成了字符串拼接 转化为整数
                  totalcount+=parseInt(v.buycount);   
              }
          })
          return totalcount; 
      }
  },
  // 方法
  methods:{
      numchange(num,id){
        // console.log(num,id);
        // 调用仓库的方法 （提交载荷）
        this.$store.commit("updateGoodsNum",{
            goodId:id,
            goodNum:num
        })
      },
      // 删除按钮
      delone(id){
        //   console.log(id);
        // 提交负荷 
        this.$store.commit("deleteGoods", id);
        // 页面中的并没有删除
        this.message.forEach((v,index) => {
              if(v.id ==id){
                  this.message.splice(index,1);
              }
        });
      },

     // 验证登录  跳转登录页面  
      checkAndsubmit() {
          // 判断是否选择商品
          if(this.totalprice==0){
              this.$message.error("不买东西，来这干嘛！！")
              return;
          }
         // 到这里说用选了东西，直接去订单页并且带上 ids 格式
         // 获取选择的id
         let ids = '';
         this.message.forEach(v=>{
             // 选中的才累加
             if(v.selected==true){
                 ids+=v.id;
                 ids+=',';
             }
         })
         // 去掉最后的点 ，
         ids = ids.slice(0,-1);
         this.$router.push(`/order/${ids}`);
         


        //   // 判断是否登录    这部分代码 使用路由守卫替换
        //   this.$axios.get("site/account/islogin")
        //   .then(response=>{
        //     //   console.log(response);
        //       // 没有跳转到登录页面
        //       if(response.data.code=="nologin"){
        //           this.$router.push('/login');  //编程式导航，代码跳转路由
        //       }else {
        //           // 是 。就去结算
        //           this.$router.push('/order')
        //       }
        //   })
      }
  }
};
</script>

<style>
</style>
