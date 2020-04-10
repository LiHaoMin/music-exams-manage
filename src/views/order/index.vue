<template>
  <div class="app-container">
      <el-card>
        <div slot="header">
          <el-form :inline="true" class="demo-form-inline">
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
              <el-form-item size="small" label="上传人">
                <el-select v-model="listQuery.userId" clearable  placeholder="请选择">
                  <el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>

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
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="线上课程" name="online">
              <el-table ref="listTable" v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
                <el-table-column align="center" label="排序">
                  <template slot-scope="scope">
                    <span v-if="scope.row.wxWithdrawal">已提现</span>
                    <el-checkbox class="checkbox-none" :label="scope.row.id" v-else></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="订单编号">
                  <template slot-scope="scope">
                    {{ scope.row.asorderNumber }}
                  </template>
                </el-table-column>
                <el-table-column align="center" label="付款时间">
                  <template slot-scope="scope">
                    {{ scope.row | date }}
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
                    {{ scope.row | divideInto }}
                  </template>
                </el-table-column>
                <el-table-column align="center" label="上传人">
                  <template slot-scope="scope">
                    {{ scope.row.ownerName }}
                  </template>
                </el-table-column>
                <el-table-column align="center" label="提现时间">
                  <template slot-scope="scope">
                    {{ scope.row.cashWithdrawalApplyTime | date}}
                  </template>
                </el-table-column>
              </el-table>
              <el-row type="flex" justify="end">
                <pagination v-show="pagination.total > 0" :total="pagination.total" :page.sync="pagination.num" :limit.sync="pagination.size" @pagination="fetchData" />
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="线下实体课" name="offline">
              <el-table ref="listTable" v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
                <el-table-column align="center" label="排序">
                  <template slot-scope="scope">
                    <span v-if="scope.row.wxWithdrawal">已提现</span>
                    <el-checkbox class="checkbox-none" :label="scope.row.id" v-else></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="订单编号">
                  <template slot-scope="scope">
                    {{ scope.row.asorderNumber }}
                  </template>
                </el-table-column>
                <el-table-column align="center" label="付款时间">
                  <template slot-scope="scope">
                    {{ scope.row | date }}
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
                <el-table-column align="center" label="上传人">
                  <template slot-scope="scope">
                    {{ scope.row.ownerName }}
                  </template>
                </el-table-column>
                <el-table-column align="center" label="提现时间">
                  <template slot-scope="scope">
                    {{ scope.row.cashWithdrawalApplyTime | date}}
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <el-link :underline="false" type="primary" @click="handlePV(scope.$index, scope.row)">查看报名信息</el-link>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    <el-dialog title="报名信息" :visible.sync="dialogFormVisible">
      <el-row>
        <el-col :span="8">姓名：{{currentRow.name}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">学生电话：{{currentRow.telephone}}</el-col>
        <el-col :span="8">账单号：{{currentRow.orderNumber}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">本科院校：{{currentRow.school}}</el-col>
        <el-col :span="8">付款费用：{{currentRow.money}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">报考院校：{{currentRow.bkSchool}}</el-col>
        <el-col :span="8">付款时间：{{currentRow.gmtCreate | date}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">报考专业：{{currentRow.bkMajor}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">报名课程：{{currentRow.curriculumName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">联系老师：{{currentRow.teacherName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">老师电话：{{currentRow.teacherTelephone}}</el-col>
      </el-row>
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
      activeName: 'online',
      listLoading: true,
      list: [],
      pagination: {
        num: 1,
        size: 10,
        total: 0
      },
      listQuery: {
        onLine: true
      },
      userList: [],
      dialogFormVisible: false,
      currentRow: {}
    }
  },
  components: {
    Pagination
  },
  filters: {
    category(data) {
      const typeB = ['', '导师讲堂', '学长讲堂', '学员讲堂']
      const typeC = ['', '音乐', '舞蹈', '留学']
      return typeB[data.typeB] + '-' + typeC[data.typeC] + '-' + data.typeName
    },
    states(data) {
      return data ? '上架' : '下架'
    },
    date(data) {

      return data ? moment(data).format('YYYY-MM-DD HH:mm:ss') : ''
    },
    divideInto(data) {
      if (data.userType === 3) return '平台发布'
      if (data.userType === 2) return data.divideInto + '%'
    }
  },
  created() {
    this.fetchData()
    this.getUserList()
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
      if (this.activeName === 'online') {
        this.listQuery.onLine = true
      }
      if (this.activeName === 'offline') {
        this.listQuery.onLine = false
      }
      this.fetchData()
      // TODO 搜索有问题
    },
    handleClick(tab, event) {
      if (this.activeName === 'online') {
        this.listQuery.onLine = true
      }
      if (this.activeName === 'offline') {
        this.listQuery.onLine = false
      }
      this.fetchData()
    },
    handlePV(idx, row) {
      this.dialogFormVisible = true
      request({
        url: '/order/registration_information',
        method: 'get',
        params: {orderId: row.asorderNumber}
      }).then((res) => {
        this.currentRow = res.data
      })
      // 付款时间对不上
    },
    add() {
      let sc = document.querySelectorAll('.checkbox-none input[type="checkbox"]:checked')
      sc.forEach((el) => {
        console.log(el.value)
      })
      // 提现参数不明
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
    },
    getUserList() {
      request({
        url: '/user/upload_user_list',
        method: 'get'
      }).then((res) => {
        this.userList = res.data
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
