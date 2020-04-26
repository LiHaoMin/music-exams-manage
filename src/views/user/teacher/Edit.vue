<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules"  :model="form" label-width="100px">
      <el-col :span="12">
        <el-form-item label="讲师名称" prop="name">
          <el-col :span="12">
            <el-input v-model="form.mCreateAccountBean.name" maxlength="20" show-word-limit></el-input>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="讲师尊称" prop="lecturerName">
          <el-col :span="12">
            <el-input v-model="form.lecturerName" maxlength="20" show-word-limit></el-input>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="讲师头像" prop="headPortrait">
          <UploadImage
            :action="qnAction"
            :fileType="['png', 'jpg']"
            :fileSize="0.5"
            :data="qnData"
            :size="150"
            thumbSuffix="?imageView2/1/w/150/h/150"
            accept="image/jpeg,image/png"
            v-model="form.mCreateAccountBean.headPortrait"
            :responseFn="(response, file, fileList) => qnImg +  response.key">
          </UploadImage>
        </el-form-item>
      </el-col>
      <el-col :span="13">
        <el-form-item label="讲师介绍" prop="lecturerIntroduce">
          <el-col :span="10"><el-input type="textarea" v-model="form.lecturerIntroduce" :rows="5" placeholder="请输入内容"></el-input></el-col>
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <el-form-item label="身份证照片" prop="identityImg">
          <el-col :span="10">
            <UploadImage
              :action="qnAction"
              :fileType="['png', 'jpg']"
              :fileSize="0.5"
              :data="qnData"
              :size="150"
              thumbSuffix="?imageView2/1/w/150/h/150"
              accept="image/jpeg,image/png"
              v-model="form.identityImgZ"
              :responseFn="(response, file, fileList) => qnImg +  response.key">
            </UploadImage>
          </el-col>
          <el-col :span="10">
            <UploadImage
              :action="qnAction"
              :fileType="['png', 'jpg']"
              :fileSize="0.5"
              :data="qnData"
              :size="150"
              thumbSuffix="?imageView2/1/w/150/h/150"
              accept="image/jpeg,image/png"
              v-model="form.identityImgF"
              :responseFn="(response, file, fileList) => qnImg +  response.key">
            </UploadImage>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="资质证明" prop="certificate">
          <el-col :span="24">
            <UploadImage
              :action="qnAction"
              :fileType="['png', 'jpg']"
              :fileSize="0.5"
              :data="qnData"
              :size="150"
              thumbSuffix="?imageView2/1/w/150/h/150"
              accept="image/jpeg,image/png"
              v-model="images"
              multiple
              :responseFn="(response, file, fileList) => qnImg +  response.key">
            </UploadImage>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="讲师后台账号" prop="account">
          <el-col :span="6">
            <el-input v-model="form.mCreateAccountBean.account"></el-input>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="后台账号密码" prop="password">
          <el-col :span="6">
            <el-input type="password" :placeholder="passHolder" v-model="form.mCreateAccountBean.password"></el-input>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="讲师分成" prop="divideInto">
          <el-col :span="2">
            <el-input v-model="form.divideInto"></el-input>
          </el-col>
          <el-col :span="2">
            <span>&nbsp;&nbsp;&nbsp;%</span>
          </el-col>
        </el-form-item>
      </el-col>
    </el-form>
    <el-col :span="24">
      <el-row type="flex" justify="end">
        <el-button type="success" @click="add">确认添加</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-row>
    </el-col>
  </div>
</template>

<script>
import request from '@/utils/request'
import UploadImage from '@/components/UploadImage/UploadImage'

export default {
  data() {
    return {
      form: {
        mCreateAccountBean: {}
      },
      rules: {
        name: [
          { required: true, message: '请输入内容', trigger: 'blur', validator: (rule, value, callback) => {
            if (!this.form.mCreateAccountBean.name) callback(new Error('请输入内容'))
            else callback()} }
        ],
        lecturerName: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        headPortrait: [
          { required: true, message: '请输入内容', trigger: 'blur', validator: (rule, value, callback) => {
            if (!this.form.mCreateAccountBean.headPortrait) callback(new Error('请输入内容'))
            else callback()} }
        ],
        lecturerIntroduce: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        identityImg: [
          { required: true, message: '请输入内容', trigger: 'blur', validator: (rule, value, callback) => {
            if (!this.form.identityImgZ || !this.form.identityImgF) callback(new Error('请输入内容'))
            else callback()} }
        ],
        certificate: [
          { required: true, message: '请输入内容', trigger: 'blur', validator: (rule, value, callback) => {
            if (!this.form.certificate) callback(new Error('请输入内容'))
            else callback()} }
        ],
        account: [
          { required: true, trigger: 'blur', validator: (rule, value, callback) => {
            if (!this.form.mCreateAccountBean.account) callback(new Error('请输入内容'))
            else if (!/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(this.form.mCreateAccountBean.account)) callback(new Error('6至20位，以字母开头，字母，数字，减号，下划线'))
            else callback()} }
        ],
        password: [
          { required: true, trigger: 'blur', validator: (rule, value, callback) => {
            if (!this.form.mCreateAccountBean.password && !this.$route.params.id) callback(new Error('请输入内容'))
            else if (this.form.mCreateAccountBean.password && !/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(this.form.mCreateAccountBean.password)) callback(new Error('最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符'))
            else callback()} }
        ],
        divideInto: [
          { required: true, trigger: 'blur', validator: (rule, value, callback) => {
            if (!value) callback(new Error('请输入内容'))
            else if (!/^(-?\d+)(\.\d+)?$/.test(value)) callback(new Error('请输入数字'))
            else callback()}}
        ]
      },
      qnData: {
        key: '',
        token: ''
      },
      qnAction: 'http://up.qiniu.com',
      qnImg: 'http://static.yinyuebojiangtang.com/',
      passHolder: '',
      images: []
    }
  },
  computed: {
    certificate() {
      return this.images.join(',')
    }
  },
  components: {
    UploadImage
  },
  created() {
    request({
      url: '/user/qiniu',
      method: 'get'
    }).then((res) => {
      this.qnData = res.data
    })
    if (this.$route.params.id) {
      request({
        url: '/user/lecturer_content',
        method: 'get',
        params: {id: this.$route.params.id}
      }).then((res) => {
        res.data.mUserInfo.password = null
        this.passHolder = '********'
        this.form = {... res.data.mLecturer, mCreateAccountBean: res.data.mUserInfo}
        if (this.form.certificate) {
          this.images = this.form.certificate.split(',')
        }
      })
    }
  },
  methods: {
    add() {
      this.form.certificate = this.certificate
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.videoList = this.videoList
          if (this.$route.params.id) {
            this.edit()
          } else  {
            this.save()
          }
        }
      })
    },
    cancel() {
      this.$router.replace({name:'Teacher'})
    },
    edit() {
      request({
        url: '/lecturer/update_lecturer',
        method: 'post',
        data: {
          mUserInfo: this.form.mCreateAccountBean,
          mLecturer: this.form
        }
      }).then((res) => {
        this.$router.replace({name:'Teacher'})
      })
    },
    save() {
      this.form.mCreateAccountBean.userEnable = true
      request({
        url: '/user/add_lecturer',
        method: 'post',
        data: this.form
      }).then((res) => {
        this.$router.replace({name:'Teacher'})
      })
    },
  }
}
</script>
