
import axios from 'axios'

export function request(config) {
  // return new Promise((resolve, reject) => {
  //   const instance = axios.create({
  //     baseURL: 'http://123.207.32.32:8000',
  //     timeout: 5000
  //   });
  // instance(config)
  //   .then(res => {
  //     resolve(res)
  //   })
  //   .catch(err => {
  //     reject(err)
  //   })

  // })
  //与上边Promise一样,发送真正的请求
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/h8',
    timeout: 5000
  });


  //axios请求拦截器
  instance.interceptors.request.use(config => {
    console.log(config);
    return config
  }, err => {
    console.log(err);
  });

  //响应拦截
  instance.interceptors.response.use( res => {
    console.log(res);
    return res.data;
  }, err => {
    console.log(err);
  });

  return instance(config)
}



