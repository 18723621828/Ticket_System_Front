import axios from 'axios';

// API 基础 URL - 生产环境使用相对路径，Vercel 会自动代理到 API 路由
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * 获取工单列表
 * @returns {Promise} 工单列表数据
 */
export const getTickets = () => {
  return axios.get(`${API_BASE_URL}/api/tickets`);
};

/**
 * 删除工单
 * @param {string} id 工单ID
 * @returns {Promise} 删除结果
 */
export const deleteTicket = (id) => {
  return axios.delete(`${API_BASE_URL}/api/tickets/${id}`);
};
