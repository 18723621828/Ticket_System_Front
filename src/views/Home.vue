<template>
  <div class="home-container">
    <div class="header">
      <h1>Ticket Management System</h1>
      <div class="user-info">
        <span>Welcome, {{ user?.username }}</span>
        <a-button type="text" @click="handleLogout">Logout</a-button>
      </div>
    </div>
    
    <div class="content">
      <!-- 左侧：工单列表 -->
      <div class="left-section">
        <div class="ticket-table">
          <h2>Ticket List</h2>
          <a-table :columns="columns" :data-source="tickets" row-key="id">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'overtime'">
                <span>{{ record.overtime ? 'Yes' : 'No' }}</span>
              </template>
              <template v-if="column.key === 'actions'">
                <a-button
                  v-if="user?.role === 'admin'"
                  danger
                  @click="handleDelete(record.id)"
                >
                  Delete
                </a-button>
              </template>
            </template>
          </a-table>
        </div>
      </div>

      <!-- 右侧：图表展示 -->
      <div class="right-section">
        <div class="chart-container">
          <h2>Project Hours Distribution</h2>
          <div ref="chartRef" class="chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { message, Modal } from 'ant-design-vue';
import * as echarts from 'echarts';
import { getTickets, deleteTicket } from '../api/ticket.js';

export default {
  name: 'HomePage'
};
</script>

<script setup>

const router = useRouter();
const tickets = ref([]);
const chartRef = ref(null);
let chart = null;

// 从localStorage获取用户信息
const user = ref(JSON.parse(localStorage.getItem('user')));

// 检查用户是否已登录
if (!user.value) {
  router.push('/login');
}

// 工单表格列配置
const columns = computed(() => {
  const baseColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project'
    },
    {
      title: 'Overtime',
      dataIndex: 'overtime',
      key: 'overtime'
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours'
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at'
    }
  ];

  // 仅管理员显示 Actions 列
  if (user.value?.role === 'admin') {
    baseColumns.push({
      title: 'Actions',
      key: 'actions'
    });
  }

  return baseColumns;
});

// 计算项目工时分布
const projectHours = computed(() => {
  const hoursMap = new Map();
  
  tickets.value.forEach(ticket => {
    if (hoursMap.has(ticket.project)) {
      hoursMap.set(ticket.project, hoursMap.get(ticket.project) + ticket.hours);
    } else {
      hoursMap.set(ticket.project, ticket.hours);
    }
  });
  
  return {
    projects: Array.from(hoursMap.keys()),
    hours: Array.from(hoursMap.values())
  };
});

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value);
    updateChart();
  }
};

// 更新图表数据
const updateChart = () => {
  if (chart) {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: projectHours.value.projects,
        axisLabel: {
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        name: 'Hours'
      },
      series: [
        {
          name: 'Hours',
          type: 'bar',
          data: projectHours.value.hours,
          itemStyle: {
            color: '#1890ff'
          }
        }
      ]
    };
    
    chart.setOption(option);
  }
};

// 加载工单数据
const loadTickets = async () => {
  try {
    const response = await getTickets();

    if (response.data.code === 200) {
      tickets.value = response.data.data;
    } else {
      message.error(response.data.message || 'Failed to load tickets');
    }
  } catch (error) {
    message.error('Failed to load tickets');
    console.error('Load tickets error:', error);
  }
};

// 删除工单
const handleDelete = (id) => {
  Modal.confirm({
    title: 'Confirm Delete',
    content: 'Are you sure you want to delete this ticket? This action cannot be undone.',
    okText: 'Delete',
    okType: 'danger',
    cancelText: 'Cancel',
    async onOk() {
      try {
        const response = await deleteTicket(id);

        if (response.data.code === 200) {
          message.success('Ticket deleted successfully');
          await loadTickets();
        } else {
          message.error(response.data.message || 'Failed to delete ticket');
        }
      } catch (error) {
        message.error('Failed to delete ticket');
        console.error('Delete ticket error:', error);
      }
    }
  });
};

// 退出登录
const handleLogout = () => {
  localStorage.removeItem('user');
  router.push('/login');
};

// 监听窗口大小变化，调整图表
const handleResize = () => {
  if (chart) {
    chart.resize();
  }
};

// 监听工单数据变化，更新图表
watch(tickets, () => {
  updateChart();
}, { deep: true });

// 生命周期钩子
onMounted(() => {
  loadTickets();
  initChart();
  window.addEventListener('resize', handleResize);
});
</script>

<style scoped lang="less">
.home-container {
  min-height: 100vh;
  background-color: #f0f2f5;
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 64px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    h1 {
      margin: 0;
      font-size: 20px;
      color: #1890ff;
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }
  }
  
  .content {
    padding: 24px;
    display: flex;
    gap: 24px;

    .left-section {
      flex: 1;
      min-width: 0;
    }

    .right-section {
      flex: 1;
      min-width: 0;
    }

    .ticket-table {
      background-color: #fff;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      h2 {
        margin: 0 0 24px 0;
        font-size: 16px;
        font-weight: 600;
      }
    }

    .chart-container {
      background-color: #fff;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      height: 100%;

      h2 {
        margin: 0 0 24px 0;
        font-size: 16px;
        font-weight: 600;
      }

      .chart {
        width: 100%;
        height: 400px;
      }
    }
  }
}
</style>