import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入 App根组件 (最外面的组件)
import App from './App.vue'
// 导入首页的组件
import Index from './components/01.index.vue';
// 导入详情页的组件
import Detail from './components/02.productDetail.vue';
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

Vue.prototype.$axios = axios;
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
]
// 实例化路由对象
let router = new VueRouter({
  routes
})

// 挂载到vue实例上
Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  // 路由对象
  router
}).$mount('#app')
