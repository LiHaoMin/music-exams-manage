<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules"  :model="form" label-width="100px">
      <el-form-item label="轮播图名称" prop="bannerName">
        <el-col :span="12">
          <el-input v-model="form.bannerName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="轮播图素材" prop="bannerUrl">
        <upload-image
          :action="qnAction"
          :fileType="['png', 'jpg']"
          :fileSize="0.5"
          :data="qnData"
          :size="150"
          thumbSuffix="?imageView2/1/w/150/h/150"
          accept="image/jpeg,image/png"
          v-model="form.bannerUrl"
          :responseFn="(response, file, fileList) => qnImg +  response.key">
        </upload-image>
      </el-form-item>
      <el-form-item label="轮播图说明" prop="bannerExplain">
      <el-col :span="12">
        <el-input v-model="form.bannerExplain"></el-input>
      </el-col>
    </el-form-item>
      <el-form-item label="轮播图链接" prop="bannerPath">
        <el-col :span="12">
          <el-input v-model="form.bannerPath"></el-input>
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
import UploadImage from '@/components/UploadImage/UploadImage'

export default {
  data() {
    return {
      form: {
        bannerUrl: ''
      },
      rules: {
        bannerName: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        bannerUrl: [
          { required: true, message: '请输入内容', trigger: 'blur', validator: (rule, value, callback) => {
            if (!this.form.bannerUrl) callback(new Error('请输入内容'))
            else callback()} }
        ],
        bannerPath: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      qnData: {
        key: '',
        token: ''
      },
      qnAction: 'http://up.qiniu.com',
      qnImg: 'http://static.yinyuebojiangtang.com/'
    }
  },
  components: {
    UploadImage
  },
  created() {
    if (this.$route.params.obj) {
      this.form = this.$route.params.obj
      delete this.form.name
    }
    request({
      url: '/user/qiniu',
      method: 'get'
    }).then((res) => {
      this.qnData = res.data
    })
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
        url: '/banner/update_banner',
        method: 'post',
        data: this.form
      }).then((res) => {
        this.$router.replace({name:'Swipe'})
      })
    },
    save() {
      request({
        url: '/banner/add_banner',
        method: 'post',
        data: this.form
      }).then((res) => {
        this.$router.replace({name:'Swipe'})
      })
    },
    cancel() {
      this.$router.replace({name:'Swipe'})
    },
  }
}
</script>
