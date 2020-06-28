<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar" @titleClick="titleClick" ref="detailNav"></detail-nav-bar>

    <scroll class="detail-Scroll" ref="Scroll"
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swipper :top-images="topImages"></detail-swipper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-item-params :item-params="paramInfo" ref="paramsY"></detail-item-params>
      <detail-comment-info :comment-info="commentInfo" ref="commentY"></detail-comment-info>
      <goods-list :goods="recommmend" ref="recommendY"></goods-list>
    </scroll>

<!--    <toast :message="isMessage" :show="isShow"></toast>-->

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>


    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>



  </div>
</template>

<script>

  import DetailNavBar from "./chilCompon/DetailNavBar";
  import {getDetail, Goods, Shop, Params, getRecommend} from '../../network/detail';
  import DetailSwipper from "./chilCompon/DetailSwipper";
  import DetailBaseInfo from "./chilCompon/DetailBaseInfo";
  import DetailShopInfo from "./chilCompon/DetailShopInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailGoodsInfo from './chilCompon/DetailGoodsInfo';
  import DetailBottomBar from "./chilCompon/DetailBottomBar";
  import DetailItemParams from "./chilCompon/DetailItemParams";
  import DetailCommentInfo from "./chilCompon/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";
  import debounce from "../../common/utils";
  import {backTopMaxin} from "../../common/maxin";
  import {mapActions} from 'vuex'


  // import Toast from "../../components/common/toast/Toast";

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommmend: [],
        detailNavBarY: [],
        getDetailNavBarY:null,
        currentIndex: 0,
        // isMessage: '',
        // isShow: false
      }
    },
    mixins: [backTopMaxin],
    components: {
      DetailNavBar,
      DetailSwipper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailItemParams,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,

      // Toast
    },

    created() {
      this.iid = this.$route.params.id;
    //  获取详情数据
      getDetail(this.iid).then(res => {
        const data = res.result;
        console.log(res);
      //  获取顶部轮播图
        this.topImages = data.itemInfo.topImages;
        //  获取商品数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        // console.log(this.goods);
        this.shop = new Shop(data.shopInfo);
        // console.log(this.shop);
        this.detailInfo = data.detailInfo;
        // console.log(this.detailInfo);
        this.paramInfo = new Params(data.itemParams.info, data.itemParams.rule);
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      });
    //  请求推荐数据
      getRecommend().then(res => {
        console.log(res);
        const data1 = res.data;
        this.recommmend = data1.list;
      });

      this.getDetailNavBarY = debounce( () => {
        this.detailNavBarY.push(0);
        this.detailNavBarY.push(this.$refs.paramsY.$el.offsetTop - 44);
        this.detailNavBarY.push(this.$refs.commentY.$el.offsetTop - 44);
        this.detailNavBarY.push(this.$refs.recommendY.$el.offsetTop - 44);
        this.detailNavBarY.push(Number.MAX_VALUE);
      })


    },
    mounted() {
      const refresh2 = debounce(this.$refs.Scroll.refresh,10);

      this.$bus.$on('detailItemImgLoad', () => {
        refresh2()
      });


    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.Scroll.refresh();
        this.getDetailNavBarY()
      },
      titleClick(index) {
        console.log(index);
        this.$refs.Scroll.bscroll.scrollTo(0, -(this.detailNavBarY[index]),100)
      },
      contentScroll(position) {
        const positionY = -position.y;
        let length = this.detailNavBarY.length;
        for (let i = 0; i < length - 1; i++){
          // if (this.currentIndex !== i && ((i < length-1 && positionY >= this.detailNavBarY[i] && positionY < this.detailNavBarY[i + 1])
          //   || (i === length - 1 && positionY >= this.detailNavBarY[i]))){
          //   this.currentIndex = i;
          //   this.$refs.detailNav.currentIndex = this.currentIndex;
          // }
          if (this.currentIndex !== i && (positionY >= this.detailNavBarY[i] && positionY < this.detailNavBarY[i+1])) {
            this.currentIndex = i;
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
        }
        this.isShowBackTop = positionY > 1000;


      },
      addToCart() {
      //  1、获取商品信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;




      //  2.将商品添加到购物车里
      //   this.$store.commit('addCart', product)

      //  vuex将Vue发送给actions
        this.addCart(product).then( res => {

          this.$toast.show(res, 1500)
      //     this.isShow = true;
      //     this.isMessage = res;
      //
      //     setTimeout(() => {
      //       this.isShow = false;
      //       this.isMessage = ''
      //     },1500)
      //
        })
        // this.$store.dispatch('addCart', product).then(res => {
        //   this.isShow = true;
        //   this.isMessage = res;
        //
        //   setTimeout(() => {
        //     this.isShow = false;
        //     this.isMessage = ''
        //   },1500)
        // })
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 10;
    background: #ffffff;
    /*vh代表100%的视口高度*/
    height: 100vh;
  }
  .detail-Scroll{
    height: calc(100% - 44px - 49px);
  }
  .detail-navbar{
    position: relative;
    z-index: 10;
    background: #ffffff;
  }
</style>
