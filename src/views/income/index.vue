<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <el-form :inline="true" class="demo-form-inline" label-width="100px">
          <div>
            <el-form-item label="提现状态" size="small" >
              <el-select v-model="listQuery.cashWithdrawal" clearable  placeholder="请选择">
                <el-option label="已提现" value="true"></el-option>
                <el-option label="未提现" value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单时间" size="small">
              <el-date-picker
                v-model="listQuery.time1"
                type="daterange"
                @change="dateChange1"
                value-format="timestamp"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item size="small">
              <el-input v-model="listQuery.curriculumName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item size="small">
              <el-button type="primary" @click="query">查询</el-button>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="提现时间" size="small">
              <el-date-picker
                v-model="listQuery.time2"
                type="daterange"
                @change="dateChange2"
                value-format="timestamp"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item size="small">
              <el-button type="success" @click="add">提现</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="content">
        <el-table ref="listTable" v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
          <el-table-column align="center" label="排序">
            <template slot-scope="scope">
              <span v-if="scope.row.cashWithdrawalTime">已提现</span>
              <el-checkbox class="checkbox-none" :label="scope.$index" v-else></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column align="center" label="订单编号">
            <template slot-scope="scope">
              {{ scope.row.asorderNumber }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="付款时间">
            <template slot-scope="scope">
              {{ scope.row.gmtCreate | date }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="课程分类">
            <template slot-scope="scope">
              {{ scope.row.classificationType | classificationType}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="购买课程">
            <template slot-scope="scope">
              {{ scope.row.curriculumName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="购买昵称">
            <template slot-scope="scope">
              {{ scope.row.userName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="已付费">
            <template slot-scope="scope">
              {{ scope.row.money }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="讲师分成">
            <template slot-scope="scope">
              {{ scope.row.divideInto }} %
            </template>
          </el-table-column>
          <el-table-column align="center" label="上传人">
            <template slot-scope="scope">
              {{ scope.row.ownerName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="打款时间">
            <template slot-scope="scope">
              {{ scope.row.cashWithdrawalTime | date }}
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
          <pagination v-show="pagination.total > 0" :total="pagination.total" :page.sync="pagination.num" :limit.sync="pagination.size" @pagination="fetchData" />
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>

import request from '@/utils/request'
import Pagination from '@/components/Pagination'
import moment from 'moment'

export default {
  data() {
    return {
      listQuery: {},
      listLoading: true,
      list: [],
      pagination: {
        num: 1,
        size: 10,
        total: 0
      }
    }
  },
  components: {
    Pagination
  },
  filters: {
    date(data) {

      return data ? moment(data).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    classificationType(data) {
      if (data) {
        return data == 1 || data == 2 ? '线上课程' : '线下课程'
      }
      return ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    dateChange1(time) {
      if (time) {
        this.listQuery.startTime = time[0]
        this.listQuery.endTime = time[1]
      } else {
        this.listQuery.startTime = null
        this.listQuery.endTime = null
      }
    },
    dateChange2(time) {
      if (time) {
        this.listQuery.cashWithdrawalStartTime = time[0]
        this.listQuery.cashWithdrawalEndTime = time[1]
      } else {
        this.listQuery.cashWithdrawalStartTime = null
        this.listQuery.cashWithdrawalEndTime = null
      }
    },
    query() {
      this.pagination = { num: 1, size: 10 }
      this.fetchData()
      // TODO 搜索有问题
    },
    add() {
      let sc = document.querySelectorAll('.checkbox-none input[type="checkbox"]:checked')
      if (!sc || sc.length < 1) {
        this.$message({
          type: 'info',
          message: '未选中行'
        })
        return
      }
      var dataList = []
      sc.forEach((el) => {
        var item = this.list[el.value]
        dataList.push({
          id: item.id
        })
      })
      // TODO 提现参数不明
      request({
        url: '/order/ls_sqtx',
        method: 'post',
        data: dataList
      }).then((res) => {
        this.fetchData()
      })
    },
    fetchData() {
      this.listLoading = true
      const queryData = {
        ...this.pagination,
        ...this.listQuery
      }
      request({
        url: '/order/order_content_list',
        method: 'post',
        data: queryData
      }).then((res) => {
        this.list = res.data.records
        this.pagination.total = res.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
  .checkbox-none >>>  .el-checkbox__label {
    display: none;
  }
</style>
