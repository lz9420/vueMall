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
                                <li class="active">
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
                    <div class="cart-box">
                      <el-form :model="orderForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">  
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <!-- 上面都是 个人信息 -->
                            <div class="form-box address-info">
                              <el-form-item label="收货人姓名" prop="accept_name">
                                 <el-input v-model="orderForm.accept_name" style="width:500px"></el-input>
                              </el-form-item>
                              <el-form-item label="所属地区" prop="">
                                  <v-distpicker @selected="selected" :province="orderForm.area.province.value" :city="orderForm.area.city.value" :area="orderForm.area.area.value"></v-distpicker>
                                 </el-form-item>
                              <el-form-item label="详细地址" prop="address">
                                 <el-input v-model="orderForm.address" style="width:500px"></el-input>
                              </el-form-item>  
                              <el-form-item label="手机号码" prop="mobile">
                                <el-input v-model="orderForm.mobile" style="width:500px"></el-input>
                              </el-form-item>
                             <el-form-item label="联系电话">
                                <el-input v-model="orderForm.phone" style="width:500px"></el-input>
                             </el-form-item>
                             <el-form-item label="电子邮箱" prop="email">
                               <el-input v-model="orderForm.email" style="width:500px"></el-input>
                             </el-form-item> 
                             <el-form-item label="邮政编码" prop="post_code">
                               <el-input v-model="orderForm.post_code" style="width:500px"></el-input>
                             </el-form-item>        
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <!--elment单选框  -->
                                    <el-radio v-model="orderForm.payment_id" label="6">在线支付</el-radio>
                                    <span style="color:red">手续费：0.00元</span>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                  <!-- 单选框 -->
                                   <el-radio @change="expressChange(20)" v-model="orderForm.express_id" label="1">顺丰快递(20元)</el-radio>
                                   <el-radio @change="expressChange(10)" v-model="orderForm.express_id" label="2">圆通快递(10元)</el-radio>
                                   <el-radio @change="expressChange(8)" v-model="orderForm.express_id" label="3">韵达快递(8元)</el-radio>
                               </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in message" :key="item.id">
                                        <td width="68">
                                            <!-- <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a> -->
                                         <router-link :to="'/detail/'+item.id">
                                             <img :src="item.img_url" class="img">
                                         </router-link>
                                        </td>
                                        <td>
                                            <router-link :to="'/detail/'+item.id">{{item.title}} </router-link>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.totalamount}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl> 
                                        <!-- resize="none" 把文本域设置不能拉伸 -->
                                        <el-form-item label="订单备注(100字符以内)" prop="message">
                                                <el-input type="textarea" resize="none" :row="2" v-model="orderForm.message" style="width:500px"></el-input>
                                            </el-form-item>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{orderForm.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{orderForm.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{orderForm.goodsAmount+orderForm.expressMoment}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <router-link to="/cart">返回购物车</router-link>
                                        <!-- <a class="btn button" href="/cart.html">返回购物车</a> -->
                                        <a id="btnSubmit" class="btn submit" @click="sureOrder">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>

<script>
// 导入省市联动
import VDistpicker from "v-distpicker";

export default {
  name: "order",
  // 注册组件
  components: {VDistpicker},
  // 方法
  methods:{
      selected(value){
        //   console.log(value);
          this.orderForm.area = value;
      },
      // 价格改变
  expressChange(price){
    //   console.log(price);
     this.orderForm.expressMoment=price;
  },

  // 提交订单
  sureOrder(){
         // 调用接口
        this.$axios.post("site/validate/order/setorder",this.orderForm)
        .then(response=>{
            // console.log(response);
            // 获取订单id
            let orderid = response.data.message.orderid;
            // 带着订单id去支付页
            this.$router.push('/payOrder/'+orderid);

            // 删除购物车数据 删除购物车中 提交订单的数据
            this.message.forEach(v=>{
                // 删除vuex中的数据
                this.$store.commit('deleteGoods',v.id);
            })
        })
        // console.log(this.orderForm)
  }
  },
  // 一创建就去获取
  created() {
    // 保存goodsids
    this.orderForm.goodsids = this.$route.params.ids;
    // 通过接口获取 商品数据
    this.$axios
      .get(`site/validate/order/getgoodslist/${this.$route.params.ids}`)
      .then(response => {
        //   console.log(response);

        // 计算总金额
        let total = 0;
        // 准备 商品id对象
        let cargoodsobj = {};
        // 拼接数据
        response.data.message.forEach(v => {
          // 修改数量
          v.buycount = this.$store.state.cartDate[v.id];
          // 修改总金额
          v.totalamount = v.buycount * v.sell_price;
          // 累加总金额
          total += v.totalamount;
          // 增加键值对
          cargoodsobj[v.id] = v.buycount;
        });
        // 赋值数据
        this.message = response.data.message;
        // 赋值到数据中
        this.orderForm.goodsAmount = total;
        // 添加到 orderForm中即可
        this.orderForm.cargoodsobj = cargoodsobj;
      });
  },
  // 计算属性
  computed: {
    //   总数量
    totalCount() {
      let totalCount = 0;
      this.message.forEach(v => {
        totalCount += v.buycount;
      });
      return totalCount;
    }
  },
  data: function() {
    // 自定义验证的规则 触发验证时 会执行这个函数 手机号验证
    var checkMobile = (rule, value, callback) => {
      //   if (!value) {
      //     return callback(new Error("年龄不能为空"));
      //   }
      setTimeout(() => {
        // if (!Number.isInteger(value)) {
        //   callback(new Error("请输入数字值"));
        // } else {
        //   if (value < 18) {
        //     callback(new Error("必须年满18岁"));
        //   } else {
        //     callback();
        //   }
        // }
        // 定义正则规则
        let exec = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (exec.test(value) == true) {
          // 正确的时候干的事情
          callback();
        } else {
          callback(new Error("你输入的手机号码不正确"));
        }
      }, 500);
    };
    // 邮箱的验证
    var checkEmail=(rule, value, callback) =>{
        // 如果 value 不为空 格式验证
        if(value.trim().length !=0){
            // 验证邮箱的正则
        let exec = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (exec.test(value.trim()) == true){
            callback();
          }else{
              callback(new Error("请输入正确邮箱"));
          }    
      }else{
          callback();
      }
    };
    // 邮编码验证
    var checkPostCode=(rule, value, callback) =>{
        if(value.trim().length !=0){
            // 验证邮箱的正则
            let exec = /^[1-9]\d{5}(?!\d)$/; 
             if (exec.test(value.trim()) == true) {
          callback();
        } else {
          callback(new Error("请输入正确邮编"));
        }
      }else{
          claaback();
      }
    };
    return {
      orderForm: {
        goodsAmount: 0, // 总金额
        expressMoment: 20, // 快递费
        accept_name: "刘先生", // 收货人姓名,  
        address: "深圳", // 详细地址
        mobile: "88888888", // 手机号
        phone: "", // 联系电话
        email: "", // 邮箱
        post_code:"", // 邮箱编码
        area:{
            "province":{code:'430000',value:'湖南省'},
            "city":{code:'430200',value:'株洲市'},
            "area":{code:'430223',value:'攸县'}
        }, // 省市区
        
        payment_id:'6', // 支付方式
        express_id:'1', // 快递
        message:"亲，请速度发货",
        goodsids:"", // 购买商品的Id
        cargoodsobj:{}, // 购买的商品 id 跟件数有关
        phone:"666666" // 练习电话
      },
      // 服务器返回的商品数据
      message:[],
      rules: {
        // 需要跟字段相对应
        accept_name: [
          // required 是否必须  message 提示消息 trigger 触发的方式
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
          // min 最短 max 最长 少数民族
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ],
        // 地址的验证规则
        address: [
          {
            required: true,
            message: "请输入详细的地址,",
            trigger: "blur"
          }
        ],
        // 手机验证    change是边打字变验证  blur是失去焦点
        mobile: [{ validator: checkMobile, trigger: "change" }],
         // 邮箱验证
        email: [{ validator: checkEmail, trigger: "change" }],
        // 邮编验证
        post_code: [{ validator: checkPostCode, trigger: "blur" }]
      }
    };
  }
  // 生命周期函数中判断是否登陆
  // 因为只是登陆判断 不需要让用户看到页面 直接在beforeCreate中即可
  //  beforeCreate() {
  //      this.axios.get('/site/account/islogin')
  //      .then(response=>{
  //          console.log(response);
  //          // 如果没有登录 打回 登录页面
  //          if(response.data.code=="nologin"){
  //              // 编程式导航
  //              this.$router.push('./login');
  //          }
  //      })
  //  },
};
</script>
<style>
</style>

