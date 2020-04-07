<template>
  <div>
    <el-button type="success" @click="dialogFormVisible = true">添加分类</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="加载中..."
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="排序">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
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
      @prev-click="prevClick"
      @next-click="nextClick"
      @current-change="currentChange"
      :current-page="params.num"
      :page-size="params.size"
      :total="params.total"
      :page-count="params.pages">
    </el-pagination>
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      activeName: 'first',
      list: null,
      listLoading: true,
      params: {
        num: 1,
        size: 10,
        total: 1,
        pages: 1
      },
      form: {
        name: ''
      },
      dialogFormVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    prevClick(page) {
      this.params.num = page
      this.fetchData()
    },
    nextClick(page) {
      this.params.num = page
      this.fetchData()
    },
    currentChange(page) {
      this.params.num = page
      this.fetchData()
    },
    save() {
      if (this.form.id) {
        request({
          url: '/curriculum-classification/update_classification',
          method: 'get',
          params: this.form
        }).then((res) => {
          this.dialogFormVisible = false
          this.fetchData()
          this.form = {}
        })
      } else {
        request({
          url: '/curriculum-classification/add_first_classification',
          method: 'get',
          params: this.form
        }).then((res) => {
          this.dialogFormVisible = false
          this.fetchData()
          this.form = {}
        })
      }
    },
    handleEdit(idx, row) {
      this.form = {
        id: row.id,
        name: row.name
      }
      this.dialogFormVisible = true
    },
    handleDelete(idx, row) {
      console.log(row)
    },
    fetchData() {
      this.listLoading = true
      request({
        url: '/curriculum-classification/first_class_classification',
        method: 'get',
        params: this.params
      }).then((res) => {
        this.list = res.data.records
        this.params.num = res.data.current
        this.params.total = res.data.total
        this.params.pages = res.data.pages
        this.listLoading = false
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
