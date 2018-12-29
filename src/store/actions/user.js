/**
 * 获取会员信息
 */
import Valid from '../../utils/valid'
export default {
  get_user_data ({commit, state}, router) {
    // var http = new Http();
    // localStorage.removeItem('user_data')
    // localStorage.removeItem('user_is_login')
    var userData = localStorage.getItem('user_data')
    var isLogin = localStorage.getItem('user_is_login')

    // 从本地缓存中先获取
    if (typeof userData === 'string') {
      commit('set_user_info', JSON.parse(userData))
      commit('set_user_login_status', isLogin)
    }

    // 路由守卫
    router.beforeEach((to, from, next) => {
      if (to.meta.title) {
        document.title = to.meta.title
      }
      if (state.user_auth.is_login === 0 && to.meta.auth === 1) {
        if (Valid.check_weixin() === false) {
          next({
            name: 'error',
            params: {errorType: '出错啦', errorMsg: '请在微信中打开'}
          })
        } else {
          var redirect = to.fullPath
          next({
            path: '/auth',
            query: {redirect: redirect} // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }
      } else {
        next()
      }
    })
  }
}
