// 本地静态数据 - 工单列表

export let tickets = [
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

// 获取工单列表
export const getTicketsData = () => {
  return {
    code: 200,
    message: 'Success',
    data: [...tickets] // 返回副本
  };
};

// 删除工单
export const deleteTicketData = (id) => {
  const index = tickets.findIndex(ticket => ticket.id === id);

  if (index === -1) {
    return {
      code: 404,
      message: 'Ticket not found'
    };
  }

  // 删除工单
  tickets.splice(index, 1);

  return {
    code: 200,
    message: 'Ticket deleted successfully'
  };
};

// 登录验证
export const loginData = (username, password) => {
  // 简单验证：用户名 admin 为管理员，其他为普通用户
  const role = username === 'admin' ? 'admin' : 'user';

  return {
    code: 200,
    message: 'Login successful',
    data: {
      username,
      role
    }
  };
};
