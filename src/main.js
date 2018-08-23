import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
import App from './App.vue'
// 导入首页的组件
import Index from './components/01.index.vue';

Vue.use(VueRouter);

// 定义路由规则
let routes = [
  {
    // 默认进来就是首页
    path:'/',
    component:Index,
  },
  {
    path:'/index',
    component:Index,
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
