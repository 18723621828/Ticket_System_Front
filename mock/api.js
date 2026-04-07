// Mock API 配置
import Mock from 'mockjs';
import { tickets } from './data';

// 配置响应时间
Mock.setup({
  timeout: '200-600'
});

// 登录API
Mock.mock(/^\/api\/login$/, 'post', (options) => {
  console.log('Mock login API called');
  console.log('Options:', options);
  
  let username = 'test';
  try {
    const body = JSON.parse(options.body);
    username = body.username || 'test';
  } catch (e) {
    console.error('Error parsing body:', e);
  }
  
  const response = {
    code: 200,
    message: 'success',
    data: {
      username,
      role: username === 'admin' ? 'admin' : 'user'
    }
  };
  
  console.log('Mock response:', response);
  return response;
});

// 获取工单列表API
Mock.mock(/^\/api\/tickets$/, 'get', () => {
  console.log('Mock tickets API called');
  const response = {
    code: 200,
    message: 'success',
    data: tickets
  };
  console.log('Mock response:', response);
  return response;
});

// 删除工单API
Mock.mock(/^\/api\/tickets\/[\w]+$/, 'delete', (options) => {
  console.log('Mock delete ticket API called');
  console.log('Options:', options);
  
  const id = options.url.split('/').pop();
  const index = tickets.findIndex(ticket => ticket.id === id);
  
  let response;
  if (index !== -1) {
    tickets.splice(index, 1);
    response = {
      code: 200,
      message: 'success',
      data: null
    };
  } else {
    response = {
      code: 404,
      message: 'Ticket not found',
      data: null
    };
  }
  
  console.log('Mock response:', response);
  return response;
});

// 导出Mock
if (import.meta.env.DEV) {
  console.log('Mock API 已启用');
}

export default Mock;