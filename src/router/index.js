import Vue from 'vue'
import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('@/page/home')), 'home') // 首页
const Pay = r => require.ensure([], () => r(require('@/page/pay')), 'pay') // 支付

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },

    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        auth: 1,
        title: '停车缴费'
      }
    },

    {
      path: '/pay',
      name: 'pay',
      component: Pay,
      meta: {
        auth: 1,
        title: '支付'
      }
    }
  ]
})
