<template>
    <div class="cart-list">
      <scroll class="cart-scroll" ref="cartScroll">
        <cart-list-item
          v-for="(item, index) in list"
          :itemInfo="item"
          :key="index">
        </cart-list-item>
      </scroll>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Scroll from "../../../components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";

  export default {
    name: "CartList",
    components:{
      Scroll,
      CartListItem,
    },
    computed: {
      ...mapGetters({
        list: 'cartList'
      })
    },
    activated() {
      this.$refs.cartScroll.refresh()
    }

  }
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 40px);
  }
  .cart-scroll{
    height: 100%;
    overflow: hidden;
  }
</style>
