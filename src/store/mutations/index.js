// 会员信息
import user_auth from './user/auth'
import user_info from './user/info'
const user_module = {
  ...user_auth,
  ...user_info
}

export default {
  user_module
}
