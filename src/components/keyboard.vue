<template>
  <transition name="slide">
    <div class="keyboard" v-show="visible" @click.stop="">
      <div class="finished">
        <div class="finish-btn" @click="finishPutting">完成</div>
      </div>
      <ul class="letter-list" v-if="type === 1">
        <li class="letter" v-for="(letter, index) in letterList" :key="index">
          <div @touchstart.stop="touchStart(index)" @touchend.stop="touchEnd(index, 1)" :class="{light: currentIndex === index && highlight}">{{letter}}</div>
        </li>
      </ul>
      <ul class="chinese-list" v-if="type === 0">
        <li class="chinese" v-for="(letter, index) in chineseList" :key="index">
          <div @touchstart.stop="touchStart(index)" @touchend.stop="touchEnd(index, 0)" :class="{light: currentIndex === index && highlight}">{{letter}}</div>
        </li>
      </ul>
      <div class="type-switch" @click.stop="switchType">
        <template v-if="type === 0">ABC</template>
        <template v-else>中文</template>
      </div>
      <div class="rollback" @click.stop="rollBack">回退</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'keyboard',
  data () {
    return {
      type: 0,
      chineseList: [
        '京', '津', '渝', '沪', '冀', '晋', '辽', '吉', '黑', '苏',
        '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '琼',
        '川', '贵', '云', '陕', '甘', '青', '蒙', '桂', '宁', '新',
        '藏', '使', '领', '警', '学', '港', '澳'
      ],
      letterList: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M'
      ],
      currentIndex: 0,
      highlight: false
    }
  },
  props: {
    visible: false,
    electric: false
  },
  methods: {
    touchStart (index) {
      this.currentIndex = index
      this.highlight = true
    },

    touchEnd (index, type) {
      this.highlight = false

      let appended = ''

      if (type === 0) {
        appended = this.chineseList[this.currentIndex].toString()
      } else if (type === 1) {
        appended = this.letterList[this.currentIndex].toString()
      }

      this.$emit('licenceCompleted', appended)
    },
    finishPutting () {
      this.$emit('finishPutting')
    },
    switchType () {
      this.type = this.type === 0 ? 1 : 0
    },
    rollBack () {
      this.$emit('rollBack')
    }
  }
}
</script>

<style lang="less" scoped>
  .keyboard{
    position: fixed;
    z-index: 9999;
    width: 100%;
    bottom: 0;
    background-color: #d2d5da;
    .finished {
      background-color: #B6B7BA;
      height: 30px;
      display: flex;
      justify-content: flex-end;
      .finish-btn {
        width: 15%;
        padding: 0 5px;
        line-height: 30px;
        font-size: 14px;
        color: #38A1FF;
      }
    }
    .letter-list, .chinese-list{
      padding: 15px 5px 5px 5px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      li{
        width: 10%;
        margin-bottom: 7px;
        div{
          height: 31px;
          line-height: 31px;
          text-align: center;
          background-color: #ffffff;
          border-radius: 5px;
          margin: 0 3px;
          font-size: 20px;
        }
        .light{
          background-color: rgba(0,0,0,.1);
        }
      }
      .letter {
        &:nth-child(21) {
          margin-left: 10px;
        }
        &:nth-child(29) {
          margin-right: 10px;
        }
        &:nth-child(30) {
          margin-left: 50px;
        }
        &:last-child {
          margin-right: 50px;
        }
      }
      .chinese {
        &:nth-child(31) {
          margin-left: 50px;
        }
        &:last-child {
          margin-right: 50px;
        }
      }

    }
    .type-switch {
      position: relative;
      content: 'ABC';
      position: absolute;
      background-color: gray;
      border-radius: 5px;
      width:45px;
      height:31px;
      left: 30px;
      transform: translate(-50% 0);
      line-height: 31px;
      text-align: center;
      font-size: 18px;
      bottom: 12px;
    }
    .rollback {
      position: relative;
      content: '回退';
      position: absolute;
      background-color: gray;
      border-radius: 5px;
      width:45px;
      height:31px;
      right: -15px;
      transform: translate(-50% 0);
      line-height: 31px;
      text-align: center;
      font-size: 18px;
      bottom: 12px;
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition: transform .3s ease;
    transform: translateY(0);
  }
  .slide-enter, .slide-leave-active {
    transform: translateY(100%);
  }
</style>
