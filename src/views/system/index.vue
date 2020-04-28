<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <el-row type="flex" justify="end">
          <el-button type="success" @click="add">添加账号</el-button>
        </el-row>
      </div>
      <div class="content">
        <el-table ref="listTable" v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
          <el-table-column type="index" align="center" label="序号">
          </el-table-column>
          <el-table-column align="center" label="账号">
            <template slot-scope="scope">
              {{ scope.row.account }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="密码">
            <template slot-scope="scope">
              ********
            </template>
          </el-table-column>
          <el-table-column align="center" label="手机号">
            <template slot-scope="scope">
              {{ scope.row.telephone }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="管理员姓名">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="管理模块">
            <template slot-scope="scope">
              {{ scope.row.adminType | adminType }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-link :underline="false" v-if="scope.row.account !== 'admin'" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-link>
              <el-link :underline="false" v-if="scope.row.account !== 'admin'" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from '@/utils/request'
import moment from "moment";

export default {
  data() {
    return {
      listLoading: true,
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  filters: {
    adminType(data) {
      const lst = ['', '首页', '课程管理', '账单管理', '用户管理', '轮播图', '客服管理', '系统设置']
      if (data) {
        data = JSON.parse(data)
        if (data.length == lst.length - 1) return '全模块'
        let str = ''
        data.forEach((el) => {
          str += ',' + lst[el]
        })
        return str.substring(1)
      }
      return ''
    }
  },
  methods: {
    add() {
      this.$router.push({name:'AdminEdit'})
    },
    handleEdit(idx,row) {
      this.$router.push({name:'AdminEdit', params: {id: row.userId}})
    },
    handleDelete(idx,row) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/user/update_user_content',
          method: 'post',
          data: { id: row.userId, isDelete: true}
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
        url: '/user/admin_list',
        method: 'get',
      }).then((res) => {
        this.list = res.data
        this.listLoading = false
      })
    },
  }
}
</script>
