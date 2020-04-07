<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="一级分类设置" name="first">
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column align="center" label="排序">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="课程分类">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="课程数量">
            <template slot-scope="scope">
              {{ scope.row.num }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="导师讲堂分类设置" name="second">导师讲堂分类设置</el-tab-pane>
      <el-tab-pane label="学长讲堂分类设置" name="third">学长讲堂分类设置</el-tab-pane>
      <el-tab-pane label="学员讲堂分类设置" name="fourth">学员讲堂分类设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      activeName: 'first'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      let params = {
        num: 1, size: 10
      }
      request({
        url: '/curriculum-classification/first_class_classification',
        method: 'get',
        params
      }).then((res) => {
        this.list = res.data.records
        this.listLoading = false
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
