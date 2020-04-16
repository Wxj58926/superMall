<template>
    <div>
      <tab-bar>
        <tab-bar-item path="/home" activeColor="blue">
          <img slot="item-icon" src="../../../assets/img/IconTabBar/home0.png" alt="">
          <img slot="item-icon-active" src="../../../assets/img/IconTabBar/home1.png" alt="">
          <div slot="item-text">首页</div>
        </tab-bar-item>

        <tab-bar-item path="/category" activeColor="blue">
          <img slot="item-icon" src="../../../assets/img/IconTabBar/classification0.png" alt="">
          <img slot="item-icon-active" src="../../../assets/img/IconTabBar/classification1.png" alt="">
          <div slot="item-text">分类</div>
        </tab-bar-item>

        <tab-bar-item path="/shopcar" activeColor="blue">
          <img slot="item-icon" src="../../../assets/img/IconTabBar/Shopcar0.png" alt="">
          <img slot="item-icon-active" src="../../../assets/img/IconTabBar/Shopcar1.png" alt="">
          <div slot="item-text">购物车</div>
        </tab-bar-item>

        <tab-bar-item path="/my" activeColor="blue">
          <img slot="item-icon" src="../../../assets/img/IconTabBar/My0.png" alt="">
          <img slot="item-icon-active" src="../../../assets/img/IconTabBar/My1.png" alt="">
          <div slot="item-text">我的</div>
        </tab-bar-item>
      </tab-bar>
    </div>
</template>

<script>
  import TabBar from "../../../components/common/tabbar/TabBar";
  import TabBarItem from "../../../components/common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
