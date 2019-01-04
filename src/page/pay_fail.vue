<template>
  <div class="fail-page">
    <div class="icon"><img src="../assets/img/img_fail@2x.png"/></div>
    <div class="title">支付失败</div>
    <div class="content">{{msg}}</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'pay_fail',
  components: {},
  inject: ['reload'], // 引入方法
  data () {
    return {
      msg: '支付失败啦'
    }
  },
  computed: {
    ...mapState({
    })
  },
  watch: {
  },
  mounted () {
    if (this.$route.params.error) {
      this.msg = this.$route.params.error
    }
  },
  destroyed () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  @import "../assets/css/common";
  .fail-page {
    height: 100%;
    background:rgba(255,255,255,1);
    padding-top: 129px;
    .icon {
      img {
        width: 70px;
        height: 66px;
      }
    }
    .title {
      margin-top: 36px;
      height:22px;
      font-size:16px;
      font-weight:500;
      line-height:22px;
      color:rgba(56,161,255,1);
    }
    .content {
      margin-top: 13px;
      padding: 0 50px;
      font-size:14px;
      font-weight:500;
      line-height:20px;
      color:rgba(51,51,51,1);
    }
  }
</style>
