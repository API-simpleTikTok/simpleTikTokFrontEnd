<template>
  <div class="login">
    <BaseHeader mode="light" backMode="dark" backImg="close">
    </BaseHeader>
    <Loading v-if="data.loading.getPhone" />
    <div v-else class="content">
      <div class="desc">
        <div class="title" style="font-size:20px">登录看朋友内容</div>
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
        <span class="link" @click="nav('/login/register')">一键注册</span>
      </div>
      <div class="protocol" :class="data.showAnim ? 'anim-bounce' : ''">
        <Tooltip style="top: -100%; left: -10rem" v-model="data.showTooltip" />
        <div class="left">
          <Check v-model="data.isAgree" />
        </div>
        <div class="right">
          我已阅读并同意
          <span class="link" @click="nav('/service-protocol', { type: '“抖音”用户服务协议' })">用户协议</span>
          和
          <span class="link" @click="nav('/service-protocol', { type: '“抖音”隐私政策' })">隐私政策</span>
          <div>
            以及
            <span class="link" @click="nav('/service-protocol', { type: '中国移动认证服务协议' })">《中国移动认证服务条款》</span>
            ，同时登录并使用抖音火山版（原“火山小视频”）和抖音
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Check from '../../components/Check.vue';
import { useRouter, useRoute } from 'vue-router';
import Tooltip from './components/Tooltip.vue';
import Loading from '../../components/Loading.vue';
import { onMounted, reactive, watch } from 'vue';
import { useNav } from '../../utils/hooks/useNav';
import { _no, _sleep } from '../../utils';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useBaseStore } from '@/store/pinia'; // 路径根据实际存放位置调整

const router = useRouter();
const route = useRoute(); // 获取 route 实例

const nav = useNav();
const data = reactive({
  username:  '',
  password: '', 
  isAgree: false,
  showAnim: false,
  showTooltip: false,
  loading: {
    login: false,
    getPhone: false
  }
});
// 使用 watch 监听路由参数的变化
watch(() => route.query, (newQuery, oldQuery) => {
    console.log("route.query.username=",route.query.username,route.query.password)
  const usernameQuery = route.query.username;
  const passwordQuery = route.query.password;
  data.username = Array.isArray(usernameQuery) ? usernameQuery[0] : usernameQuery || '';
  data.password = Array.isArray(passwordQuery) ? passwordQuery[0] : passwordQuery || '';


});

onMounted(() => {
  // Check if a token exists
  const token = localStorage.getItem('token');

    getPhone();

});

async function getPhone() {
  data.loading.getPhone = true;
  await _sleep(1000);
  data.loading.getPhone = false;
}

function login() {
  console.log("登录中......author=", data.username, " password=", encryptPassword(data.password));

  axios.post('http://localhost:3030/session', { author: data.username, password: data.password })
    .then(response => {
      // 处理登录成功的情况
      console.log("登录成功");
      console.log('token',response.data.data.token);
      localStorage.setItem('tiktokAuthor',data.username)
      localStorage.setItem('tiktokPassword',data.password)
      localStorage.setItem('token',response.data.data.token)
      const store = useBaseStore(); // 获取 Pinia store 实例
      store.token = response.data.data.token; // 修改 token
      router.push('/home'); // 使用 router 实例进行导航
    })
    .catch(error => {
      // 处理登录失败的情况
      ElMessage.error('用户名或密码错误');
      console.error('登录失败:', error);
    });
}

function encryptPassword(password) {
  // 加密密码
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
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
