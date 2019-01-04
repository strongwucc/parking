import Vue from 'vue'
import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('@/page/home')), 'home') // 首页
const Pay = r => require.ensure([], () => r(require('@/page/pay')), 'pay') // 支付
const PaySuccess = r => require.ensure([], () => r(require('@/page/pay_success')), 'pay_success') // 支付成功
const PayFail = r => require.ensure([], () => r(require('@/page/pay_fail')), 'pay_fail') // 支付失败

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
    },

    {
      path: '/pay_success/:orderId',
      name: 'pay_success',
      component: PaySuccess,
      meta: {
        auth: 1,
        title: '支付成功'
      }
    },

    {
      path: '/pay_fail/:error',
      name: 'pay_fail',
      component: PayFail,
      meta: {
        auth: 1,
        title: '支付失败'
      }
    }
  ]
})
