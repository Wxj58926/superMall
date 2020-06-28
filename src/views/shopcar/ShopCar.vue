<template>
    <div class="shop-car">
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{countLength}})</div>
      </nav-bar>

      <cart-list></cart-list>
      <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import {mapGetters} from 'vuex';
  import CartList from "./chilShopCar/CartList";
  import CartBottomBar from "./chilShopCar/CartBottomBar";


  export default {
    name: "",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },

    methods: {

    },
    computed: {
      // countCart() {
      //   return  this.$store.getters.cartLength
      // }
      // ...mapGetters(['cartLength', 'cartList'])
      //跟上边一样 只不过给cartLength起了个名叫countLength
      ...mapGetters({
        countLength: 'cartLength',

      })
    }
  }
</script>

<style scoped>
  .shop-car{
    height: 100vh;
  }
  .nav-bar{
    background: var(--color-tint);
    color: #ffffff;
    font-weight: 600;
  }
</style>
