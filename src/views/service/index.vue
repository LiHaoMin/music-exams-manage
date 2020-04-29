<template>
  <div class="app-container">
    <el-card>
      <div slot="header">
        <el-row type="flex" justify="end">
          <el-button type="success" @click="add">欢迎语设置</el-button>
        </el-row>
      </div>
      <div class="content">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="机器人客服" name="robot">
            <el-row type="flex" justify="end">
              <el-button type="success" @click="addRobot">添加</el-button>
            </el-row>
            <el-table v-loading="robotListLoading" :data="robotList" element-loading-text="加载中..." stripe>
              <el-table-column type="index" align="center" label="序号"></el-table-column>
              <el-table-column align="center" label="问题关键词/句">
                <template slot-scope="scope">
                  {{ scope.row.keyWord }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="回答">
                <template slot-scope="scope">
                  {{ scope.row.answer }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-link :underline="false" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-link>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="人工客服" name="artificial">
            <div class="chat-box">
              <div class="chat-warp">
                <div class="chat-list">
                  <ul>
                    <li :key="index" v-for="(item, index) in userProblemList" @click="userClick(item)">
                      <div class="user" :class="{'active': item.active}">
                        <div>
                          <img :src="item.head_portrait ? item.head_portrait : require('@/assets/avatar.jpg')" alt="头像" />
                        </div>
                        <div>
                          <p>{{item.name}}</p>
                          <p>{{item.problem}}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="chat-content">
                  <div class="messages">
                    <template v-for="(item,index) in messages">
                      <div :key="index" v-if="item.type == 1" class="msg left">
                        <div>
                          <img :src="item.head_portrait ? item.head_portrait : require('@/assets/avatar.jpg')" alt="头像" />
                        </div>
                        <div>
                          <p>{{item.name}}</p>
                          <p>{{item.problem}}</p>
                        </div>
                      </div>
                      <div v-else class="msg right">
                        <div>
                          <p>{{item.name}}</p>
                          <p>{{item.problem}}</p>
                        </div>
                        <div>
                          <img :src="item.head_portrait ? item.head_portrait : require('@/assets/avatar.jpg')" alt="头像" />
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="send">
                    <el-input v-model="msgText" type="textarea" :rows="8"></el-input>
                    <div class="btn">
                      <el-button @click="send" size="small" type="primary">发送</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="帮助中心" name="help">
            <el-form :model="helpForm" label-position="top">
              <el-form-item label="帮助中心">
                <el-input type="textarea" :rows="15" v-model="helpForm.content" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <el-row type="flex" justify="center">
              <el-button type="success" @click="saveHelp">保存</el-button>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <el-dialog title="机器人问答" :visible.sync="dialogFormRobot">
          <el-form ref="robotForm" :rules="robotFormRules" :model="robotForm">
            <el-form-item label="问题关键词/句" prop="keyWord">
              <el-input v-model="robotForm.keyWord" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="回答" prop="answer">
              <el-input v-model="robotForm.answer" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormRobot = false">取 消</el-button>
            <el-button type="primary" @click="saveRobot">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="欢迎语" :visible.sync="dialogFormWelcome">
          <el-form :model="welcomeForm">
            <el-form-item label="欢迎语">
              <el-input v-model="welcomeForm.answer" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormWelcome = false">取 消</el-button>
            <el-button type="primary" @click="saveWelcome">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      activeName: 'robot',
      robotListLoading: false,
      robotList: [],
      dialogFormRobot: false,
      robotForm: {},
      robotFormRules: {
        keyWord: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      dialogFormWelcome: false,
      welcomeForm: {},
      helpForm: {},
      userProblemList: [],
      currentUser: {},
      messages: [],
      msgText: ''
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapGetters([
      'avatar',
      'name'
    ])
  },
  methods: {
    add() {
      request({
        url: '/robot/welcome',
        method: 'get',
      }).then((res) => {
        this.dialogFormWelcome = true
        this.welcomeForm = res.data
      })
    },
    saveWelcome() {
      request({
        url: '/robot/update_welcome',
        method: 'post',
        data: this.welcomeForm
      }).then((res) => {
        this.dialogFormWelcome = false
      })
    },
    addRobot() {
      this.dialogFormRobot = true
      this.robotForm = {}
    },
    saveRobot() {
      this.$refs.robotForm.validate((valid) => {
        if (valid) {
          request({
            url: '/robot/add_robot',
            method: 'post',
            data: this.robotForm
          }).then((res) => {
            this.fetchData()
            this.dialogFormRobot = false
          })
        }
      })
    },
    saveHelp() {
      request({
        url: '/help/update_help',
        method: 'post',
        data: this.helpForm.content
      }).then((res) => {
        if (res.data) {
          this.$message('保存成功')
        }
      })
    },
    handleClick(tab, event) {
      if (this.activeName === 'artificial') {
        this.getUserProblemList()
      }
      if (this.activeName === 'help') {
        request({
          url: '/help/get_help',
          method: 'get'
        }).then((res) => {
          this.helpForm = res.data
        })
      }
    },
    handleDelete(idx, row) {
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/robot/update_welcome',
          method: 'post',
          data: {
            id: row.id,
            isDelete: true,
          }
        }).then((res) => {
          this.fetchData()
        })
      })
    },
    userClick(item) {
      item.active = true
      this.userProblemList.forEach((el) => {
        if (el.active && el !== item) el.active = false
      })
      this.currentUser = item
      this.messages = []
      request({
        url: '/user-problem/problem_list',
        method: 'get',
        params: {id: item.id}
      }).then((res) => {
        this.messages = res.data
      })
    },
    send() {
      if (!this.currentUser.id) return
      this.messages.push({
        head_portrait: this.avatar,
        name: this.name,
        problem: this.msgText,
        type: 2
      })
      request({
        url: '/answer/add_answer',
        method: 'post',
        data: {
          answerContent: this.msgText,
          userProblemId: this.currentUser.id
        }
      }).then((res) => {
        this.msgText = ''
      })
    },
    fetchData() {
      this.robotListLoading = true
      request({
        url: '/robot/robot_list',
        method: 'get',
      }).then((res) => {
        this.robotList = res.data
        this.robotListLoading = false
      })
    },
    getUserProblemList() {
      request({
        url: '/user-problem/user_problem_list',
        method: 'get'
      }).then((res) => {
        res.data.forEach((el) => {
          el.active = false
        })
        this.userProblemList = res.data
      })
    }
  }
}
</script>

