<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules"  :model="form" >
      <el-form-item label="轮播图名称" prop="bannerName">
        <el-col :span="12">
          <el-input v-model="form.bannerName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="轮播图素材" prop="bannerUrl">
        <el-upload
          list-type="picture-card"
          :action="qnAction"
          :data="qnData"
          :file-list="fileList"
          :on-success="uploadPic"
          :before-upload="beUpload"
          :limit="1"
          :on-remove="removePic">
          <i class="el-icon-plus"></i>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
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

export default {
  data() {
    return {
      form: {},
      rules: {
        bannerName: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        bannerUrl: [
          { required: true, message: '请输入内容', trigger: 'blur' }
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
      qnImg: 'http://q8ieryh01.bkt.clouddn.com/',
      fileList: [],
    }
  },
  created() {
    if (this.$route.params.obj) {
      this.form = this.$route.params.obj
      this.fileList.push({url: this.form.bannerUrl})
    }
    request({
      url: '/user/qiniu',
      method: 'get'
    }).then((res) => {
      this.qnData = res.data
    })
  },
  methods: {
    removePic(file, fileList) {
      this.fileList = []
      this.form.bannerUrl = null
    },
    uploadPic(response, file, fileList) {
      this.fileList.push({url: this.qnImg +  response.key})
      this.form.bannerUrl = this.qnImg +  response.key
    },
    beUpload(file, fileList) {
      this.qnData.key =  new Date().getTime() + file.name
      return true
    },
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
