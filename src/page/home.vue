<template>
  <div class="home-page">
    Hello Parking
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'home',
  components: {},
  inject: ['reload'], // 引入方法
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
    })
  },
  watch: {
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  @import "../assets/css/common";
  .home-page {
    height: 100%;
  }
</style>
