// Vercel Serverless Function - 获取工单列表

// 内存中存储工单数据（实际生产环境应该使用数据库）
let tickets = [
  {
    "id": "001",
    "project": "Road Project A",
    "overtime": true,
    "hours": 3.5,
    "created_at": "2024-04-10 10:30"
  },
  {
    "id": "002",
    "project": "Bridge Maintenance B",
    "overtime": false,
    "hours": 2,
    "created_at": "2024-04-09 13:00"
  },
  {
    "id": "003",
    "project": "Pipeline Fix C",
    "overtime": true,
    "hours": 4.5,
    "created_at": "2024-04-08 08:00"
  },
  {
    "id": "004",
    "project": "Bridge Maintenance B",
    "overtime": true,
    "hours": 3,
    "created_at": "2024-04-07 16:45"
  },
  {
    "id": "005",
    "project": "Tunnel Cleaning D",
    "overtime": false,
    "hours": 8.1,
    "created_at": "2024-04-03 11:43"
  }
];

export default function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 只允许 GET 请求
  if (req.method !== 'GET') {
    res.status(405).json({ code: 405, message: 'Method not allowed' });
    return;
  }

  // 返回工单列表
  res.status(200).json({
    code: 200,
    message: 'Success',
    data: tickets
  });
}

// 导出 tickets 供其他 API 使用
export { tickets };
