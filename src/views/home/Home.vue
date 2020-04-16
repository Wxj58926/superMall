<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center" >购物街</div></nav-bar>
    <home-swiper :banners="banners" class="home-swiper"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>

  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import HomeSwiper from "./childHome/HomeSwiper";
  import RecommendView from "./childHome/RecommendView";

  import {getHomeMultidata} from "../../network/home";

  export default {
    name: "",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data() {
      return {
        banners: [],
        recommends: [],

      }
    },
  //  创造生命周期函数
    created() {
      getHomeMultidata().then( res => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;

      })
    }
  }
</script>

<style scoped>
  .home-nav, home-swiper{
    /*text-align: center;*/
    background-color: var(--color-tint);
    color: black;
  }
</style>