<style scoped>
  .chat-box {
    display: flex;
    justify-content: center;
  }
  .chat-warp {
    width: 60%;
    height: 70vh;
    display: flex;
    border: 2px solid #5a5e66;
  }
  .chat-list {
    width: 30%;
    height: 100%;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: auto;
    border-right: 2px solid #5a5e66;
  }
  .chat-list ul,li,p {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .user {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
  }
  .active {
    background-color: #ffeeff;
  }
  .user img {
    width: 60px;
    height: 60px;
    border-radius: 60px;
    margin-right: 10px;
  }
  .user p {
    line-height: 30px;
    font-weight: bold;
  }
  .chat-content {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .messages {
    display: flex;
    flex-direction: column;
    flex: 1;
    border-bottom: 2px solid #5a5e66;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .msg.left {
    justify-content: flex-start;
  }
  .msg.right {
    justify-content: flex-end;
  }
  .msg {
    display: flex;
    padding: 15px 20px;
  }
  .msg.left img {
    width: 60px;
    height: 60px;
    border-radius: 60px;
    margin-right: 10px;
  }
  .msg.right img {
    width: 60px;
    height: 60px;
    border-radius: 60px;
    margin-left: 10px;
  }
  .msg.right p {
    text-align: right;
  }
  .msg p {
    line-height: 30px;
    font-weight: bold;
  }
  .send {
    position: relative;
  }
  .send .btn {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
</style>
