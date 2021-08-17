import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Login = () => import('@/pages/login/login');
const Plate = () => import('@/pages/plate/plate.vue');

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/plate', // 登录成功后进入的首页
    component: Plate,
    meta: {
      isToken: true,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token') && to.meta.isToken === true) {
    router.push('/login')  // return next('/login')
  }
  next();
})

export default router
