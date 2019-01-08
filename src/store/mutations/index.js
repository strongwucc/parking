import user_info from './user/info'
import parking_info from './user/parking'
const user_module = {
  ...user_info,
  ...parking_info
}

export default {
  user_module
}
