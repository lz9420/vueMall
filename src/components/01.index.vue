<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <!-- 导航栏， 轮播图， 热卖爆款 -->
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!-- 左边导航栏 -->
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <!-- 循环生成 -->
                                <li v-for="item in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="itemson in item.subcates" :key="itemson.id">
                                                {{itemson.title}}&nbsp;
                                            </span>
                                           
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="itemson in item.subcates" :key="itemson.id" href="/goods/43.html">{{itemson.title}}</a>
                                                
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                              
                            </ul>
                        </div>
                    </div>
                    <!--轮播图-->
                    <div class="left-705">
                        <div class="banner-img">
                              <el-carousel indicator-position="outside">
                                  <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                      <a href="#">
                                        <img :src="item.img_url" alt="">
                                      </a>    
                             </el-carousel-item>
                             </el-carousel>
                        </div>
                    </div>
                    <!--热卖爆款-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="item in toplist" :key="item.id">
                                <div class="img-box">
                                    <!-- <label>{{index+1}}</label> -->
                                    <a href="#">
                                         <img :src="item.img_url">
                                    </a>
                                   
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                                    <!-- 管道符文 -->
                                    <span>{{item.add_time | filterDate}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 商品 -->
        <div class="section" v-for="item in groupDate" :key="item.catetile">
            <div class="main-tit">
                <!-- 标题 -->
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="itemson in item.level2catelist" :key="itemson.subcateid">{{itemson.subcatetitle}}</a>
                    
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <!-- 商品列表 -->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="itemson in item.datas" :key="itemson.artID">
                            <!-- <a href="#/site/goodsinfo/87" class=""> -->
                            <!-- router-link 会解析成为a标签 -->
                            <router-link :to="'/detail/'+itemson.artID">
                                <div class="img-box">
                                    <!-- <img :src="itemson.img_url"> -->
                                    <img v-lazy="itemson.img_url" >
                                </div>
                                <div class="info">
                                    <h3>{{itemson.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemson.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{itemson.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemson.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            <!-- </a> -->
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
// 导入 axios
//  import axios from "axios";
 // 导入moment时间
 import moment from "moment";

    export default {
        // 设置名字
        name:"index",
        data: function(){
            return {
                catelist:[], // 分类数据
                sliderlist:[], // 轮播图
                toplist:[], // 热卖排行
                groupDate:[] // 底部的分类数据
            };
        },
        // 生命周期函数 
        // 这是创建之前
         beforeCreate() {
            // console.log("beforeCreate");
            // console.log(this.info);
              },
        // 这是创建完毕
        created() {
            // 网络数据获取
            this.$axios
              .get("/site/goods/gettopdata/goods")
              .then((response)=>{
                  // 把获取的数据 设置给当前这个组件的 data属性
                  this.catelist = response.data.message.catelist;
                  this.sliderlist = response.data.message.sliderlist;
                  this.toplist = response.data.message.toplist;
                  // 打印
                 // console.log(this.toplist);
              });
              // 网络数据获取 底部的分类数据
              this.$axios
                .get("/site/goods/getgoodsgroup")
                .then((response)=>{
                   // console.log(response);
                    this.groupDate = response.data.message;
                    
                   
                })
        },
        // 局部过滤器
        // filters: {
        //     // 在vue找到过滤器来过滤日期
        //     filterDate(value){
        //         return moment(value).format("YYYY年MM月DD日")   // 这里是moment里的
        //     }
        // }  
    };
</script>
<style> 
     body{
       background-color: transparent;
   }
     .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel__item img {
      width: 100%;
      height: 100%;
  }
  .img-list li:hover {
      padding: 1px;
  }
  
   .el-carousel__container {
       height: 341px !important;
   }

</style>

