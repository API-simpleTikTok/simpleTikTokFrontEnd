<template>
  <div class="Publish">
    <span>测试</span>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'Publish'
})
const router = useRouter()
const videoEl = ref(null)
const activeIndex = ref(1)

onMounted(() => {
  videoEl.value = document.getElementById('video')
})
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.Publish {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: white;
  background: black;

  .footer {
    font-size: 15rem;
    font-weight: bold;
    color: var(--second-text-color);

    .base-slide-item {
      display: flex;
      align-items: center;
    }

    .active {
      color: white;
    }
  }

  .float {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: calc(100% - 60px);

    .close {
      font-size: 28rem;
      position: absolute;
      left: 20rem;
      top: 20rem;
    }

    .choose-music {
      position: absolute;
      left: 50%;
      top: 20rem;
      transform: translateX(-50%);
      border-radius: 20rem;
      background: #333333;
      padding: 5rem 15rem;
      display: flex;
      align-items: center;
      font-size: 14rem;

      svg {
        font-size: 30rem;
        margin-right: 5rem;
        width: 12rem;
        height: 12rem;
      }
    }

    .toolbar {
      position: absolute;
      top: 20rem;
      right: 10rem;

      .tool {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20rem;
        font-size: 26rem;
      }
    }
  }
}
</style>
