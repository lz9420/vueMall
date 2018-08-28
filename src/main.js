import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入 App根组件 (最外面的组件)
import App from './App.vue'
// 导入首页的组件
import Index from './components/01.index.vue';
// 导入详情页的组件
import Detail from './components/02.productDetail.vue';
// 导入购物车的组件
import shoppingCart from './components/03.shoppingCart.vue';
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
// 注册
Vue.filter('filterDate', function(val){
  return moment(val).format("YYYY年MM月DD日");
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
    cartDate: JSON.parse(window.localStorage.getItem('goodkey')) || {}
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
]
// 实例化路由对象
// routes key 是固定的 
// 所以我们才可以用这种快速赋值
let router = new VueRouter({
  routes:routes
})

// 挂载到vue实例上
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  // 路由对象
  router,
  // 仓库对象 属性的名字 叫做store
  store
}).$mount('#app')
