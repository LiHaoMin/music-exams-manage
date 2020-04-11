<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
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
      </div>
      <div class="content">
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
                @change="userSwitch($event, scope.row)"
                v-model="scope.row.userEnable"
                active-color="#13ce66"
                inactive-color="#ff4949">
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
    </el-card>
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-row>
        <el-col :span="8">用户ID：{{currentRow.userId}}</el-col>
        <el-col :span="8">用户昵称：{{currentRow.name}}</el-col>
        <el-col :span="8">手机号：{{currentRow.telephone}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">订单数量：{{currentRow.num}}</el-col>
        <el-col :span="8">付费总额：{{currentRow.money}}</el-col>
        <el-col :span="8">上次付费时间：// TODO 上次付费时间</el-col>
      </el-row>
      <el-table v-loading="detailListLoading" :data="detailList" element-loading-text="加载中..." stripe>
        <el-table-column align="center" label="课程分类">
          <template slot-scope="scope">
            {{ scope.row.classificationName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="名称">
          <template slot-scope="scope">
            {{ scope.row.curriculumName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="价格">
          <template slot-scope="scope">
            {{ scope.row.money }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="上传人">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="付费时间">
          <template slot-scope="scope">
            {{ scope.row.gmtCreate | date }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
import Pagination from '@/components/Pagination'
import moment from 'moment'

export default {
  data() {
    return {
      dialogFormVisible: false,
      listQuery: {},
      listLoading: true,
      list: [],
      detailListLoading: true,
      detailList: [],
      pagination: {
        num: 1,
        size: 10,
        total: 0
      },
      currentRow: {}
    }
  },
  filters: {
    date(data) {
      return moment(data).format('YYYY-MM-DD HH:mm:ss')
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
    handlePV(idx, row) {
      this.currentRow = row
      this.detailList = []
      this.fetchDataDetail(row.userId)
      this.dialogFormVisible = true
    },
    userSwitch(ev, row) {
      request({
        url: '/user/update_user_content',
        method: 'post',
        data: {userEnable: ev, id: row.userId}
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
        url: '/user/student_list',
        method: 'post',
        data: queryData
      }).then((res) => {
        this.list = res.data.records
        this.pagination.total = res.data.total
        this.listLoading = false
      })
    },
    fetchDataDetail(id) {
      this.detailListLoading = true
      request({
        url: '/order/user_order_list',
        method: 'get',
        params: { userId: id }
      }).then((res) => {
        this.detailList = res.data
        this.detailListLoading = false
      })
    }
  }
}
</script>
