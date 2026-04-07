// Vercel Serverless Function - 删除指定工单

// 导入共享的工单数据
import { tickets } from '../tickets.js';

export default function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 只允许 DELETE 请求
  if (req.method !== 'DELETE') {
    res.status(405).json({ code: 405, message: 'Method not allowed' });
    return;
  }

  const { id } = req.query;

  // 查找工单索引
  const index = tickets.findIndex(ticket => ticket.id === id);

  if (index === -1) {
    res.status(404).json({
      code: 404,
      message: 'Ticket not found'
    });
    return;
  }

  // 删除工单
  tickets.splice(index, 1);

  res.status(200).json({
    code: 200,
    message: 'Ticket deleted successfully'
  });
}
