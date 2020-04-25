<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"> <div slot="center" >购物街</div> </nav-bar>

    <scroll class="content"
            ref="Scroll"
            :probe-type="3"
            @scroll="contentPosition"
            :pull-up-load="true"
            @pullingUp="loadMore" >
      <home-swiper :banners="banners" class="home-swiper"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control  :titles="['流行', '新款', '精选']" class="tabControl" @itemClick="itemClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top class="backtop" @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import Scroll from "../../components/common/scroll/Scroll";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import BackTop from "../../components/content/backTop/BackTop";


  import HomeSwiper from "./childHome/HomeSwiper";
  import RecommendView from "./childHome/RecommendView";
  import FeatureView from "./childHome/FeatureView";

  import {
    getHomeMultidata,
    getHomeGoods
  }
  from "../../network/home";

  export default {
    name: "",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page:0, list:[]},
          'new': {page:0, list:[]},
          'sell': {page:0, list:[]}
        },
        currentType: 'pop',
        isShowBackTop: false,
      }
    },
    //计算属性用来监听事件变化
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
  //  创造生命周期函数
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell')
    },
    methods:{
      //监听事件方法
      itemClick(index) {
        console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
      },
      backClick(){
        this.$refs.Scroll.scroTo(0, 0)
      },
      contentPosition(position) {
        console.log(position);
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore() {
        this.getHomeGoods(this.currentType);

        this.$refs.Scroll.scroll.refresh()
      },

      /**
       * 网络请求相关方法
       */
      getHomeMultidata(){
        getHomeMultidata().then( res => {
          console.log(res);
          //获取服务器数据
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;

        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then( res => {
          console.log(res.data);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.Scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav, home-swiper{
    /*text-align: center;*/
    background-color: var(--color-tint);
    color: black;
  }
  .home-nav{
    position: fixed;
    z-index: 10;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .tabControl{
    position: sticky;
    top:44px;
    z-index: 10;
  }
  .content{
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /*height: calc(100% - 93);*/
    /*!*overflow: hidden;*!*/
    /*margin-top: 44px;*/
  }

</style>
