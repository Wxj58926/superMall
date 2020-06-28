//  防抖函数封装
export default function debounce(func, delay){
  let timer = null;
  //在这里return的是一个函数，只是一个返回值  ...args是func函数中的参数，在这...指可传入多个
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(()=> {
      //执行func这个函数
      func.apply(this, args)
    },delay)
  }
}

export function formatDate(date, fmt) {
  //   1.获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  // 2.获取
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

