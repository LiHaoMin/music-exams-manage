<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <el-row type="flex" justify="end">
          <el-button type="success" @click="add">添加轮播图</el-button>
        </el-row>
      </div>
      <div class="content">
        <el-table ref="listTable" v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
          <el-table-column type="index" align="center" label="排序">
          </el-table-column>
          <el-table-column align="center" label="名称">
            <template slot-scope="scope">
              {{ scope.row.bannerName }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="缩略图">
            <template slot-scope="scope">
              <img :src="scope.row.bannerUrl" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="说明">
            <template slot-scope="scope">
              {{ scope.row.bannerExplain }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="上传人">
            <template slot-scope="scope">
              // TODO 上传人
            </template>
          </el-table-column>
          <el-table-column align="center" label="添加时间">
            <template slot-scope="scope">
              {{ scope.row.gmtCreate | date }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-link :underline="false" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-link>
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
      }
    }
  },
  components: {
    Pagination
  },
  created() {
    this.fetchData()
  },
  filters: {
    date(data) {
      return moment(data).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    add() {
      this.$router.push({name:'SwipeEdit'})
    },
    handleEdit(idx,row) {
      this.$router.push({name:'SwipeEdit', params: {obj: row}})
    },
    handleDelete(idx,row) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/banner/update_banner',
          method: 'post',
          data: {id : row.id, isDelete: true}
        }).then((res) => {
          this.fetchData()
        })
      })
    },
    fetchData() {
      this.listLoading = true
      const queryData = {
        ...this.pagination
      }
      request({
        url: '/banner/banner_list',
        method: 'get',
        params: queryData
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
