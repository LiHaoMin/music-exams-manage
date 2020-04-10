<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules"  :model="form" >
      <el-form-item label="实体课名称" prop="curriculumName">
        <el-col :span="12">
          <el-input v-model="form.curriculumName"></el-input>
        </el-col>
      </el-form-item>
      <el-col :span="12">
        <el-form-item label="文章封面" prop="curriculumImg">
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
      <el-col :span="12">
        <el-form-item label="轮播图素材" prop="rotationChart">
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
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="联系老师" prop="teacher">
          <el-col :span="12">
            <el-input v-model="form.teacher"></el-input>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="老师联系方式" prop="teacherTelephone">
          <el-col :span="12">
            <el-input v-model="form.teacherTelephone"></el-input>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="学习人数" prop="curriculumName">
            <el-switch
              v-model="form.isNumOfLearners"
              active-text="自定义数据"
              inactive-text="系统数据">
            </el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="已报名人数" v-if="form.isNumOfLearners">
          <el-col :span="6"><el-input v-model="form.numOfLearners" placeholder="请输入数量"></el-input></el-col>
          <el-col :span="5">&nbsp;&nbsp;&nbsp;人</el-col>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="课程价格" prop="money">
          <el-col :span="6"><el-input v-model="form.money" placeholder="请输入金额"></el-input></el-col>
          <el-col :span="5">&nbsp;&nbsp;&nbsp;元</el-col>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="课程状态" prop="upperShelf">
          <el-switch
            v-model="form.upperShelf"
            active-text="上架状态"
            inactive-text="下架状态">
          </el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="14">
        <el-form-item label="选择实体课分类">
          <el-select ref="typeC"  v-model="form.typeC" placeholder="请选择">
            <el-option label="音乐" value="1"></el-option>
            <el-option label="舞蹈" value="2"></el-option>
            <el-option label="留学" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="视频介绍" prop="pic">
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
          </el-upload>
        </el-form-item>
      </el-col>
      <el-col :span="15">
        <el-form-item label="课程简介" prop="briefIntroduction">
          <el-col :span="10"><el-input type="textarea" v-model="form.briefIntroduction" :rows="5" placeholder="请输入内容"></el-input></el-col>
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
      form: {},
      rules: {},
      qnData: {
        key: '',
        token: ''
      },
      qnAction: 'http://up.qiniu.com',
      qnImg: 'http://q8ieryh01.bkt.clouddn.com/',
      fileList: [],
      fileList2: [],
      fileList3: []
    }
  },
  created() {
    if (this.$route.params.id) {
      request({
        url: '/curriculum/inquiry_course',
        method: 'get',
        params: {curriculumId: this.$route.params.id}
      }).then((res) => {
        this.form = res.data.mCurriculum
        this.fileList.push({url: this.form.curriculumImg})
        this.fileList2.push({url: this.form.rotationChart})
        this.fileList3.push({url: this.form.videoIntroduction})
      })
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
      this.form.curriculumImg = null
    },
    uploadPic(response, file, fileList) {
      this.fileList.push({url: this.qnImg +  response.key})
      this.form.curriculumImg = this.qnImg +  response.key
    },
    beUpload(file, fileList) {
      this.qnData.key =  new Date().getTime() + file.name
      return true
    },
    removePic2(file, fileList) {
      this.fileList2 = []
      this.form.rotationChart = null
    },
    uploadPic2(response, file, fileList) {
      this.fileList2.push({url: this.qnImg +  response.key})
      this.form.rotationChart = this.qnImg +  response.key
      // TODO 轮播图素材多张
    },
    beUpload2(file, fileList) {
      this.qnData.key =  new Date().getTime() + file.name
      return true
    },
    removePic3(file, fileList) {
      this.fileList3 = []
      this.form.videoIntroduction = null
    },
    uploadPic3(response, file, fileList) {
      this.fileList3.push({url: this.qnImg +  response.key})
      this.form.videoIntroduction = this.qnImg +  response.key
    },
    beUpload3(file, fileList) {
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
      this.$router.replace({name:'offline'})
    },
    save() {
      request({
        url: '/curriculum/add_curriculum',
        method: 'post',
        data: this.form
      }).then((res) => {
        this.$router.replace({name:'offline'})
      })
    },
    edit() {
      request({
        url: '/curriculum/update_curriculum',
        method: 'post',
        data: this.form
      }).then((res) => {
        this.$router.replace({name:'offline'})
      })
    }
  }
}
</script>
