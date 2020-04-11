<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules"  :model="form" label-width="100px">
      <el-col :span="12">
        <el-form-item label="讲师名称" prop="name">
          <el-col :span="12">
            <el-input v-model="form.mCreateAccountBean.name"></el-input>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="讲师尊称" prop="lecturerName">
          <el-col :span="12">
            <el-input v-model="form.lecturerName"></el-input>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="讲师头像" prop="headPortrait">
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
      </el-col>
      <el-col :span="13">
        <el-form-item label="讲师介绍" prop="lecturerIntroduce">
          <el-col :span="10"><el-input type="textarea" v-model="form.lecturerIntroduce" :rows="5" placeholder="请输入内容"></el-input></el-col>
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <el-form-item label="身份证照片" prop="identityImg">
          <el-col :span="10">
            <el-upload
              list-type="picture-card"
              :action="qnAction"
              :data="qnData"
              :file-list="fileList2"
              :on-success="uploadPic2"
              :before-upload="beUpload2"
              :limit="1"
              :on-remove="removePic2">
              <i class="el-icon-plus"></i>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
          <el-col :span="10">
            <el-upload
              list-type="picture-card"
              :action="qnAction"
              :data="qnData"
              :file-list="fileList3"
              :on-success="uploadPic3"
              :before-upload="beUpload3"
              :limit="1"
              :on-remove="removePic3">
              <i class="el-icon-plus"></i>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="资质证明" prop="certificate">
          <el-col :span="18">
            <el-upload
              list-type="picture-card"
              :action="qnAction"
              :data="qnData"
              :file-list="fileList4"
              :on-success="uploadPic4"
              :before-upload="beUpload4"
              :limit="1"
              :on-remove="removePic4">
              <i class="el-icon-plus"></i>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
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
            <el-input type="password" v-model="form.mCreateAccountBean.password"></el-input>
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

export default {
  data() {
    return {
      form: {
        mCreateAccountBean: {}
      },
      rules: {},
      qnData: {
        key: '',
        token: ''
      },
      qnAction: 'http://up.qiniu.com',
      qnImg: 'http://q8ieryh01.bkt.clouddn.com/',
      fileList: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
    }
  },
  created() {
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
      this.form.mCreateAccountBean.headPortrait = null
    },
    uploadPic(response, file, fileList) {
      this.fileList.push({url: this.qnImg +  response.key})
      this.form.mCreateAccountBean.headPortrait = this.qnImg +  response.key
    },
    beUpload(file, fileList) {
      this.qnData.key =  new Date().getTime() + file.name
      return true
    },
    removePic2(file, fileList) {
      this.fileList2 = []
      this.form.identityImgZ = null
    },
    uploadPic2(response, file, fileList) {
      this.fileList2.push({url: this.qnImg +  response.key})
      this.form.identityImgZ = this.qnImg +  response.key
    },
    beUpload2(file, fileList) {
      this.qnData.key =  new Date().getTime() + file.name
      return true
    },
    removePic3(file, fileList) {
      this.fileList3 = []
      this.form.identityImgF = null
    },
    uploadPic3(response, file, fileList) {
      this.fileList3.push({url: this.qnImg +  response.key})
      this.form.identityImgF = this.qnImg +  response.key
    },
    beUpload3(file, fileList) {
      this.qnData.key =  new Date().getTime() + file.name
      return true
    },
    removePic4(file, fileList) {
      this.fileList4 = []
      this.form.certificate = null
    },
    uploadPic4(response, file, fileList) {
      this.fileList4.push({url: this.qnImg +  response.key})
      this.form.certificate = this.qnImg +  response.key
    },
    beUpload4(file, fileList) {
      this.qnData.key =  new Date().getTime() + file.name
      return true
    },
    add() {
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
      // TODO edit
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
