<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <el-form :inline="true" class="demo-form-inline" label-width="100px">
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
                @change="dateChange"
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
            <el-form-item size="small" label="分类">
              <el-select v-model="listQuery.typeA" clearable  placeholder="请选择">
                <el-option label="音乐考研" value="51"></el-option>
                <el-option label="舞蹈考研" value="52"></el-option>
                <el-option label="音乐留学" value="53"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item size="small">
              <el-button type="success" @click="add">添加实体课</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="content">
        <el-table ref="listTable" v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
          <el-table-column align="center" label="分类">
            <template slot-scope="scope">
              {{ scope.row.classificationtringName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="实体课">
            <template slot-scope="scope">
              {{ scope.row.curriculumName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="封面">
            <template slot-scope="scope">
              <img :src="scope.row.curriculumImg">
            </template>
          </el-table-column>
          <el-table-column align="center" label="描述">
            <template slot-scope="scope">
              {{ scope.row.briefIntroduction }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="添加时间">
            <template slot-scope="scope">
              {{ scope.row.gmtCreate | date}}
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
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              {{ scope.row.upperShelf | states }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-link :underline="false" type="primary" @click="handleEdit(scope.$index, scope.row)">{{ scope.row.upperShelf ? '查看' : '编辑' }}</el-link>
              <el-link :underline="false" type="info" @click="handleStatus(scope.$index, scope.row)">{{ !scope.row.upperShelf | states }}</el-link>
              <el-link :underline="false" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-link>
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
        typeC: null,
        onLine: false
      }
    }
  },
  components: {
    Pagination
  },
  filters: {
    category(data) {
      const typeC = ['', '音乐考研', '舞蹈考研', '留学考研']
      return typeC[data]
    },
    states(data) {
      return data ? '上架' : '下架'
    },
    date(data) {
      return moment(data).format('YYYY-MM-DD HH:mm:ss')
    }
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
    handleEdit(idx, row) {
      this.$router.push({ name: 'offlineEdit', query: { id: row.id, upperShelf: row.upperShelf }})
    },
    add() {
      this.$router.push({ name: 'offlineEdit'})
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
  }
}
</script>

<style scoped>
  .app-container >>> .el-table__row  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    object-position: center;
  }
</style>
