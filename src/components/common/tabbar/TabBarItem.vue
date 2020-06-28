<template>
  <div class="tab-bar-item" @click="itemClick">

    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>

    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

<!--    给slot插槽动态绑定类active-->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>

  </div>

</template>

<script>
    export default {
      props:{
        path:String,
        activeColor:{
          type:String,
          default:'red'
        }
      },
      name: "TabBarItem",
      // data(){
      //     return{
      //       // isActive:true
      //     }
      // },
      computed:{
        isActive(){
          //判断当前路由地址是否包含上面的path 如果相等则返回true
          return this.$route.path.indexOf(this.path) !== -1
        },
        activeStyle(){
          return this.isActive ? {color:this.activeColor} : {}
        }
      },
      methods:{
       itemClick(){
         this.$router.replace(this.path)
       }
      }
    }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    margin-top: auto;
    font-size: 14px;
    cursor: pointer;
  }
  .tab-bar-item img{
    height: 20px;
    width: 20px;
    margin-top: 5px;
    vertical-align: middle;
  }


</style>
