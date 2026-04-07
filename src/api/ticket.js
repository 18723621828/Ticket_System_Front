import axios from 'axios';

/**
 * 获取工单列表
 * @returns {Promise} 工单列表数据
 */
export const getTickets = () => {
  return axios.get('/api/tickets');
};

/**
 * 删除工单
 * @param {string} id 工单ID
 * @returns {Promise} 删除结果
 */
export const deleteTicket = (id) => {
  return axios.delete(`/api/tickets/${id}`);
};
