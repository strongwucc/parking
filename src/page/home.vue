<template>
  <div class="home-page" @click.stop="hideKeyboard">
    <div class="background">
      <img src="../assets/img/banner@2x.png"/>
    </div>
    <div class="search-area">
      <div class="notice">请输入车牌号码</div>
      <div class="sub-notice">例如：沪A12345</div>
      <div class="numbers">
        <ul>
          <li @click.stop="showKeyboard(0)" :class="{cur: puttingIndex === 0}">{{licence.substr(0, 1)}}</li>
          <li @click.stop="showKeyboard(1)" :class="{cur: puttingIndex === 1}">{{licence.substr(1, 1)}}</li>
          <li @click.stop="showKeyboard(2)" :class="{cur: puttingIndex === 2}">{{licence.substr(2, 1)}}</li>
          <li @click.stop="showKeyboard(3)" :class="{cur: puttingIndex === 3}">{{licence.substr(3, 1)}}</li>
          <li @click.stop="showKeyboard(4)" :class="{cur: puttingIndex === 4}">{{licence.substr(4, 1)}}</li>
          <li @click.stop="showKeyboard(5)" :class="{cur: puttingIndex === 5}">{{licence.substr(5, 1)}}</li>
          <li @click.stop="showKeyboard(6)" :class="{cur: puttingIndex === 6}">{{licence.substr(6, 1)}}</li>
          <li class="electric" v-if="electric === false" @click.stop="switchElectric">
            <div class="add-icon"><img src="../assets/img/icon_plus@2x.png"/></div>
            <div class="add-notice">新能源</div>
          </li>
          <li @click.stop="showKeyboard(7)" v-else :class="{cur: puttingIndex === 7}">{{licence.substr(7, 1)}}</li>
        </ul>
      </div>
      <div class="rule-notice">停车费</div>
      <div class="rule-content">
        <ul>
          <li><span class="rule-icon"></span><span>首2小时内免费，超出部分20元/小时</span></li>
          <li><span class="rule-icon"></span><span>200积分＝1小时</span></li>
        </ul>
      </div>
    </div>
    <div class="action-area" :class="{'query-active': queryActive}" @click.stop="doQuery">立即查询</div>
    <keyboard @licenceCompleted="licenceCompleted" @licenceFinished="licenceFinished" :electric="electric" :putting-index="puttingIndex" :visible="licenceViewVisible"></keyboard>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Keyboard from '../components/keyboard'
export default {
  name: 'home',
  components: {Keyboard},
  inject: ['reload'], // 引入方法
  data () {
    return {
      putting: false,
      puttingIndex: -1,
      electric: false,
      licenceViewVisible: false,
      licence: '',
      querying: false
    }
  },
  computed: {
    ...mapState({
    }),
    queryActive: function () {
      if (this.licence.length === 8 || this.licence.length === 7) {
        return true
      }
      return false
    }
  },
  watch: {
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
    switchElectric () {
      this.electric = true
      this.showKeyboard(7)
    },
    licenceCompleted (licence) {
      this.puttingIndex = licence.length
      this.licence = licence
    },
    hideKeyboard () {
      this.puttingIndex = -1
      this.licenceViewVisible = false
    },
    showKeyboard (index) {
      this.puttingIndex = index
      this.licenceViewVisible = true
    },
    licenceFinished () {
      this.puttingIndex = -1
      this.licenceViewVisible = false
    },
    doQuery () {
      if (this.querying) {
        return false
      }
      if (this.licence.length !== 8 && this.licence.length !== 7) {
        return false
      }
      this.$vux.loading.show({
        text: '查询中'
      })
      this.querying = true

      setTimeout(() => {
        this.$vux.loading.hide()
        this.querying = false
        // this.$vux.toast.show({
        //   type: 'text',
        //   text: '未查询到您的停车订单',
        //   width: '200px',
        //   position: 'middle'
        // })
        this.$router.push('/pay')
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../assets/css/common";
  @keyframes myopacity
  {
    from {opacity:1;}
    to {opacity:0;}
  }

  /*Safari 和 Chrome:*/
  @-webkit-keyframes myopacity
  {
    from {opacity:1;}
    to {opacity:0;}
  }
  .home-page {
    height: 100%;
    .background {
      img {
        width: 100%;
      }
    }
    .search-area {
      position: relative;
      top: -34px;
      margin: 0 10px;
      background-color: #FFFFFF;
      box-shadow:0px 5px 15px rgba(0,0,0,0.05);
      border-radius: 10px;
      height: 318px;
      .notice, .sub-notice, .numbers, .rule-notice, .rule-content {
        position: relative;
      }
      .notice {
        height: 28px;
        top: 40px;
        font-size:20px;
        font-weight:bold;
        line-height:28px;
        color:rgba(51,51,51,1);
      }
      .sub-notice {
        top: 45px;
        height:22px;
        font-size:16px;
        font-weight:500;
        line-height:22px;
        color:rgba(153,153,153,1);
      }
      .numbers {
        top: 89px;
        height:45px;
        background:rgba(255,255,255,1);
        border:1px solid #DDDDDD;
        border-radius: 5px;
        margin: 0 17px;
        ul {
          display: flex;
          justify-content: center;
          height: 45px;
          align-items: center;
          li {
            position: relative;
            width: 40px;
            height: 30px;
            border-right: 1px #DDDDDD solid;
            font-size: 20px;
            font-weight:bold;
            line-height:30px;
            color:rgba(51,51,51,1);
            &:last-child {
              border: 0;
            }
          }
          .electric {
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size:8px;
            font-weight:500;
            line-height:12px;
            color:rgba(187,187,187,1);
            .add-icon {
              img {
                width: 15px;
                height: 15px;
              }
            }
            .add-notice {
              /*margin-top: 5px;*/
            }
          }
          .cur:after {
            position: relative;
            content: '';
            position: absolute;
            background-color: #38A1FF;
            width:20px;
            height:1px;
            left: 50%;
            transform: translate(-50% 0);
            bottom: 0;
            animation:myopacity 2s infinite;
            /*Safari 和 Chrome:*/
            -webkit-animation:myopacity .7s infinite;
          }
        }
      }
      .rule-notice {
        top: 139px;
        width:42px;
        height:20px;
        font-size:14px;
        margin-left: 20px;
        font-weight:bold;
        line-height:20px;
        color:rgba(102,102,102,1);
      }
      .rule-content {
        top: 149px;
        margin-left: 20px;
        ul {
          li {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height:20px;
            font-size:14px;
            font-weight:500;
            line-height:20px;
            color:rgba(153,153,153,1);
            .rule-icon {
              display: inline-block;
              width: 4px;
              height: 4px;
              background-color: #DDDDDD;
              border-radius: 2px;
              margin-right: 5px;
            }
          }
        }
      }
    }
    .action-area {
      width:300px;
      height:49px;
      background:rgba(56,161,255,1);
      opacity:0.4;
      border-radius:4px;
      font-size:16px;
      font-weight:500;
      color:rgba(255,255,255,1);
      margin-left: 37px;
      line-height: 49px;
      text-align: center;
    }
    .query-active {
      opacity:1;
    }
  }
</style>
