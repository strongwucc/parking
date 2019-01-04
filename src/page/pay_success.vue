<template>
  <div class="success-page">
    <div class="notice-area">
      <div class="notice">
        <div class="icon"><img src="../assets/img/img_time@2x.png"/></div>
        <div class="content">请在<span class="warning">30分钟</span>内驶离停车场</div>
      </div>
      <div class="sub-notice">否则您可能需要支付额外的超时费用</div>
    </div>
    <div class="info">
      <div class="main">
        <div class="icon"><img src="../assets/img/img_success@2x.png"/></div>
        <div class="notice">支付成功</div>
        <div class="amount">￥40</div>
      </div>
      <div class="detail">
        <ul>
          <li>
            <div class="label">停车场</div>
            <div class="content">万达停车场</div>
          </li>
          <li>
            <div class="label">车牌号</div>
            <div class="content">沪A00001</div>
          </li>
          <li>
            <div class="label">支付方式</div>
            <div class="content">积分支付400积分</div>
          </li>
          <li>
            <div class="label">付款时间</div>
            <div class="content">2018-05-02 11:24:27</div>
          </li>
          <li v-show="showMore">
            <div class="label">停车时长</div>
            <div class="content">4小时0分钟</div>
          </li>
          <li v-show="showMore">
            <div class="label">进场时间</div>
            <div class="content">2018-05-02 11:24:27</div>
          </li>
          <li v-show="showMore">
            <div class="label">离场时间</div>
            <div class="content">2018-05-02 11:30:27</div>
          </li>
        </ul>
      </div>
      <div class="more" @click.stop="showMore = !showMore">
        <div class="notice">{{noticeTxt}}</div>
        <div class="icon">
          <img v-show="!showMore" src="../assets/img/icon_arrow_down_blue@2x.png"/>
          <img v-show="showMore" src="../assets/img/icon_arrow_up_blue@2x.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'pay_success',
  components: {},
  inject: ['reload'], // 引入方法
  data () {
    return {
      orderId: '',
      showMore: false
    }
  },
  computed: {
    ...mapState({
    }),
    noticeTxt: function () {
      return this.showMore ? '收起' : '查看更多'
    }
  },
  watch: {
  },
  mounted () {
    if (this.$route.params.orderId) {
      this.orderId = this.$route.params.orderId
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
  .success-page {
    height: 100%;
    background:rgba(255,255,255,1);
    .notice-area {
      height: 84px;
      padding-top: 20px;
      .notice {
        display: flex;
        height: 22px;
        justify-content: center;
        font-size:16px;
        font-weight:500;
        line-height:22px;
        color:rgba(51,51,51,1);
        .icon {
          img {
            width: 20px;
            height: 20px;
          }
        }
        .content {
          margin-left: 8px;
          .warning {
            color: #FF6A59;
          }
        }
      }
      .sub-notice {
        margin-top: 5px;
        height: 17px;
        line-height: 17px;
        font-size:12px;
        font-weight:500;
        color:rgba(153,153,153,1);
      }
    }
    .info {
      border-top: 5px #F2F4F7 solid;
      .main {
        padding-top: 41px;
        .icon {
          img {
            width: 70px;
            height: 66px;
          }
        }
        .notice {
          margin-top: 15px;
          height:22px;
          font-size:16px;
          font-weight:500;
          line-height:22px;
          color:rgba(56,161,255,1);
        }
        .amount {
          margin-top: 5px;
          height:33px;
          font-size:24px;
          font-weight:500;
          line-height:33px;
          color:rgba(51,51,51,1);
        }
      }
      .detail {
        margin-top: 28px;
        ul {
          li {
            display: flex;
            justify-content: space-between;
            padding: 0 18px 0 15px;
            height:20px;
            font-size:14px;
            font-weight:500;
            line-height:20px;
            margin-bottom: 11px;
            .label {
              color:rgba(153,153,153,1);
            }
            .content {
              color:rgba(51,51,51,1);
            }
          }
        }
      }
    }
    .more {
      margin-top: 19px;
      display: flex;
      justify-content: center;
      height: 20px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: rgba(56, 161, 255, 1);
      .icon {
        /*margin-left: 5px;*/
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
</style>
