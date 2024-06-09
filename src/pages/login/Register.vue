<template>
  <div class="PasswordLogin">
    <BaseHeader mode="light" backMode="dark" backImg="back">
      <template v-slot:right>
        <span class="f14" @click="$router.push('/login/help')">帮助与设置</span>
      </template>
    </BaseHeader>
    <div class="content">
      <div class="desc">
        <div class="title" style="font-size: 15%;">手机号注册</div>
      </div>

      <LoginInput autofocus type="phone" v-model="phone" placeholder="请输入手机号" />
      <!-- <LoginInput class="mt1r"  v-model="username" placeholder="请输入用户名" /> -->
      <LoginInput class="mt1r" type="text" v-model="username" placeholder="请输入用户名" />
      <LoginInput class="mt1r" type="password" v-model="password" placeholder="请输入密码" />
      <LoginInput class="mt1r" type="password" v-model="confirmPassword" placeholder="确认密码" />

      <div class="protocol" :class="showAnim ? 'anim-bounce' : ''">
        <Tooltip style="top: -150%; left: -10rem" v-model="showTooltip" />
        <div class="left">
          <Check v-model="isAgree" />
        </div>
        <div class="right">
          已阅读并同意
          <span >用户协议</span>
          和
          <span>隐私政策</span>
          ，同时同意注册并使用抖音火山版和抖音
        </div>
      </div>

      <div class="notice" v-if="notice">
        {{ notice }}
      </div>

      <dy-button
        type="primary"
        
        :active="false"
     
        @click="register"
      >
        {{ loading ? '注册中' : '注册' }}
      </dy-button>
    </div>
  </div>
</template>

<script>
import Check from '../../components/Check'
import LoginInput from './components/LoginInput'
import Tooltip from './components/Tooltip'
import Base from './Base'

export default {
  name: 'PasswordRegister',
  extends: Base,
  components: {
    Check,
    Tooltip,
    LoginInput
  },
  data() {
    return {
      phone: '',
      username: '',
      password: '',
      confirmPassword: '',
      notice: '',
      isAgree: false,
      showAnim: false,
      showTooltip: false,
      loading: false
    }
  },
  computed: {
    disabled() {
      return !(this.phone && this.username && this.password && this.confirmPassword && this.password === this.confirmPassword);
    }
  },
  methods: {
    async register() {
      if (!this.isAgree) {
        this.notice = "请同意服务协议和隐私政策";
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.notice = "两次输入的密码不一致";
        return;
      }
      this.loading = true;
      // 这里添加注册逻辑，如发送API请求等
      
       /*axios.post('/register', { username: data.username, password: data.password })
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
  }
}
</script>


<style scoped lang="less">
@import '../../assets/less/index';
@import 'Base.less';

.PasswordLogin {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex; /* 使用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  overflow: auto;
  color: black;
  font-size: 14rem;
  background: white;
}

.content {
  width: 100%; /* 根据需要调整宽度 */
  max-width: 500px; /* 最大宽度，保证不会过宽 */
  box-shadow: 0 0 10px rgba(0,0,0,0.1); /* 可选：添加阴影效果提升焦点 */
  padding: 2rem; /* 内部间距 */
  background: #fff; /* 背景色 */
  border-radius: 8px; /* 圆角 */
}

.dy-button {
  display: block; /* 块级元素 */
  width: 100%; /* 宽度 100% */
  color: #fff; /* 文字颜色 */
  background-color: #007BFF; /* 背景色 */
  border: none; /* 无边框 */
  padding: 12px 0; /* 内填充 */
  font-size: 16px; /* 字体大小 */
  border-radius: 4px; /* 圆角 */
  cursor: pointer; /* 鼠标样式 */
  margin-top: 20px; /* 顶部外边距 */
  transition: background-color 0.3s ease; /* 过渡动画 */

  &:hover {
    background-color: darken(#007BFF, 10%); /* 鼠标悬停时颜色加深 */
  }

  &:active, &:focus {
    background-color: darken(#007BFF, 20%); /* 激活时颜色更加深 */
  }
}

/* 如果按钮总是显示为激活状态 */
.dy-button {
  background-color: #0056b3; /* 更深的背景色 */
}

.protocol, .notice {
  text-align: center; /* 协议和通知文本居中 */
}
</style>
