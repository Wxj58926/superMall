<template>
  <div id="home" class="wrapper">
<!--    导航栏-->
    <nav-bar class="home-nav"> <div slot="center" >购物街</div> </nav-bar>
<!--    分类tab-->
    <tab-control  :titles="['流行', '新款', '精选']"
                  @itemClick="itemClick"
                  class="tab-control"
                  ref="tabControl1"
                  v-show="isTabControl">
    </tab-control>
<!--    滚动区域-->
    <scroll class="content"
            ref="Scroll"
            :probe-type="3"
            @scroll="contentPosition"
            :pull-up-load="true"
            @pullingUp="loadMore" >
      <home-swiper :banners="banners" class="home-swiper" @swipperImgLoad="swipperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control  :titles="['流行', '新款', '精选']"
                    @itemClick="itemClick"
                    ref="tabControl2"
                    >
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
<!--    回到顶部点击箭头-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import Scroll from "../../components/common/scroll/Scroll";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";


  import HomeSwiper from "./childHome/HomeSwiper";
  import RecommendView from "./childHome/RecommendView";
  import FeatureView from "./childHome/FeatureView";

  import debounce from "../../common/utils";
  import {backTopMaxin} from '../../common/maxin'

  import {
    getHomeMultidata,
    getHomeGoods
  }
  from "../../network/home";
  import BackTop from "../../components/content/backTop/BackTop";

  export default {
    name: "",
    components:{
      BackTop,
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins: [backTopMaxin],
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
        //处理tabControl吸顶问题
        tabOffsetTop: 0,
        // isTabFixed: false,
        isTabControl: false,
        saveY: 0
      }
    },

  //  创造生命周期函数
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    //监听图片变化
    mounted() {
      const refresh1 = debounce(this.$refs.Scroll.refresh,10);

      this.$bus.$on('homeItemImgLoad', () => {
        refresh1()
      });
    },

    methods:{
      //监听事件方法
      itemClick(index) {
        // console.log(index);
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
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index
      },

      contentPosition(position) {
        // console.log(position);
        //决定BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000;

      //  决定tabControl是否吸顶
        this.isTabControl = (-position.y) > this.tabOffsetTop;
      },
      loadMore() {
        this.getHomeGoods(this.currentType);
        this.$refs.Scroll.bscroll.refresh()
      },
      swipperImgLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
          console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.Scroll.finishPullUp()
        })
      }
    },
    //计算属性用来监听事件变化
    computed: {
      showGoods() {
        // console.log(this.goods[this.currentType].list);
        return this.goods[this.currentType].list;
      },
      activated() {
        this.$refs.Scroll.scroTo(0, this.saveY, 0);
        this.$refs.Scroll.refresh()
      },
      deactivated() {
        this.saveY = this.$refs.Scroll.getScrollY()
      }

    },
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav, home-swiper{
    /*text-align: center;*/
    background-color: var(--color-tint);
    color: black;
  }
  .home-nav{
    /*position: fixed;*/
    /*z-index: 10;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*bottom: 0;*/
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  /*.tabControl{*/
  /*  position: sticky;*/
  /*  top:44px;*/
  /*  z-index: 10;*/
  /*}*/
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
