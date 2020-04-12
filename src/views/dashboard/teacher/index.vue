<template>
  <div class="dashboard-editor-container">

    <el-row style="margin-bottom:32px;">
      <panel-group @handleSetLineChartData="handleSetLineChartData" />
    </el-row>

    <el-row style="margin-bottom:32px;">
      <panel-group2 @handleSetLineChartData="handleSetLineChartData" />
    </el-row>

    <el-row style="margin-bottom:32px;">
      <el-card>
        <div slot="header">
          营收统计
          <el-row>
            <el-col :span="3" :offset="3">本月订单总数：{{monthTotal}}</el-col>
            <el-col :span="3" :offset="1">本月订单总额：￥{{monthAmount}}</el-col>
          </el-row>
        </div>
        <line-chart :chart-data="lineChartData" />
      </el-card>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import PanelGroup2 from './components/PanelGroup2'
import LineChart from './components/LineChart'
import request from '@/utils/request'
import moment from 'moment'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardTeacher',
  components: {
    PanelGroup,
    PanelGroup2,
    LineChart
  },
  data() {
    return {
      lineChartData: {
        expectedData: [],
        actualData: []
      },
      orderList: []
    }
  },
  computed: {
    monthTotal() {
      return this.orderList.length
    },
    monthAmount() {
      var sum = 0
      this.orderList.forEach((item) => {
        sum += item.money
      })
      return sum
    }
  },
  created() {
    request({
      url: '/order/teacher_month_order_list',
      method: 'get',
      params: {
        time: new Date().getTime()
      }
    }).then((res) => {
      if (!res.data) return
      var chartData = {}
      this.orderList = res.data
      this.orderList.forEach((item) => {
        var day = moment(item.time).format('MM-DD')
        if (chartData[day]) {
          chartData[day] += item.money
        } else {
          chartData[day] = item.money
        }
      })
      Object.keys(chartData).forEach((item) => {
        this.lineChartData.expectedData.push(chartData[item])
        this.lineChartData.actualData.push(item)
      })
    })
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
