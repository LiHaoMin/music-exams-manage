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
                    active-color="#13ce66"
                    inactive-color="#ff4949">
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
            <el-table ref="listTable" v-loading="listLoading2" :data="list2" element-loading-text="加载中..." border fit highlight-current-row>
              <el-table-column align="center" label="讲师姓名">
                <template slot-scope="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="讲师账号">
                <template slot-scope="scope">
                  {{ scope.row.account }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="视频所属课程">
                <template slot-scope="scope">
                  {{ scope.row.money }} // TODO 视频所属课程
                </template>
              </el-table-column>
              <el-table-column align="center" label="具体章节">
                <template slot-scope="scope">
                  {{ scope.row.videoPosition }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="课程封面">
                <template slot-scope="scope">
                  <img :src="scope.row.curriculumImg" />
                </template>
              </el-table-column>
              <el-table-column align="center" label="状态">
                <template slot-scope="scope">
                  {{ scope.row.type | type }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="申请时间">
                <template slot-scope="scope">
                  {{ scope.row.gmtCreate | date }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-link :underline="false" type="primary" @click="handleTongGuo(scope.$index, scope.row)" v-if="scope.row.type === 1 || scope.row.type === 2">通过</el-link>
                  <el-link :underline="false" type="primary" @click="handleShangjia(scope.$index, scope.row)" v-if="scope.row.type === 4">上架</el-link>
                  <el-link :underline="false" type="danger" @click="handleJujue(scope.$index, scope.row)" v-if="scope.row.type === 1">拒绝</el-link>
                  <el-link :underline="false" type="danger" @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.type === 2 || scope.row.type === 4">删除</el-link>
                  <el-link :underline="false" type="danger" @click="handleXiajia(scope.$index, scope.row)" v-if="scope.row.type === 3">下架</el-link>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="end">
              <pagination v-show="pagination.total > 0" :total="pagination.total" :page.sync="pagination.num" :limit.sync="pagination.size" @pagination="fetchData" />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="讲师提现申请" name="three">
            <el-table ref="listTable" v-loading="listLoading3" :data="list3" element-loading-text="加载中..." border fit highlight-current-row>
              <el-table-column align="center" label="讲师姓名">
                <template slot-scope="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="手机号">
                <template slot-scope="scope">
                  {{ scope.row.telephone }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="分成后余额">
                <template slot-scope="scope">
                  {{ scope.row.balance }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="讲师分成">
                <template slot-scope="scope">
                  {{ scope.row.divideInto }} %
                </template>
              </el-table-column>
              <el-table-column align="center" label="本次申请提现">
                <template slot-scope="scope">
                  {{ scope.row.money }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="讲师后台账号">
                <template slot-scope="scope">
                  {{ scope.row.account }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="申请时间">
                <template slot-scope="scope">
                  {{ scope.row.cashWithdrawalApplyTime | date }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="选择线下打款状态">
                <template slot-scope="scope">
                  <el-link :underline="false" type="primary" v-if="!scope.row.cashWithdrawalTime">已付款</el-link>
                  <el-link :underline="false" type="danger" @click="handlePay(scope.$index, scope.row)" v-else>未付款</el-link>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="end">
              <pagination v-show="pagination.total > 0" :total="pagination.total" :page.sync="pagination.num" :limit.sync="pagination.size" @pagination="fetchData" />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="讲师入驻申请审核" name="four">
            <el-table ref="listTable" v-loading="listLoading4" :data="list4" element-loading-text="加载中..." border fit highlight-current-row>
              <el-table-column align="center" label="状态">
                <template slot-scope="scope">
                  {{ scope.row.lecturerType | lecturerType }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="用户昵称">
                <template slot-scope="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="真实姓名">
                <template slot-scope="scope">
                  {{ scope.row.lecturerName }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="手机号">
                <template slot-scope="scope">
                  {{ scope.row.telephone }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="身份证照片">
                <template slot-scope="scope">
                  <img :src="scope.row.identityImgZ" />
                </template>
              </el-table-column>
              <el-table-column align="center" label="身份证反面">
                <template slot-scope="scope">
                  <img :src="scope.row.identityImgF" />
                </template>
              </el-table-column>
              <el-table-column align="center" label="资质证明">
                <template slot-scope="scope">
                  <img :src="scope.row.certificate" />
                </template>
              </el-table-column>
              <el-table-column align="center" label="申请时间">
                <template slot-scope="scope">
                  {{ scope.row.gmtCreate | date }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="修改状态">
                <template slot-scope="scope">
                  <el-link :underline="false" type="primary" @click="handleTongGuo(scope.$index, scope.row)" v-if="scope.row.lecturerType === 1">通过</el-link>
                  <el-link :underline="false" type="danger" @click="handleJujue(scope.$index, scope.row)" v-if="scope.row.lecturerType === 1">拒绝</el-link>
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
      listLoading2: true,
      list2: [],
      listLoading3: true,
      list3: [],
      listLoading4: true,
      list4: [],
    }
  },
  filters: {
    date(data) {
      return moment(data).format('YYYY-MM-DD HH:mm:ss')
    },
    type(data) {
      const list = ['', '待审核', '审核不通过', '已上架', '已下架']
      return list[data]
    },
    lecturerType(data) {
      const list = ['', '待审批', '通过', '拒绝']
      return list[data]
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
      if (this.activeName === 'one') {
        this.fetchData()
      }
      if (this.activeName === 'two') {
        this.fetchData2()
      }
      if (this.activeName === 'three') {
        this.fetchData3()
      }
      if (this.activeName === 'four') {
        this.fetchData4()
      }
    },
    handleClick(tab, event) {
      this.pagination = { num: 1, size: 10 }
      if (this.activeName === 'one') {
        this.fetchData()
      }
      if (this.activeName === 'two') {
        this.fetchData2()
      }
      if (this.activeName === 'three') {
        this.fetchData3()
      }
      if (this.activeName === 'four') {
        this.fetchData4()
      }
    },
    handleEdit(idx,row) {
      // TODO 编辑
      this.$router.push({name: 'TeacherEdit', params: {id:row.id}})
    },
    handleDelete(idx,row) {
      if (this.activeName === 'two') {
        request({
          url: '/video',
          method: 'post',
          data: [{
            id: row.id,
            isDelete: true
          }]
        }).then((res) => {
          this.fetchData2()
        })
      }
      if (this.activeName === 'one') {
        request({
          url: '/lecturer/update_lecturer',
          method: 'post',
          data: {
            mLecturer: {
              id: row.lecturerId
            },
            mUserInfo: {
              id: row.id,
              isDelete: true
            }
          }
        }).then((res) => {
          this.fetchData()
        })
      }
    },
    handleTongGuo(idx,row) {
      if (this.activeName === 'two') {
        request({
          url: '/video',
          method: 'post',
          data: [{
            id: row.id,
            type: 3
          }]
        }).then((res) => {
          this.fetchData2()
        })
      }
      if (this.activeName === 'four') {
        request({
          url: '/lecturer/update_lecturer',
          method: 'post',
          data: {
            mLecturer: {
              id: row.lecturerId,
              lecturerType: 2
            },
            mUserInfo: {
              id: row.userId
            }
          }
        }).then((res) => {
          this.fetchData4()
        })
      }
    },
    handleShangjia(idx,row) {
      if (this.activeName === 'two') {
        request({
          url: '/video',
          method: 'post',
          data: [{
            id: row.id,
            type: 3
          }]
        }).then((res) => {
          this.fetchData2()
        })
      }
    },
    handleXiajia(idx,row) {
      if (this.activeName === 'two') {
        request({
          url: '/video',
          method: 'post',
          data: [{
            id: row.id,
            type: 4
          }]
        }).then((res) => {
          this.fetchData2()
        })
      }
    },
    handleJujue(idx,row) {
      if (this.activeName === 'two') {
        request({
          url: '/video',
          method: 'post',
          data: [{
            id: row.id,
            type: 2
          }]
        }).then((res) => {
          this.fetchData2()
        })
      }
      if (this.activeName === 'four') {
        request({
          url: '/lecturer/update_lecturer',
          method: 'post',
          data: {
            mLecturer: {
              id: row.lecturerId,
              lecturerType: 3
            },
            mUserInfo: {
              id: row.userId
            }
          }
        }).then((res) => {
          this.fetchData4()
        })
      }
    },
    handlePay(idx,row) {
      // TODO handlePay
      const dataList = [{
        id: row.id,
        ownerId: row.ownerId,
        money: row.money
      }]
      request({
        url: '/order/cash_withdrawal',
        method: 'post',
        data: dataList
      }).then((res) => {
        this.fetchData3()
      })
    },
    userSwitch(ev, row) {
      request({
        url: '/lecturer/update_lecturer',
        method: 'post',
        data: {
          mLecturer: {
            id: row.lecturerId
          },
          mUserInfo: {
            id: row.id,
            userEnable: row.userEnable
          }
        }
      }).then((res) => {
        this.fetchData()
      })
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
    fetchData2() {
      this.listLoading2 = true
      const queryData = {
        ...this.pagination,
        ...this.listQuery
      }
      request({
        url: '/video/teacher_list',
        method: 'post',
        data: queryData
      }).then((res) => {
        this.list2 = res.data.records
        this.pagination.total = res.data.total
        this.listLoading2 = false
      })
      // TODO 查询接口错误 ？？ 搜索条件是否公用tab
    },
    fetchData3() {
      this.listLoading3 = true
      const queryData = {
        ...this.pagination,
        ...this.listQuery
      }
      request({
        url: '/order',
        method: 'post',
        data: queryData
      }).then((res) => {
        this.list3 = res.data.records
        this.pagination.total = res.data.total
        this.listLoading3 = false
      })
      // TODO 查询接口错误 ？？ 搜索条件是否公用tab
    },
    fetchData4() {
      this.listLoading4 = true
      const queryData = {
        ...this.pagination,
        ...this.listQuery
      }
      request({
        url: '/user/lecturer_check_ln_list',
        method: 'post',
        data: queryData
      }).then((res) => {
        this.list4 = res.data.records
        this.pagination.total = res.data.total
        this.listLoading4 = false
      })
      // TODO 查询接口错误 ？？ 搜索条件是否公用tab
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
