<template>
    <div class="cart-bottom-bar">
<!--      全选按钮-->
      <div class="check-total">
        <check-button class="checkbutton" :is-checked="isSelectAll" @click.native="select"></check-button>
        <span>全选</span>
      </div>
<!--      合计-->
      <div class="price">
        总计：{{totalPrice}}
      </div>
<!--      去计算-->
      <div class="computer">
        <button class="computer-button" @click="computerClick">提交({{checkLength}})</button>
      </div>
    </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";

  export default {
    name: "",

    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((prePrice, item) => {
          return prePrice + item.price*item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        //checked的false长度为0时返回false，取反后返回true
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        if (this.$store.state.cartList.length > 0) {
          return !this.$store.state.cartList.find(item => !item.checked)
        }
      }
    },
    methods: {
      select() {
        if (this.isSelectAll) {
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else {
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      computerClick() {
        if (!this.isSelectAll) {
          this.$toast.show('请选择购买的商品', 1500)
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar{
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    display: flex;
  }
  .check-total{
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .checkbutton{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 20px;
  }
  .computer{
    position: absolute;
    /*margin-left: 90px;*/
    right: 10px;
  }
  .computer-button{
    height: 30px;
    width: 70px;
    text-align: center;
    color: brown;
    font-size: 17px;
    background: rgba(100,100,100,.5);
  }
</style>
