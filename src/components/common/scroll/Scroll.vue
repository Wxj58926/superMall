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
      this.bscroll = new BScroll(this.$refs.wrapper, {
        //上拉加载更多
        pullUpLoad: this.pullUpLoad,
        //监听滚动
        probeType: this.probeType,
        //点击事件
        click: true
      });
      //监听滚动的位置,这里的'scroll'与'pullingUp'是固定的
      if (this.probeType === 2 || this.probeType === 3) {
        this.bscroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }
      //监听滚动到底部(上拉加载更多)
      if (this.pullUpLoad) {
        this.bscroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scroTo(x, y, time = 300) {
        this.scroll && this.bscroll.scrollTo(x, y, time)
      },
      finishPullUp () {
        this.bscroll && this.bscroll.finishPullUp()
      },
      refresh() {
        // console.log('----');
        this.scroll && this.bscroll.refresh()
      },
      getScrollY() {
        return this.bscroll ? this.scroll.y : 0
      }


    },
  }
</script>

<style scoped>

</style>
