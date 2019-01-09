export default {
  set_parking_rule: (state, data) => {
    state.common_data.parking_rule = data
    localStorage.setItem('parking_rule', JSON.stringify(data))
  }
}
