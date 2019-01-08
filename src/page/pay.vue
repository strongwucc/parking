<template>
  <div class="pay-page">
    <div class="info-area">
      <div class="title">我的停车信息</div>
      <div class="content">
        <div class="header">
          <div class="licence-title">车牌号</div>
          <div class="licence">{{parkingInfo.carNo}}</div>
        </div>
        <div class="start-time">进场时间：{{parkingInfo.inTime}}</div>
        <div class="park-notice">停车时长</div>
        <div class="park-time">
          <div class="time">{{parkingInfo.minutes|minuteFormat}}</div>
          <div class="amount"><span>金额：</span><span class="money">￥{{parkingInfo.fee}}</span></div>
        </div>
      </div>
    </div>
    <div class="pay-method-area">
      <div class="title">选择支付方式</div>
      <div class="methods">
        <ul>
          <li>
            <div class="icon"><img src="../assets/img/icon_jifen@2x.png"/></div>
            <div class="intro">
              <div class="notice">积分抵扣</div>
              <div class="sub-notice">200积分=1小时，当前可用{{userInfo.point}}积分</div>
            </div>
            <div class="check-icon" @click.stop="switchPayMethod('score')">
              <img v-if="payMethod === 'score'" src="../assets/img/radio_default@2x.png"/>
              <img v-else src="../assets/img/radio_gray@2x.png"/>
            </div>
          </li>
          <li>
            <div class="icon"><img src="../assets/img/icon_weixin@2x.png"/></div>
            <div class="intro">
              <div class="notice">微信支付</div>
              <div class="sub-notice"></div>
            </div>
            <div class="check-icon" @click.stop="switchPayMethod('weixin')">
              <img v-if="payMethod === 'weixin'" src="../assets/img/radio_default@2x.png"/>
              <img v-else src="../assets/img/radio_gray@2x.png"/>
            </div>
          </li>
          <!--<li>-->
            <!--<div class="icon"><img src="../assets/img/icon_youhuiquan@2x.png"/></div>-->
            <!--<div class="intro">-->
              <!--<div class="notice">优惠券抵扣</div>-->
              <!--<div class="sub-notice">当前无可用优惠券</div>-->
            <!--</div>-->
            <!--<div class="check-icon"><img src="../assets/img/icon_arrow_right@2x.png"/></div>-->
          <!--</li>-->
        </ul>
        <div class="line-1"></div>
        <div class="line-2"></div>
      </div>
    </div>
    <div class="action-area">
      <div class="amount">
        <span>需付金额：</span>
        <span class="money">￥{{parkingInfo.fee}}</span>
      </div>
      <div class="action" @click.stop="doPay">确认支付</div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'pay',
  components: {},
  inject: ['reload'], // 引入方法
  data () {
    return {
      info: {
        licence: '沪A00001',
        startTime: '2018-12-12 12:24:00',
        parkTime: '121',
        amount: '40'
      },
      payMethod: 'score',
      paying: false
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.user_info,
      parkingInfo: state => state.user.parking_info
    })
  },
  watch: {
  },
  created () {
    if (typeof this.userInfo.memberId === 'undefined') {
      this.get_user_info()
    }

    if (typeof this.parkingInfo.carNo === 'undefined') {
      this.get_parking_data()
    }
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
    ...mapMutations([
      'get_user_info',
      'get_parking_data'
    ]),
    switchPayMethod (method) {
      this.payMethod = method
    },
    doPay () {
      switch (this.payMethod) {
        case 'score':
          this.payByScore()
          break
        case 'weixin':
          this.payByWeiXin()
          break
        default:
          break
      }
    },
    payByScore () {
      if (this.paying) {
        return false
      }
      this.$vux.loading.show({
        text: '支付中'
      })
      this.paying = true

      let postData = {
        consumepoint: this.parkingInfo.fee,
        memberId: this.userInfo.memberId,
        operator: this.userInfo.memberId,
        type: 2
      }

      this.$http.post(this.API.operationPoint, postData).then(res => {
        this.$vux.loading.hide()
        this.paying = false
        if (res.return_code === '0000') {
          this.$router.push('/pay_success')
        } else {
          this.$router.push('/pay_fail/' + res.return_message)
        }
      })
    },
    payByWeiXin () {
      if (this.paying) {
        return false
      }
      this.$vux.loading.show({
        text: '支付中'
      })
      this.paying = true

      let postData = {
        tranAmt: this.parkingInfo.fee,
        carNo: this.parkingInfo.carNo
      }

      this.$http.post(this.API.wxPay, postData).then(res => {
        this.$vux.loading.hide()
        this.paying = false
        if (res.return_code === '0000') {
          if (res.data.codeUrl) {
            window.location.href = res.data.codeUrl
          }
        } else {
          this.$router.push('/pay_fail/' + res.return_message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../assets/css/common";
  .pay-page {
    height: 100%;
    padding-top: 20px;
    .info-area {
      margin: 0 15px;
      .title {
        height:22px;
        font-size:16px;
        font-weight:bold;
        line-height:22px;
        color:rgba(51,51,51,1);
        text-align: left;
      }
      .content {
        margin-top: 15px;
        height:160px;
        background:rgba(255,255,255,1);
        box-shadow:0px 5px 15px rgba(0,0,0,0.05);
        border-radius:6px;
        .header {
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          background:rgba(92,164,230,1);
          border-radius:6px 6px 0 0;
          .licence-title {
            width:44px;
            height:18px;
            border:1px solid rgba(255,255,255,1);
            opacity:0.7;
            border-radius:2px;
            font-size:12px;
            font-weight:500;
            line-height:18px;
            color:rgba(255,255,255,1);
          }
          .licence {
            /*width:74px;*/
            height:22px;
            font-size:16px;
            font-weight:500;
            line-height:22px;
            color:rgba(255,255,255,1);
            margin-left: 9px;
          }
        }
        .start-time {
          height:17px;
          font-size:12px;
          font-weight:500;
          line-height:17px;
          color:rgba(153,153,153,1);
          margin: 20px 0 0 20px;
          text-align: left;
        }
        .park-notice {
          height:20px;
          font-size:14px;
          font-weight:500;
          line-height:20px;
          text-align: left;
          color:rgba(51,51,51,1);
          margin: 10px 0 0 20px;
        }
        .park-time {
          height:28px;
          font-size:20px;
          font-weight:500;
          line-height:28px;
          color:rgba(51,51,51,1);
          margin: 5px 20px;
          display: flex;
          justify-content: space-between;
          .amount {
            font-size:14px;
            .money {
              font-size:20px;
              color:rgba(255,106,89,1);
            }
          }
        }
      }
    }
    .pay-method-area {
      margin-top: 30px;
      .title {
        margin-left: 15px;
        height:22px;
        font-size:16px;
        font-weight:bold;
        line-height:22px;
        color:rgba(51,51,51,1);
        text-align: left;
      }
      .methods {
        /*height:182px;*/
        height:122px;
        margin-top: 10px;
        background:rgba(255,255,255,1);
        ul {
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 61px;
            margin: 0 16px;
            .icon {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              img {
                width: 24px;
                height: 24px;
              }
            }
            .intro {
              width: 280px;
              .notice {
                font-size:14px;
                font-weight:500;
                text-align: left;
                line-height: 20px;
                color:rgba(51,51,51,1);
              }
              .sub-notice {
                text-align: left;
                font-size:12px;
                font-weight:500;
                line-height:17px;
                color:rgba(102,102,102,1);
              }
            }
            .check-icon {
              display: flex;
              justify-content: flex-end;
              align-items: center;
              img {
                width: 24px;
                height: 24px;
              }
            }
            &:nth-child(2) {
              .icon {
                img {
                  width: 22px;
                  height: 18px;
                }
              }
            }
            &:nth-child(3) {
              .intro {
                .sub-notice {
                  color:rgba(153,153,153,1);
                }
              }
            }
          }
        }
        .line-1, .line-2 {
          width:329px;
          height:0.5px;
          background-color: #e7e7e7;
          position: relative;
          left: 46px;
        }
        .line-1 {
          top: -122px;
        }
        .line-2 {
          top: -61px;
        }
      }
    }
    .action-area {
      position: fixed;
      display: flex;
      bottom: 0;
      height: 49px;
      .amount {
        width: 222px;
        padding-left: 20px;
        font-size: 14px;
        line-height: 49px;
        text-align: left;
        background:rgba(255,255,255,1);
        .money {
          font-size:20px;
          font-weight:500;
          color:rgba(255,106,89,1);
        }
      }
      .action {
        width: 160px;
        line-height: 49px;
        text-align: center;
        background:rgba(56,161,255,1);
        font-size:16px;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
    }
  }
</style>
