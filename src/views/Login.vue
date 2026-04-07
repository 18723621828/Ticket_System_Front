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

export default {
  name: 'LoginPage'
};
</script>

<script setup>
import axios from 'axios';

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

const handleLogin = async () => {
  try {
    console.log('Login form:', loginForm);
    console.log('Attempting to login...');
    
    // 使用axios发送登录请求
    const response = await axios.post('/api/login', loginForm);
    
    console.log('Response:', response);
    
    if (response.data.code === 200) {
      // 存储用户信息到localStorage
      localStorage.setItem('user', JSON.stringify(response.data.data));
      message.success('Login successful');
      router.push('/home');
    } else {
      message.error(response.data.message || 'Login failed');
    }
  } catch (error) {
    message.error('Login failed, please try again');
    console.error('Login error:', error);
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