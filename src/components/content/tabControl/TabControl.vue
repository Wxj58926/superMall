<template>
    <div class="tab-control">
      <div v-for="(item,index) in titles" class="tab-control-item"
           :class="{active:index === currentIndex}"
            @click="itemClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
    export default {
      name: "",
      props:{
        titles: {
          type: Array,
          default() {
            return []
          }
        }
      },
      //动态绑定class时用到currentIndex
      data() {
        return {
          currentIndex: 0
        }
      },
      methods:{
        itemClick: function (index) {
          this.currentIndex = index;
          this.$emit('itemClick',index)
        }
      }
    }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    background: #ffffff;
  }
  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .tab-control-item span{
    padding: 3px;
  }
  .active{
    color: #ff8198;
  }
  .active span{
    border-bottom: #ff8198 2px solid;
  }
</style>
