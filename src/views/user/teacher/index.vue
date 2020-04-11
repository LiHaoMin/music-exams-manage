<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="添加时间" size="small">
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
            <el-input v-model="listQuery.keyWord" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item size="small">
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
        </el-form>
        <el-row type="flex" justify="end">
          <el-button type="success" @click="add">添加讲师</el-button>
        </el-row>
      </div>
      <div class="content">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="讲师列表" name="one">
            <el-table ref="listTable" v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
              <el-table-column align="center" label="讲师名称">
                <template slot-scope="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="讲师销量">
                <template slot-scope="scope">
                  {{ scope.row.num }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="总营收">
                <template slot-scope="scope">
                  {{ scope.row.money }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="讲师分成">
                <template slot-scope="scope">
                  {{ scope.row.divide_into }} %
                </template>
              </el-table-column>
              <el-table-column align="center" label="讲师分成后余额">
                <template slot-scope="scope">
                  {{ scope.row.balance }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="讲师账号">
                <template slot-scope="scope">
                  {{ scope.row.account }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="添加时间">
                <template slot-scope="scope">
                  {{ scope.row.gmtCreate | date }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="账户禁用">
                <template slot-scope="scope">
                  <el-switch
                    @change="userSwitch($event, scope.row)"
                    v-model="scope.row.userEnable"
                    active-color="#ff4949"
                    inactive-color="#13ce66">
                  </el-switch>
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
          </el-tab-pane>
          <el-tab-pane label="讲师视频审核" name="two">
            <el-table ref="listTable" v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
              <el-table-column align="center" label="讲师姓名">
                <template slot-scope="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="讲师账号">
                <template slot-scope="scope">
                  {{ scope.row.num }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="视频所属课程">
                <template slot-scope="scope">
                  {{ scope.row.money }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="具体章节">
                <template slot-scope="scope">
                  {{ scope.row.divide_into }} %
                </template>
              </el-table-column>
              <el-table-column align="center" label="课程视频">
                <template slot-scope="scope">
                  {{ scope.row.balance }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="状态">
                <template slot-scope="scope">
                  {{ scope.row.account }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="申请时间">
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
          </el-tab-pane>
          <el-tab-pane label="讲师提现申请" name="three">
            <el-table ref="listTable" v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
              <el-table-column align="center" label="讲师姓名">
                <template slot-scope="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="手机号">
                <template slot-scope="scope">
                  {{ scope.row.num }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="分成后余额">
                <template slot-scope="scope">
                  {{ scope.row.money }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="讲师分成">
                <template slot-scope="scope">
                  {{ scope.row.divide_into }} %
                </template>
              </el-table-column>
              <el-table-column align="center" label="本次申请提现">
                <template slot-scope="scope">
                  {{ scope.row.balance }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="讲师后台账号">
                <template slot-scope="scope">
                  {{ scope.row.account }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="申请时间">
                <template slot-scope="scope">
                  {{ scope.row.gmtCreate | date }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="选择线下打款状态">
                <template slot-scope="scope">
                  {{ scope.row.gmtCreate | date }}
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="end">
              <pagination v-show="pagination.total > 0" :total="pagination.total" :page.sync="pagination.num" :limit.sync="pagination.size" @pagination="fetchData" />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="讲师入驻申请审核" name="four">
            <el-table ref="listTable" v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit highlight-current-row>
              <el-table-column align="center" label="状态">
                <template slot-scope="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="用户昵称">
                <template slot-scope="scope">
                  {{ scope.row.num }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="真实姓名">
                <template slot-scope="scope">
                  {{ scope.row.money }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="手机号">
                <template slot-scope="scope">
                  {{ scope.row.divide_into }} %
                </template>
              </el-table-column>
              <el-table-column align="center" label="身份证照片">
                <template slot-scope="scope">
                  {{ scope.row.balance }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="身份证反面">
                <template slot-scope="scope">
                  {{ scope.row.account }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="资质证明">
                <template slot-scope="scope">
                  {{ scope.row.gmtCreate | date }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="申请时间">
                <template slot-scope="scope">
                  {{ scope.row.gmtCreate | date }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="修改状态">
                <template slot-scope="scope">
                  {{ scope.row.gmtCreate | date }}
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="end">
              <pagination v-show="pagination.total > 0" :total="pagination.total" :page.sync="pagination.num" :limit.sync="pagination.size" @pagination="fetchData" />
            </el-row>
          </el-tab-pane>
        </el-tabs>
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
      activeName: 'one',
      listLoading: true,
      list: [],
      listQuery: {},
      pagination: {
        num: 1,
        size: 10,
        total: 0
      },
    }
  },
  filters: {
    date(data) {
      return moment(data).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  components: {
    Pagination
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
    add() {
      this.$router.push({name: 'TeacherEdit'})
    },
    query() {
      this.pagination = { num: 1, size: 10 }
      this.fetchData()
    },
    handleClick(tab, event) {
      // TODO tab切换
    },
    handleEdit(idx,row) {
      // TODO 编辑
    },
    handleDelete(idx,row) {
      // TODO 删除
    },
    userSwitch(ev, row) {
      // TODO 禁用
      // request({
      //   url: '/user/update_user_content',
      //   method: 'post',
      //   data: {userEnable: ev, id: row.userId}
      // }).then((res) => {
      //   this.fetchData()
      // })
    },
    fetchData() {
      this.listLoading = true
      const queryData = {
        ...this.pagination,
        ...this.listQuery
      }
      request({
        url: '/user/teacher_list',
        method: 'post',
        data: queryData
      }).then((res) => {
        this.list = res.data.records
        this.pagination.total = res.data.total
        this.listLoading = false
      })
      // TODO 查询接口错误 ？？ 搜索条件是否公用tab
    },
  }
}
</script>
