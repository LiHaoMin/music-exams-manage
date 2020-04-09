<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-row :gutter="20">
          <el-col :span="8">
            <h3>音乐分类</h3>
          </el-col>
          <el-col :span="8" :offset="8">
            <el-button type="success" @click="handleAdd(1)">添加分类</el-button>
          </el-col>
        </el-row>
        <el-table v-loading="listLoading1" :data="list1" element-loading-text="加载中..." border fit highlight-current-row>
          <el-table-column align="center" label="排序">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="课程分类">
            <template slot-scope="scope">
              {{ scope.row.classificationName }}
            </template>
          </el-table-column>
          <el-table-column align="left" label="操作">
            <template slot-scope="scope">
              <el-link :underline="false" type="primary" @click="handleEdit(scope.$index, scope.row, 1)">编辑</el-link>
              <el-link :underline="false" type="danger" @click="handleDelete(scope.$index, scope.row, 1)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="20">
          <el-col :span="8">
            <h3>舞蹈分类</h3>
          </el-col>
          <el-col :span="8" :offset="8">
            <el-button type="success" @click="handleAdd(2)">添加分类</el-button>
          </el-col>
        </el-row>
        <el-table v-loading="listLoading2" :data="list2" element-loading-text="加载中..." border fit highlight-current-row>
          <el-table-column align="center" label="排序">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="课程分类">
            <template slot-scope="scope">
              {{ scope.row.classificationName }}
            </template>
          </el-table-column>
          <el-table-column align="left" label="操作">
            <template slot-scope="scope">
              <el-link :underline="false" type="primary" @click="handleEdit(scope.$index, scope.row, 2)">编辑</el-link>
              <el-link :underline="false" type="danger" @click="handleDelete(scope.$index, scope.row, 2)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="20">
          <el-col :span="8">
            <h3>留学分类</h3>
          </el-col>
          <el-col :span="8" :offset="8">
            <el-button type="success" @click="handleAdd(3)">添加分类</el-button>
          </el-col>
        </el-row>
        <el-table v-loading="listLoading3" :data="list3" element-loading-text="加载中..." border fit highlight-current-row>
          <el-table-column align="center" label="排序">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="课程分类">
            <template slot-scope="scope">
              {{ scope.row.classificationName }}
            </template>
          </el-table-column>
          <el-table-column align="left" label="操作">
            <template slot-scope="scope">
              <el-link :underline="false" type="primary" @click="handleEdit(scope.$index, scope.row, 3)">编辑</el-link>
              <el-link :underline="false" type="danger" @click="handleDelete(scope.$index, scope.row, 3)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
      list1: null,
      listLoading1: true,
      list2: null,
      listLoading2: true,
      list3: null,
      listLoading3: true,
      form: {},
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      // type1:1导师 2学长 3学员
      type1: 3,
      // type2:1音乐 2舞蹈 3留学
      type2: 1
    }
  },
  created() {
    this.fetchData1()
    this.fetchData2()
    this.fetchData3()
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
              switch (this.type2) {
                case 1:
                  this.fetchData1()
                  break
                case 2:
                  this.fetchData2()
                  break
                case 3:
                  this.fetchData3()
                  break
              }
            })
          } else {
            request({
              url: '/curriculum-classification/add_classroom_type',
              method: 'get',
              params: {
                ClassroomType: this.type1,
                ClassroomOsType: this.type2,
                name: this.form.name
              }
            }).then((res) => {
              this.dialogFormVisible = false
              switch (this.type2) {
                case 1:
                  this.fetchData1()
                  break
                case 2:
                  this.fetchData2()
                  break
                case 3:
                  this.fetchData3()
                  break
              }
            })
          }
        }
      })
    },
    handleAdd(type2) {
      this.form = {}
      this.type2 = type2
      this.dialogFormVisible = true
    },
    handleEdit(idx, row, type2) {
      this.form = {
        id: row.id,
        name: row.classificationName
      }
      this.type2 = type2
      this.dialogFormVisible = true
    },
    handleDelete(idx, row, type2) {
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
          switch (type2) {
            case 1:
              this.fetchData1()
              break
            case 2:
              this.fetchData2()
              break
            case 3:
              this.fetchData3()
              break
          }
        })
      })
    },
    fetchData1() {
      this.listLoading1 = true
      // type1:1导师 2学长 3学员
      // type2:1音乐 2舞蹈 3留学
      request({
        url: '/curriculum-classification/curriculum_classification_fost_list',
        method: 'get',
        params: {
          type1: this.type1,
          type2: 1
        }
      }).then((res) => {
        this.list1 = res.data
        this.listLoading1 = false
      })
    },
    fetchData2() {
      this.listLoading2 = true
      // type1:1导师 2学长 3学员
      // type2:1音乐 2舞蹈 3留学
      request({
        url: '/curriculum-classification/curriculum_classification_fost_list',
        method: 'get',
        params: {
          type1: this.type1,
          type2: 2
        }
      }).then((res) => {
        this.list2 = res.data
        this.listLoading2 = false
      })
    },
    fetchData3() {
      this.listLoading3 = true
      // type1:1导师 2学长 3学员
      // type2:1音乐 2舞蹈 3留学
      request({
        url: '/curriculum-classification/curriculum_classification_fost_list',
        method: 'get',
        params: {
          type1: this.type1,
          type2: 3
        }
      }).then((res) => {
        this.list3 = res.data
        this.listLoading3 = false
      })
    }
  }
}
</script>
