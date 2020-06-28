<template>
  <nav-bar>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles"
           class="titles-item"
           @click="itemClick(index)"
           :class="{active: currentIndex===index}" > {{item}}</div>
    </div>
    <div slot="left" class="backLeft" @click="backClick">
      <img src="../../../assets/img/common/back.svg" alt="">
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
  export default {
    name: "",
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0,
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('titleClick',index)
      },
      backClick() {
        this.$router.go(-1)
      }
    },
    components: {
      NavBar
    },
  }
</script>

<style scoped>
  .title{
    display: flex;
  }
  .titles-item{
    flex: 1;
  }
  .active{
    color: red;
  }
  .backLeft img{
    margin-top: 12px;
  }
</style>
