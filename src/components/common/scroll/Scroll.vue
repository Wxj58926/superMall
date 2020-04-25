<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },

    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        //上拉加载更多
        pullUpLoad: this.pullUpLoad,
        //监听滚动
        probeType: this.probeType,
        //点击事件
        click: true
      });
      //监听滚动的位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      });
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })

    },
    methods: {
      scroTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp () {
        this.scroll.finishPullUp()
      }
    },
  }
</script>

<style scoped>

</style>
