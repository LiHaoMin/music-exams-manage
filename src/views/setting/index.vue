<template>
  <div class="app-container">
    <el-card>
      <div class="content">
        <p>账号：{{ account}}</p>
        <p>密码：********&nbsp;&nbsp;&nbsp;<el-link type="primary" @click="savePass">修改密码</el-link></p>
      </div>
    </el-card>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="新密码"prop="password">
          <el-col :span="12">
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
          </el-col>
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
import { mapGetters } from 'vuex'
import request from '@/utils/request'

export default {
  data() {
    return {
      form: {},
      rules: {
        password: [
          { required: true, trigger: 'blur', validator: (rule, value, callback) => {
            if (!value) callback(new Error('请输入内容'))
            else if (!/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(value)) callback(new Error('最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符'))
            else callback()}
          }
        ]
      },
      dialogFormVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'account'
    ])
  },
  methods: {
    savePass() {
      this.dialogFormVisible = true
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          request({
            url: '/user/update_user_content',
            method: 'post',
            data: this.form
          }).then((res) => {
            if (res.data) {
              this.dialogFormVisible = false
            }
          })
        }
      })
    }
  }
}
</script>
