<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <div>
        <el-form-item label="上架状态" size="small" >
          <el-select v-model="listQuery.upperShelf" clearable  placeholder="请选择">
            <el-option label="上架" value="true"></el-option>
            <el-option label="下架" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传时间" size="small">
          <el-date-picker
            v-model="listQuery.time"
            type="daterange"
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
        <el-form-item size="small" label="一级分类">
          <el-select v-model="listQuery.typeA" clearable  placeholder="请选择">
            <el-option v-for="item in firstList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="讲堂分类">
          <el-select v-model="listQuery.typeB" clearable  placeholder="请选择">
            <el-option v-for="item in typeB" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small">
          <el-button type="success" @click="recommend">设为推荐</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-table ref="listTable" v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
      <el-table-column type="selection" align="center" label="排序" show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column align="center" label="一级分类">
        <template slot-scope="scope">
          {{ scope.row.classificationtringName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="讲堂分类">
        <template slot-scope="scope">
          {{ scope.row | category }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称">
        <template slot-scope="scope">
          {{ scope.row.curriculumName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上架状态">
        <template slot-scope="scope">
          {{ scope.row.upperShelf | states }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格">
        <template slot-scope="scope">
          {{ scope.row.money }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="销量">
        <template slot-scope="scope">
          {{ scope.row.salesVolume }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上传人">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上传时间">
        <template slot-scope="scope">
          {{ scope.row.gmtCreate | date}}
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
    <pagination v-show="pagination.total > 0" :total="pagination.total" :page.sync="pagination.num" :limit.sync="pagination.size" @pagination="fetchData" />
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
      listQuery: {
        upperShelf: null,
        time: null,
        curriculumName: null,
        userId: null,
        typeA: null,
        typeB: null,
        onLine: true
      },
      typeB: [
        { name: '导师讲堂', value: 1 },
        { name: '学长讲堂', value: 2 },
        { name: '学员讲堂', value: 3 }
      ],
      userList: [],
      firstList: []
    }
  },
  filters: {
    category(data) {
      const typeB = ['', '导师讲堂', '学长讲堂', '学员讲堂']
      const typeC = ['', '音乐', '舞蹈', '留学']
      return typeB[data.typeB] + '-' + typeC[data.typeC] + '-' + data.classificationtringName
    },
    states(data) {
      return data ? '上架' : '下架'
    },
    date(data) {
      return moment(data).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  components: {
    Pagination
  },
  created() {
    this.fetchData()
    this.getUserList()
    this.getFirstList()
  },
  methods: {
    query() {
      this.pagination = { num: 1, size: 10 }
      if (this.listQuery.time) {
        this.listQuery.startTime = this.listQuery.time[0]
        this.listQuery.endTime = this.listQuery.time[1]
      }
      this.fetchData()
    },
    recommend() {
      const selectionData = this.$refs.listTable.selection
      if (selectionData.length < 1) {
        this.$message({
          type: 'info',
          message: '未选中行'
        })
        return
      }
      // FIXME 批量修改推荐
      selectionData.forEach((el) => {
        request({
          url: '/curriculum/update_curriculum',
          method: 'post',
          data: { id: el.id, recommend: true }
        }).then((res) => {
        })
      })
    },
    handleEdit(idx, row) {
      // TODO 编辑
    },
    handleStatus(idx, row) {
      request({
        url: '/curriculum/update_curriculum',
        method: 'post',
        data: {
          id: row.id,
          upperShelf: !row.upperShelf
        }
      }).then((res) => {
        this.pagination = { num: 1, size: 10 }
        this.fetchData()
      })
    },
    handleDelete(idx, row) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/curriculum/update_curriculum',
          method: 'post',
          data: {
            id: row.id,
            isDelete: true
          }
        }).then((res) => {
          this.pagination = { num: 1, size: 10 }
          this.fetchData()
        })
      })
    },
    fetchData() {
      this.listLoading = true
      const queryData = {
        ...this.pagination,
        ...this.listQuery
      }
      request({
        url: '/curriculum/curriculum_list',
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
    },
    getFirstList() {
      request({
        url: '/curriculum-classification/first_class_classification',
        method: 'get',
        params: {
          num: 1,
          size: 100000
        }
      }).then((res) => {
        this.firstList = res.data.records
      })
    }
  }
}
</script>
