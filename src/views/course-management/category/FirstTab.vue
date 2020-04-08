<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="success" @click="handleAdd">添加分类</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
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
          <el-link :underline="false" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-link>
          <el-link :underline="false" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="pagination.total > 0" :total="pagination.total" :page.sync="pagination.num" :limit.sync="pagination.size" @pagination="fetchData" />
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="分类名称" prop="name">
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
import Pagination from '@/components/Pagination'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      pagination: {
        num: 1,
        size: 10,
        total: 0
      },
      form: {},
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  components: {
    Pagination
  },
  methods: {
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.id) {
            request({
              url: '/curriculum-classification/update_classification',
              method: 'get',
              params: this.form
            }).then((res) => {
              this.dialogFormVisible = false
              this.fetchData()
            })
          } else {
            request({
              url: '/curriculum-classification/add_first_classification',
              method: 'get',
              params: this.form
            }).then((res) => {
              this.dialogFormVisible = false
              this.fetchData()
            })
          }
        }
      })
    },
    handleAdd() {
      this.form = {}
      this.dialogFormVisible = true
    },
    handleEdit(idx, row) {
      this.form = {
        id: row.id,
        name: row.name
      }
      this.dialogFormVisible = true
    },
    handleDelete(idx, row) {
      request({
        url: '/curriculum-classification/delete_classification',
        method: 'get',
        params: {
          id: row.id
        }
      }).then((res) => {
        this.fetchData()
      })
    },
    fetchData() {
      this.listLoading = true
      request({
        url: '/curriculum-classification/first_class_classification',
        method: 'get',
        params: this.pagination
      }).then((res) => {
        this.list = res.data.records
        this.pagination.total = res.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
