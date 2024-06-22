<template>
  <div class="login">
    <BaseHeader mode="light" backMode="dark" backImg="close">
    </BaseHeader>


    <div  class="content">
      <div class="desc">
        <div class="title" style="font-size:20px">登录看朋友内容</div>
        <div class="form">
          <label for="data.username">账号</label>
          <div style="display: flex; align-items: center;">
            <input v-model="data.username" type="text" placeholder="请输入账号" id="username" class="input" style="width: 80%;" />
            <dy-button type="primary" style="width: 40%; margin: 0 0 25px;margin-left: 10px;" @click="getQR">获取验证 </dy-button>
          </div>
          
          <label for="data.password">密码</label>
          <input v-model="data.password" type="password" placeholder="请输入密码" id="password" class="input" />

          <label for="data.repassword">二次验证码</label>
          <input v-model="data.repassword" type="text" placeholder="请输入二次验证码" id="repassword" class="input" />
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
import { onMounted, reactive, watch } from 'vue';
import { useNav } from '../../utils/hooks/useNav';
import { _no, _sleep } from '../../utils';

import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useBaseStore } from '@/store/pinia'; // 路径根据实际存放位置调整
import { ElMessageBox, ElMessage } from 'element-plus';
import { getQRcode,} from '@/api/user'



const router = useRouter();
const route = useRoute(); // 获取 route 实例

const nav = useNav();
const data = reactive({
  QRvisible:false,
  qrCodeBase64 :'',
  username:  '',
  password: '', 
  repassword: '',
  isAgree: false,
  showAnim: false,
  showTooltip: false,
  loading: {
    login: false,

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
  const token = sessionStorage.getItem('token');



});


function login() {
    // 二重验证
      console.log("base_url=",useBaseStore().base_url)
  console.log("登录中......author=", data.username, " password=", data.password, " twoFactorCode="+data.repassword);
  axios.post(useBaseStore().base_url+'/session', { author: data.username, password: data.password, twoFactorCode:data.repassword }, {
    })
    .then(response => {
        if (response.data.code !== 200) {
            console.error('Error:', response.data.msg);
            ElMessage.error(response.data.msg);
        } else {
           ElMessage.success("登录成功");
            sessionStorage.setItem('tiktokAuthor',data.username)
            sessionStorage.setItem('token',response.data.data.token)
            const store = useBaseStore(); // 获取 Pinia store 实例
            store.token = response.data.data.token; // 修改 token
            router.push('/home'); // 使用 router 实例进行导航
        }
      // 处理登录成功的情况
      

     
    })
    .catch(error => {
      // 处理登录失败的情况
      ElMessage.error('登录失败！用户名/密码/校验码错误');
      console.error('登录失败:', error);
    });
}



function getQR(){
    // 向后端发请求获取二维码 更新为data.qrCodeBase64
    data.qrCodeBase64 = "";
    axios.get(useBaseStore().base_url+'/user/bindingGoogleTwoFactorValidate', {
        params: {
          author: data.username
        },
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'), // 如果需要 token 认证
        }
      })
      .then(response => {
        console.log("res=", response)
        if (response.data.code !== 200) {
            console.error('Error:', response.data.msg);
            ElMessage.error(response.data.msg);
        } else {
           data.qrCodeBase64 = response.data.data.img;  // 根据实际的响应结构调整
           showQRDialog();
        }
      })
      .catch(error => {
        console.error('获取二维码失败:', error);
        ElMessage.error('获取二维码失败');
      });
}

function showQRDialog() {//token token
  ElMessageBox({
    title: '二重验证',
    message: `<div style="text-align: center;"><img src="${data.qrCodeBase64}" alt="二维码" style="display: inline-block; height: auto; max-width: 100%;"></div>`,
    dangerouslyUseHTMLString: true,
    showCancelButton: false,  // 取消关闭按钮
    showConfirmButton: false, // 取消确认按钮
    customClass: 'qr-code-dialog'
  }).catch(() => {
    // ElMessage.info('二重验证');
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
    padding: 40rem 30rem;

    .desc {
      margin-bottom: 60rem;
      margin-top: 60rem;
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
