<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="注册时间" size="small">
        <el-date-picker
          v-model="listQuery.time"
          type="daterange"
          @change="dateChange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item size="small">
        <el-input v-model="listQuery.keyWord" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item size="small">
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="listTable" v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
      <el-table-column align="center" label="用户ID">
        <template slot-scope="scope">
          {{ scope.row.userId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户昵称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          {{ scope.row.telephone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="付费总额">
        <template slot-scope="scope">
          {{ scope.row.money }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单数量">
        <template slot-scope="scope">
          {{ scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上次付费时间">
        <template slot-scope="scope">
          // TODO 上次付费时间
        </template>
      </el-table-column>
      <el-table-column align="center" label="账户禁用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.userEnable"
            active-color="#ff4949"
            inactive-color="#13ce66">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-link :underline="false" type="primary" @click="handlePV(scope.$index, scope.row)">查看</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end">
      <pagination v-show="pagination.total > 0" :total="pagination.total" :page.sync="pagination.num" :limit.sync="pagination.size" @pagination="fetchData" />
    </el-row>
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
  created() {
    this.fetchData()
  },
  methods: {
    dateChange(time) {
      if (time) {
        this.listQuery.startTime = time[0]
        this.listQuery.endTime = time[1]
      } else {
        this.listQuery.startTime = null
        this.listQuery.endTime = null
      }
    },
    query() {
      this.pagination = { num: 1, size: 10 }
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      const queryData = {
        ...this.pagination,
        ...this.listQuery
      }
      request({
        url: '/user/student_list',
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
