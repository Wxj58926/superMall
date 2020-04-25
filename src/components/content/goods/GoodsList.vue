<template>
    <div class="goodsList">
      <goods-list-item v-for="item in goods" :goodsItem="item"></goods-list-item>
    </div>
</template>

<script>

  import GoodsListItem from "./GoodsListItem";

  export default {
    name: "",
    components:{
      GoodsListItem
    },
    props:{
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goodsList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>
