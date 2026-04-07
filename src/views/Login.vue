<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <h2>Login</h2>
      <a-form 
        :model="loginForm" 
        :rules="loginRules"
        ref="loginFormRef"
        @finish="handleLogin"
      >
        <a-form-item name="username" label="Username">
          <a-input v-model:value="loginForm.username" placeholder="Enter username" />
        </a-form-item>
        <a-form-item name="password" label="Password">
          <a-input-password v-model:value="loginForm.password" placeholder="Enter password" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block>
            Login
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { loginData } from '../data/tickets.js';

export default {
  name: 'LoginPage'
};
</script>

<script setup>

const router = useRouter();
const loginFormRef = ref(null);

const loginForm = reactive({
  username: '',
  password: ''
});

const loginRules = {
  username: [
    { required: true, message: 'Please input username', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' }
  ]
};

const handleLogin = () => {
  // 直接使用本地数据进行登录验证
  const response = loginData(loginForm.username, loginForm.password);

  if (response.code === 200) {
    // 存储用户信息到localStorage
    localStorage.setItem('user', JSON.stringify(response.data));
    message.success('Login successful');
    router.push('/home');
  } else {
    message.error(response.message || 'Login failed');
  }
};
</script>

<style scoped lang="less">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  
  .login-form-wrapper {
    width: 400px;
    padding: 30px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    
    h2 {
      text-align: center;
      margin-bottom: 24px;
      color: #1890ff;
    }
  }
}
</style>