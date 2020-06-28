import {ADD_COUNTER,ADD_TO_CART} from "./mutations_types";

export default {
  // addCart(state, payload) {
  // let oldProduct = null;
  // for (let item of state.cartList) {
  //   if (item.iid === payload.iid) {
  //     oldProduct = item
  //   }
  // }
  // if (oldProduct) {
  //   oldProduct.count += 1
  // } else {
  //   payload.count = 1;
  //   state.cartList.push(payload)
  // }
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload)
  }



  //上面的for循环可以这样替换
  // let oldProduct = state.cartList.find(function (item) {
  //   return item.iid === payload.iid
  // });
  // if (oldProduct) {
  //   oldProduct.count += 1
  // } else {
  //   payload.count = 1;
  //   state.cartList.push(payload)
  // }

  // }
}
