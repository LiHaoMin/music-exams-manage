<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <div>
        <el-form-item label="提现状态" size="small" >
          <el-select v-model="listQuery.upperShelf" clearable  placeholder="请选择">
            <el-option label="上架" value="true"></el-option>
            <el-option label="下架" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单时间" size="small">
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
          <el-input v-model="listQuery.curriculumName" placeholder="请输入课程名称"></el-input>
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

        <el-form-item label="订单时间" size="small">
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
          <el-button type="success" @click="add">提现</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-table ref="listTable" v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
      <el-table-column type="selection" align="center" label="排序">
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
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-link :underline="false" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-link>
          <el-link :underline="false" type="info" @click="handleStatus(scope.$index, scope.row)">{{ !scope.row.upperShelf | states }}</el-link>
          <el-link :underline="false" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-link>
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
      listLoading: true,
      list: [],
      pagination: {
        num: 1,
        size: 10,
        total: 0
      },
      listQuery: {}
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
  },
  methods: {
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
  }
}
</script>
