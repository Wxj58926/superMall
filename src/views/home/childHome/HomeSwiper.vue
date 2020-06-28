<template>
  <div>
    <swiper>
      <swiper-item :key="item.index" v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>

</template>

<script>
  import {Swiper, SwiperItem} from '../../../components/common/swiper'

  export default {
    name: "",
    props:{
      banners:{
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    methods: {
      imgLoad() {
        if (!this.isLoad) {
          this.$emit('swipperImgLoad');
          this.isLoad = true
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
    }
</script>

<style scoped>

</style>
