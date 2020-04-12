<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules"  :model="form" label-width="100px" >
      <el-form-item label="管理员账号" prop="account">
        <el-col :span="12">
          <el-input v-model="form.account"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-col :span="12">
          <el-input type="password" :placeholder="passHolder" v-model="form.password"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-col :span="12">
          <el-input type="password" :placeholder="passHolder" v-model="form.checkPass"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="管理员姓名" prop="name">
        <el-col :span="12">
          <el-input v-model="form.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号" prop="telephone">
        <el-col :span="12">
          <el-input v-model="form.telephone"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="添加权限" prop="adminType">
        <el-col :span="12">
          <el-select v-model="form.adminType" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
    </el-form>
    <el-row type="flex" justify="end">
      <el-button type="success" @click="add">确认添加</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-row>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {},
      rules: {
        account: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
          { required: true, message: '请输入内容', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        adminType: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      options: [{
        value: '1',
        label: '首页 '
      }, {
        value: '2',
        label: '课程管理'
      }, {
        value: '3',
        label: '账单管理'
      }, {
        value: '4',
        label: '用户管理'
      }, {
        value: '5',
        label: '轮播图'
      }, {
        value: '6',
        label: '客服管理'
      }, {
        value: '7',
        label: '系统设置'
      }],
      passHolder: '',
      mAdministrators: {}
    }
  },
  created() {
    if (this.$route.params.id) {
      request({
        url: '/user/get_administrators_content',
        method: 'get',
        params: {
          id: this.$route.params.id
        }
      }).then((res) => {
        res.data.mUserInfo.password = null
        this.form = res.data.mUserInfo
        this.mAdministrators = res.data.mAdministrators
        this.$set(this.form, 'adminType', JSON.parse(res.data.mAdministrators.adminType))
      })
    }
  },
  methods: {
    add() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.videoList = this.videoList
          if (this.form.id) {
            this.edit()
          } else  {
            this.save()
          }
        }
      })
    },
    edit() {
      request({
        url: '/administrators/update_admin',
        method: 'post',
        data: {
          mUserInfo: this.form,
          mAdministrators: {
            id: this.mAdministrators.id,
            adminType: JSON.stringify(this.form.adminType)
          }
        }
      }).then((res) => {
        this.$router.replace({name:'Admin'})
      })
      // TODO 密码重复不显示
    },
    save() {
      this.form.userEnable = true
      request({
        url: '/user/add_administrators',
        method: 'post',
        data: {
          mCreateAccountBean: this.form,
          adminType: this.form.adminType
        }
      }).then((res) => {
        this.$router.replace({name:'Admin'})
      })
    },
    cancel() {
      this.$router.replace({name:'Admin'})
    },
  }
}
</script>
