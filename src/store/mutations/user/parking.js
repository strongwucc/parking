/**
 * 停车信息
 */
export default {
  set_parking_info: (state, info) => {
    state.parking_info = info
    localStorage.setItem('parking_info', JSON.stringify(info))
  },
  get_parking_data (state) {
    var parkingInfo = localStorage.getItem('parking_info')

    // 从本地缓存中先获取
    if (typeof parkingInfo === 'string') {
      state.parking_info = JSON.parse(parkingInfo)
    }
  }
}
