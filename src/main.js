import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入 App根组件 (最外面的组件)
import App from './App.vue'
//1 导入首页的组件
import Index from './components/01.index.vue';
//2 导入详情页的组件
import Detail from './components/02.productDetail.vue';
//3 导入购物车的组件
import shoppingCart from './components/03.shoppingCart.vue';
//4 导入登录页面
import Login from './components/04.login.vue';
//5 导入订单的组件
import Fillorder from './components/05.fillorder.vue';
//6 导入支付订单组件
import PayOrder from './components/06.payOrder.vue';
//7 导入支付成功组件
import paySuccess from './components/07.paySuccess.vue';
//8 导入会员中心组件
import VipCenter from './components/08.vipCenter.vue';
//9 导入订单列表
import orderList from './components/09.orderList.vue';
//10 导入订单详情
import orderDetail from './components/10.orderDetail.vue';

// 引入element 轮播图
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
// 要use一下 才会把Elementui中的内容注册到Vue上面
Vue.use(ElementUI);
// 导入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
//导入axios
import axios from "axios";
// 增加到vue的原型中
Vue.prototype.$axios = axios;
// 配置全局基地址，抽取出来也有好处 如果服务器更好地址，只需要调整一个位置
axios.defaults.baseURL = 'http://47.106.148.205:8899';
//让ajax携带cookie
// 让ajax 跨域请求时 是否会携带 凭证(cookie)
axios.defaults.withCredentials=true;
Vue.use(iView);

// 导入放大镜
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

Vue.use(VueRouter);

// 懒加载 vue插件
import VueLazyload from 'vue-lazyload'
// 注册到vue上
 Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  // 懒加载的图片
  loading: require('./assets/img/mi.jpg'),
  attempt: 1
})
 
// 注册全局过滤器   依赖于 moment.js..............................
import moment from 'moment';
// 注册    ，这个过滤器 只能格式化固定的内容
// 可以接收参数formatStr
Vue.filter('filterDate', function(val,formatStr){
  console.log(formatStr);
  // 如果你传入了格式化字符串，就用传入的
  if(formatStr!=undefined){
    return moment(val).format(formatStr);
  }else{
    // 没有传入格式化字符串，就用默认的
    return moment(val).format("YYYY年MM月DD日");
  }
 
})

//  整合 Vuex 统一进行数据管理
import Vuex from 'vuex'
Vue.use(Vuex)
// 实例化Vue的时候 也需要传入 仓库对象
const store = new Vuex.Store({
  // 这里就是我们的数据
  state: {
    // count: 666
    // 尝试读取数据 有使用读取的数据 没有使用 空数组
    cartDate: JSON.parse(window.localStorage.getItem('goodkey')) || {},
    // 是否登录
    islogin:false,
    // 点进来时候的地址

  },
  // 这格式暴露的修改方法
  mutations: {
    // 每次触发 数字+1
    // increment (state,n) {
    //   // 变更状态
    //   state.count+=n
    // }
    // 增加购物车数据获取到id 和数量
    // 传入的数据是一个对象 格式{goodId：商品id，goodnum:数量}
    addGoods(state, goodInfo) {
      // 保存数据[]只有用中括号对象取值，才可以传入变量，语法是固定的属性名
      if(state.cartDate[goodInfo.goodId] == undefined) {
        // 传过来的id，不存在，就新增这个id作为属性
        // state.cartDate[goodInfo.goodId] =goodInfo.goodNum;
  // 重点！！为了要让vue检测到数据的改变同步修改页面显示，需要调用vue.set
       Vue.set(state.cartDate, goodInfo.goodId, goodInfo.goodNum); 
      } else {
        // 传过来的id 已经存在 累加
        state.cartDate[goodInfo.goodId] +=goodInfo.goodNum;
      }
    },
    // 额外的增加一个修改的方法
    // 逻辑是，直接把传入的数量 替换掉 默认的数量
    updateGoodsNum(state,goodInfo){
      // 直接替换
      state.cartDate[goodInfo.goodId] = goodInfo.goodNum;
    },
    // 额为增加一个删除的方法   deleteGoods就是商品的id
    deleteGoods(state,goodId){
      // delete 删除的属性不会触发视图更新
      // delete state.cartDate[goodId];
      // 需要调用Vue.delete方法才可以
      Vue.delete(state.cartDate,goodId);
    },
    // 切换登录状态
    changeLoginStatus(state,islogin){
      state.islogin = islogin;
    },
    // 增加一个保存来时的地址的方法
    saveFromPath(state,fromPath){
      state.fromPath = fromPath;
    }
  },
  // gertters vuex的计算属性
  getters: {
    goodsCount: state=> {
      // 临时 num
      let num = 0;
      // 循环数据对象
      for (const key in state.cartDate) {
            num +=state.cartDate[key]   
        }
        // 返回总数
        return num;
      }
    }
})

