import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('../views/home/Home');
const Category = () => import('../views/category/Category');
const ShopCar = () => import('../views/shopcar/ShopCar');
const My = () => import('../views/my/My');

Vue.use(VueRouter);

const routes = [
  {
    path:'',
    redirect:'/home'
  },{
    path:'/home',
    component:Home
  },{
    path:'/category',
    component:Category
  },{
    path:'/shopcar',
    component:ShopCar
  },{
    path:'/my',
    component:My
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
