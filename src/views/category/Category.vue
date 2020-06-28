<template>
  <div class="wrapper">
<!--    <h2>分类</h2>-->
    <ul class="content">

    </ul>
  </div>

</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "",
    data(){
      return{
        scroll: null
      }
    },
    mounted() {
      this.scrooll = new BScroll(document.querySelector('.wrapper'),{
        probeType: 3,
        //上拉加载更多
        pullUpLoad: true
      });

      this.scrooll.on('scroll',(position) => {

      })
      this.scrooll.on('pullUpLoad', () => {
        console.log('上拉加载更多');
      })

    }
  }
</script>

<style scoped>
  .wrapper{
    height: 150px;
    background-color: red;
    /*overflow: auto;*/
  }
</style>