// 浏览器页面关闭（刷新时）保存到localStorage中-----------------------
window.onbeforeunload = function() {
  window.localStorage.setItem('goodkey',JSON.stringify(store.state.cartDate))
}
// 定义路由规则
let routes = [
  {
    // 默认进来就是首页
    path:'/',
    redirect:'/index',
  },
  {
    path:'/index',
    component:Index,
  },
   // 详情页面
   {
     path:'/detail/:id',
     component:Detail,
   },
   // 购物车路由
   {
    path:'/cart',
    component:shoppingCart,
  },
  {
    // 登录页面路由
    path:'/login',
    component: Login,
  },
  {
    // 订单的路由
    path: '/order/:ids',
    component: Fillorder,
    // 路由信息  可随意加
    meta: {
      checkLogin: true
    }
  },
  {
    // 订单支付的路由
    path: '/payOrder/:orderid',
    component: PayOrder,
     // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
     meta: {
      checkLogin: true
    }
  },
  // 支付成功的路由
  {
    path:'/paySuccess/:id',
    component: paySuccess,
     // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
     meta: {
      checkLogin: true
    }
  },
  // 会员中心
  {
    path: '/vipCenter',
    component: VipCenter,
    // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
    meta: {
      checkLogin: true
    }
  },
  // 订单列表
  {
    path: '/orderList/:id',
    component: orderList,
    // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
    meta: {
      checkLogin: true
    }
  },
  // 支付的订单详情
  {
    path:'/orderDetail/:id',
    component:orderDetail,
    // 路由元信息 可以随意加  订单支付页 也必须登陆才可以访问
    meta: {
      checkLogin: true
    }
  }
]
// 实例化路由对象
// routes key 是固定的 
// 所以我们才可以用这种快速赋值
let router = new VueRouter({
  routes:routes
})

// 增加 导航守卫 （路由守卫）  
router.beforeEach((to, from, next) => {
  // console.log('to',to);
  // 每次过来都保存一下来时的地址
  // 提交载荷 保存数据
  store.commit('saveFromPath',from.path);

  // 如果访问的是 order页面 判断登录
  if(to.path.indexOf('/order/')!=-1){
    // 调用接口
    axios.get("/site/account/islogin")
    .then(response=>{
      console.log(response);
      // 登录了 才继续访问
      if(response.data.code!='nologin'){
        // 直接放走
        next();
      }else{
        // 没有登录打到登录页
        next('/login')
      }
    })
  }else{
       // 必须添加这个，否则不会跳转
  next()
  }
})

// 挂载到vue实例上
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  // 路由对象
  router,
  // 仓库对象 属性的名字 叫做store
  store,
  // 最高级别的vue组件（最外层的盒子）
  beforeCreate(){
    // console.log(111);
    axios.get("/site/account/islogin").then(response=>{
      if(response.data.code=='logined'){ // logined代表已经登录了
        // 登录成功了
        store.state.islogin = true;
      }else{
        // 没有登录，
        // 这里就不用写了，上面已经做了判断shi false
      }
    })
  }
}).$mount('#app')
