import user_info from './user/info'
import parking_info from './user/parking'
import common from './common'
const user_module = {
  ...user_info,
  ...parking_info
}

const common_module = {
  ...common
}

export default {
  user_module,
  common_module
}
