<template>
  <div class="indicator-home" :class="{ isLight }">
    <div class="notice" :style="noticeStyle"><span>下拉刷新内容</span></div>
    <div class="toolbar" ref="toolbar" :style="toolbarStyle">
      <Icon
        icon="tabler:menu-deep"
        class="search"
        @click="$emit('showSlidebar')"
        style="transform: rotateY(180deg)"
      />
      <div class="tab-ctn">
        <div class="tabs" ref="tabs">
          <div class="tab" :class="{ active: index === 0 }" @click.stop="change(0)">
            <span>推荐</span>
          </div>
        </div>
        <div class="indicator" ref="indicator"></div>
      </div>
      <Icon
        v-hide="loading"
        icon="ion:search"
        class="search"
      />
    </div>
    <Loading :style="loadingStyle" class="loading" style="width: 40rem" :is-full-screen="false" />
  </div>
</template>

<script>
import Loading from '../../../components/Loading.vue'
import bus from '../../../utils/bus'
import { mapState } from 'pinia'
import { useBaseStore } from '@/store/pinia'
import { _css } from '@/utils/dom'

export default {
  name: 'IndicatorHome',
  components: {
    Loading
  },
  props: {
    loading: {
      type: Boolean,
      default() {
        return false
      }
    },
    //用于和slidList绑定，因为一个页面可能有多个slidList，但只有一个indicator组件
    name: {
      type: String,
      default: () => ''
    },
    index: {
      type: Number,
      default: () => 0
    },
    isLight: {
      type: Boolean,
      default: () => false
    }
  },
  setup() {
    const baseStore = useBaseStore()
    return { baseStore }
  },
  data() {
    return {
      indicatorRef: null,
      lefts: [],
      indicatorSpace: 0,
      type: 1,
      moveY: 0
    }
  },
  computed: {
    ...mapState(useBaseStore, ['judgeValue', 'homeRefresh']),
    transform() {
      return `translate3d(0, ${this.moveY - this.judgeValue > this.homeRefresh ? this.homeRefresh : this.moveY - this.judgeValue}px, 0)`
    },
    toolbarStyle() {
      if (this.loading) {
        return {
          opacity: 1,
          'transition-duration': '300ms',
          transform: `translate3d(0, 0, 0)`
        }
      }
      if (this.moveY) {
        return {
          opacity: 1 - (this.moveY - this.judgeValue) / (this.homeRefresh / 2),
          transform: this.transform
        }
      }
      return {
        opacity: 1,
        'transition-duration': '300ms',
        transform: `translate3d(0, 0, 0)`
      }
    },
    noticeStyle() {
      if (this.loading) {
        return { opacity: 0 }
      }
      if (this.moveY) {
        return {
          opacity: (this.moveY - this.judgeValue) / (this.homeRefresh / 2) - 0.5,
          transform: this.transform
        }
      }
      return { opacity: 0 }
    },
    loadingStyle() {
      if (this.loading) {
        return { opacity: 1, 'transition-duration': '300ms' }
      }
      if (this.moveY) {
        return {
          opacity: (this.moveY - this.judgeValue) / (this.homeRefresh / 2) - 0.5,
          transform: this.transform
        }
      }
      return {}
    }
  },
  created() {},
  mounted() {
    this.initTabs()
    bus.on(this.name + '-moveX', this.move)
    bus.on(this.name + '-moveY', (e) => {
      this.moveY = e
    })
    bus.on(this.name + '-end', this.end)
  },
  unmounted() {
    bus.off(this.name + '-moveX', this.move)
    bus.off(this.name + '-moveY')
    bus.off(this.name + '-end', this.end)
  },

methods: {
  change(index) {
    this.$emit('update:index', index);
    _css(this.indicatorRef, 'transition-duration', `300ms`);
    _css(this.indicatorRef, 'left', this.lefts[index] + 'px');
  },
  initTabs() {
    let tabs = this.$refs.tabs;
    this.indicatorRef = this.$refs.indicator;
    let indicatorWidth = _css(this.indicatorRef, 'width');
    let item = tabs.children[0];
    let tabWidth = _css(item, 'width');
    this.lefts = [
      item.getBoundingClientRect().x -
      tabs.children[0].getBoundingClientRect().x +
      (tabWidth * 0.5 - indicatorWidth / 2)
    ];
    _css(this.indicatorRef, 'transition-duration', `300ms`);
    _css(this.indicatorRef, 'left', this.lefts[0] + 'px');
  }
}

}
</script>

<style scoped lang="less">
.indicator-home {
  position: absolute;
  font-size: 16rem;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  color: white;
  height: var(--home-header-height);
  transition: all 0.3s;
  font-weight: bold;

  .toolbar {
    z-index: 2;
    position: relative;
    color: white;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 15rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tab-ctn {
      width: 100%; /* 使用100%宽度确保整个容器可以水平居中 */
      display: flex;
      justify-content: center; /* 水平居中子元素 */

      .tabs {
        position: relative;
        display: inline-flex; /* 使.tabs的大小正好包裹其内容 */

        .tab {
          transition: color 0.3s;
          color: rgba(white, 0.7);
          font-size: 17rem;
          cursor: pointer;
          margin: 0 10px; /* 可选：为标签添加一些外边距 */

          &.active {
            color: white;
          }
        }
      }

      .indicator {
        position: absolute;
        bottom: -6rem;
        height: 2.6rem;
        width: 26rem; /* 指示器宽度 */
        background: #fff;
        border-radius: 5rem;
        transform: translateX(-50%); /* 将指示器向左移动其宽度的一半 */
        left: 50%; /* 将指示器的起始点设置在容器的中心 */
      }
    }

    .search {
      color: white;
      font-size: 24rem;
    }
  }

  .notice, .loading {
    opacity: 0;
    position: absolute;
    top: 7rem;
    right: 7rem;
    transition: opacity 0.3s;
  }

  .loading {
    right: 7rem;
  }
}

</style>
