<template>
  <div class="login">
    <BaseHeader mode="light" backMode="dark" backImg="close">
      <!-- <template v-slot:right>
        <span class="f14" @click="nav('/login/help')">帮助与设置</span>
      </template> -->
    </BaseHeader>
    <Loading v-if="data.loading.getPhone" />
    <div v-else class="content">
      <!-- <div class="desc">
        <div class="title">登录看朋友内容</div>
        <div class="phone-number">138****8000</div>
        <div class="sub-title">认证服务由中国移动提供</div>
      </div> -->
        <div class="desc">
        <div class="title">登录看朋友内容</div>
        <div class="form">
            <label for="data.username">账号</label>
            <input v-model="data.username" type="text" placeholder="请输入账号" id="username" class="input" />

            <label for="data.password">密码</label>
            <input v-model="data.password" type="password" placeholder="请输入密码" id="password" class="input" />
        </div>

      </div>
      <dy-button
        type="primary"
        :loading="data.loading.login"
        :active="false"
        :loadingWithText="true"
        @click="login"
      >
        {{ data.loading.login ? '登录中' : '一键登录' }}
      </dy-button>
        <div>
            <span class="link" @click="nav('/login/register')"
            >一键注册</span>
        </div>
      <div class="protocol" :class="data.showAnim ? 'anim-bounce' : ''">
        <Tooltip style="top: -100%; left: -10rem" v-model="data.showTooltip" />
        
        <div class="left">
          <Check v-model="data.isAgree" />
        </div>
        <div class="right">
          我已阅读并同意
          <span class="link" @click="nav('/service-protocol', { type: '“抖音”用户服务协议' })"
            >用户协议</span
          >
          和
          <span class="link" @click="nav('/service-protocol', { type: '“抖音”隐私政策' })"
            >隐私政策</span
          >
          <div>
            以及
            <span class="link" @click="nav('/service-protocol', { type: '中国移动认证服务协议' })"
              >《中国移动认证服务条款》</span
            >
            ，同时登录并使用抖音火山版（原“火山小视频”）和抖音
          </div>
        </div>
      </div>

      <!-- <div class="other-login">
        <transition name="fade">
          <div v-if="data.isOtherLogin" class="icons">
            <img @click="_no" src="../../assets/img/icon/login/toutiao-round.png" alt="" />
            <img @click="_no" src="../../assets/img/icon/login/qq-round.webp" alt="" />
            <img @click="_no" src="../../assets/img/icon/login/wechat-round.png" alt="" />
            <img @click="_no" src="../../assets/img/icon/login/weibo-round.webp" alt="" />
          </div>
        </transition>
      </div> -->
      <!-- <transition name="fade">
        <span
          v-if="!data.isOtherLogin"
          class="other-login-text link"
          @click="data.isOtherLogin = !data.isOtherLogin"
          >其他方式登录</span
        >
      </transition> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import Check from '../../components/Check.vue'
import { useRouter } from 'vue-router';
import Tooltip from './components/Tooltip.vue'
import Loading from '../../components/Loading.vue'
import { onMounted, reactive } from 'vue'
import { useNav } from '@/utils/hooks/useNav'
import { _no, _sleep } from '@/utils'

import axios from 'axios';

defineOptions({
  name: 'login'
})

const router = useRouter(); // 获取 router 实例

const nav = useNav()
const data = reactive({
    username:"",
    password:"",
  isAgree: false,

  showAnim: false,
  showTooltip: false,
  loading: {
    login: false,
    getPhone: false
  }
})

onMounted(() => {
  getPhone()
})

async function getPhone() {
  data.loading.getPhone = true
  await _sleep(1000)
  data.loading.getPhone = false
}

function login() {
    console.log("登录中......")
    /*axios.post('/login', { username: data.username, password: data.password })
        .then(response => {
            // 处理登录成功的情况
            router.push('/home'); // 使用 router 实例进行导航
        })
        .catch(error => {
            // 处理登录失败的情况
            console.error('登录失败:', error);
        });*/
    router.push('/home'); // 使用 router 实例进行导航
}
/*if (data.isAgree) {
    data.loading.login = true
  } else {
    if (!data.showAnim && !data.showTooltip) {
      data.showAnim = true
      setTimeout(() => {
        data.showAnim = false
        data.showTooltip = true
      }, 500)
      setTimeout(() => {
        data.showTooltip = false
      }, 3000)
    }
  }*/
</script>

<style scoped lang="less">
@import '../../assets/less/index';

.login {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  color: black;
  font-size: 14rem;
  background: white;

  .content {
    padding: 60rem 30rem;

    .desc {
      margin-bottom: 60rem;
      margin-top: 120rem;
      display: flex;
      align-items: center;
      flex-direction: column;

      .title {
        margin-bottom: 20rem;
      }

      .phone-number {
        letter-spacing: 3rem;
        font-size: 30rem;
        margin-bottom: 10rem;
      }

      .sub-title {
        font-size: 12rem;
        color: var(--second-text-color);
      }
      .form {
        display: flex;
        flex-direction: column;
        margin-top: 20rem;
        width: 100%;  // 确保表单宽度适应屏幕
        align-items: center; // 中心对齐输入框

        .input {
          width: 90%; // 输入框宽度，适应不同屏幕
          padding: 12rem 20rem; // 增加填充，使输入更舒适
          margin-bottom: 25rem; // 增加间隙
          border: 2px solid #d9d9d9; // 设置边框颜色和厚度
          border-radius: 8rem; // 边框圆角
          font-size: 16rem; // 字体大小适中

          &:focus {
            border-color: #007BFF; // 聚焦时边框颜色
            outline: none; // 去除默认轮廓
            box-shadow: 0 0 8px rgba(0,123,255,0.2); // 添加轻微阴影
          }
        }

        label {
          font-size: 18rem; // 标签字体大小
          color: #333; // 标签字体颜色
          margin-bottom: 10rem; // 标签与输入框的间距
          align-self: start; // 标签对齐到开始位置
        }
      }
    }

    .button {
      width: 100%;
      margin-bottom: 5rem;
    }

    .protocol {
      position: relative;
      color: gray;
      margin-top: 20rem;
      font-size: 12rem;
      display: flex;

      .left {
        padding-top: 1rem;
        margin-right: 5rem;
      }
    }

    .other-login {
      position: absolute;
      bottom: 40rem;
      font-size: 12rem;
      display: flex;
      justify-content: center;
      width: calc(100vw - 60rem);
      transform: translateX(-50%);
      left: 50%;

      .icons {
        img {
          width: 40rem;
          margin-right: 15rem;

          &:nth-last-child(1) {
            margin-right: 0;
          }
        }
      }
    }

    .other-login-text {
      position: absolute;
      bottom: 55rem;
      font-size: 12rem;
      transform: translateX(-50%);
      left: 50%;
    }
  }
}
</style>
