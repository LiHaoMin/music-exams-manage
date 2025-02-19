<template>
  <div class="app-container">
    <el-row type="flex" class="row-bg" justify="end">
      <el-col :span="3">
        <el-button type="success" @click="handleAdd">添加分类</el-button>
      </el-col>
    </el-row>
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

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      pagination: {
        num: 1,
        size: 100000,
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
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/curriculum-classification/delete_classification',
          method: 'get',
          params: {
            id: row.id
          }
        }).then((res) => {
          this.fetchData()
        })
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
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
       margin-bottom: 0;
     }
  }
</style>
