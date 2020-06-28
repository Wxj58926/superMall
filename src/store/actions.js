import {ADD_COUNTER,ADD_TO_CART} from "./mutations_types";

export default {
  addCart(context, payload){
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(function (item) {
        return item.iid === payload.iid
      });
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前产品数量加1')
      } else {
        payload.count = 20;

        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加新商品')
      }
    })
  }
}
