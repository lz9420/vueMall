<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <!-- 放大镜 -->
                               <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images" :base-zoomer-options="zoomerOptions" ></ProductZoomer>
                             </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                               <!-- 使用element ui的 计数器替换 -->
                                               <el-input-number v-model="num" @change="handleChange" :min="1" :max="goodsinfo.stock_quantity" size="mini" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!-- tab 区域 -->
                            <!-- iviewde 图钉组件  俗称吸顶 -->
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>                         
                                                               <!-- 修改标示变量 -->
                                        <!-- <a href="javascript:;" @click="showDiscuss=false" :class="{selected:showDiscuss==false}">商品介绍</a> -->
                                        <a href="javascript:;" @click="showDiscuss=false" :class="{selected:!showDiscuss}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="showDiscuss=true" :class="{selected:showDiscuss==true}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            <!-- 内容区域                           显示隐藏切换  -->
                            <div class="tab-content entry" v-show="showDiscuss==false" v-html="goodsinfo.content">
                                                                                        <!-- 数据是html结构用v-html好些                                 -->
                            </div>
                            <div class="tab-content" v-show="showDiscuss==true">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model.trim="commentInfo" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">                                                        
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" @click="submitCommit" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <!-- 要是没有评论，就显示出来 -->
                                        <p v-show="comments.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <!-- <Rate v-model="value" /> 这个是vivewRate5星评分的小插件 -->
                                                    <Rate v-model="value" />
                                                    <span>{{item.reply_tima | filterDate}}</span>
                                                </div> 
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                       
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- 分页这是在iview 的组件里 -->
                                          <Page :total="totalCount" show-sizer show-elevator :page-size-opts="[6, 10, 13, 15]"
                                           placement="top" @on-change="pageChange" @on-page-size-change="pageSizechange"
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class="">{{item.title}}</a> -->
                                            <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | filterDate}}</span>
                                        </div>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 回到顶部 iview的自定义组件 -->
        <BackTop :height="100" :bottom="100">
        <div class="top">点我上天</div>
        </BackTop>
        <!-- 移动的小图片 -->
        <!-- <img v-if="imglist.length!=0" class="moveImg" :src="imglist[0].original_path" alt=""> -->
    </div>
</template>

<script>
// 已经抽取出来了，直接this.$axios 就可以了
// import axios from "axios";

// 导入jQuery
import $ from "jquery";

export default {
  // 姓名
  name: "detail",
  data: function() {
    return {
      productId: undefined, // id
      goodsinfo: {}, // 商品信息
      hotgoodslist: [], // 热卖列表
      inglist: [], // 图片列表
      num: 0, // 购买数量
      showDiscuss: false, // 是否显示评论 默认是false 默认显示评论，商品内容
      // 放大镜设置
      zoomerOptions: {
        zoomFactor: 4, // 放大倍数
        pane: "container-round", // container
        hoverDelay: 300,
        namespace: "container-zoomer",
        move_by_click: true,
        scroll_items: 4,
        choosed_thumb_border_color: "#ff3d00"
      },
      // 轮播图用的图片 默认的数据格式 不支持
      // 这里的数据 需要在接口调用完毕之后 才能够获取
      images: {
        normal_size: []
      },
      // 页码
      pageNum:1,
      // 页容量
      pageSize:10,
      // 品论数据
      comments:[],
      // 总条数
      totalCount:0,
      // 评论商品内容，双向数据绑定
      commentInfo:'',
      //初始化星星等级
      value: 3
    };
  },
  // 事件
  methods: {
    handleChange(value) {
        console.log(111);
    },
    //  这里是封装，  抽取的方法
    getProductDetail() {
      // 保存id
      this.productId = this.$route.params.id;
      // ajax 渲染
      this.$axios
        .get(
          `/site/goods/getgoodsinfo/${this.productId}`
        )
        .then(response => {
          console.log(response);
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;

          // 处理 放大镜数据
          let temArr = [];
          // 循环处理数据
          this.imglist.forEach((v, i) => {
            temArr.push({
              id: v.id,
              url: v.original_path
            });
          });
          // 临时数组
          this.images.normal_size = temArr;
        });
    },
    // 获取评论的方法，axios---------------------------------
    getComments(){
        this.$axios.get(`/site/comment/getbypage/goods/${this.productId}?pageIndex=${this.pageNum}&pageSize=${this.pageSize}`)
        .then(response=> {
            console.log(response);
            this.comments = response.data.message;
            this.totalCount = response.data.totalcount;
            // console.log("totalcount:  " + this.totalCount)
        })
    },
    // 页码改变
    pageChange(page){
        // console.log(page);
        this.pageNum = page;
        // 页码改变时，重新获取数据即可
        this.getComments()
    },
    // 页容量改变 自动触发 页码改变 把页码改为1,就不会触发 pageChange
    pageSizechange(size){
        this.pageSize = size;
        //  console.log(this.pageSize);
         // 如果就是第一页，就重新获取数据
         if(this.pageNum==1){
             this.getComments();
         }
    }, 
    // 发表商品评论如果为空的话--------------------
    submitCommit(){
        // 非空判断弹窗 ， 在iview组件中
       if(this.commentInfo==''){
            this.$Message.error('对方不想说话,并向你抛出了一个异常');
            return;
       }
       // 发表评论
       // 调用接口
       this.$axios
       .post(`/site/validate/comment/post/goods/${this.productId}`,
       {
          commenttxt: this.commentInfo
       }
       )
        .then(response => {
            // 提示成功
            this.$Message.success(response.data.message);
            // 发表成功局部刷新，调用函数
            this.getComments();
            this.commentInfo='';
        });
    },
    // 加入购物车的逻辑，用jQuery来实现
    cartAdd() {
        // 获取加入购物车的位置
        let cartOffset = $('.add').offset();
        console.log(cartOffset);
    }
  },
  // 生命周期函数
  // 当前这个Vue组件还没有实例化出来 那些data methods 都是没有的
  created() {
      // 调用获取数据的函数
      this.getProductDetail();
      // 这个是获取评论
      this.getComments();
  }, 
  // 观察数据改变
  watch: {
    $route(val, ildVal) {
        // 给它为空
      this.images.normal_size = [];
      // 再重新调用接口 获取数据 渲染页面
      this.getProductDetail();
    }
  }
};
</script>

<style lang="less">
/* 这里是 内容区的 图片样式 */
.tab-content img {
  width: 100%;
  /* 去除图片底部的 间隙 */
  display: block;
}
.top {
  padding: 10px;
  background: red;
  color: #fff;
  text-align: center;
  border-radius: 2px;
}

/* 放大镜相关样式 */
.pic-box {
  width: 395px;
  .control-box .thumb-list {
    display: flex;
    justify-content: center;
    img {
      width: 80px;
      height: 80px;
      margin: 2px;
    }
  }
  .control {
    //   text-align:center;
    display: flex;
    // 主轴
    justify-content: center;
    // 纵轴 副轴 侧轴
    align-items: center;
  }
}
</style>
