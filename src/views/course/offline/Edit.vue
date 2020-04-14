<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules"  :model="form" label-width="120px">
      <el-form-item label="实体课名称" prop="curriculumName">
        <el-col :span="12">
          <el-input v-model="form.curriculumName"></el-input>
        </el-col>
      </el-form-item>
      <el-col :span="12">
        <el-form-item label="文章封面" prop="curriculumImg">
          <UploadImage
            :action="qnAction"
            :fileType="['png', 'jpg']"
            :fileSize="0.5"
            :data="qnData"
            :size="150"
            thumbSuffix="?imageView2/1/w/150/h/150"
            accept="image/jpeg,image/png"
            v-model="form.curriculumImg"
            :responseFn="(response, file, fileList) => qnImg +  response.key">
          </UploadImage>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="轮播图素材" prop="rotationChart">
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
        <el-form-item label="学习人数">
            <el-switch
              v-model="form.isNumOfLearners"
              active-text="自定义数据"
              inactive-text="系统数据" @change="switchChange">
            </el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item prop="numOfLearners" label="已报名人数" v-if="form.isNumOfLearners">
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
        <el-form-item label="选择实体课分类" prop="typeA">
          <el-select ref="typeC"  v-model="form.typeA" placeholder="请选择">
            <el-option label="音乐" value="51"></el-option>
            <el-option label="舞蹈" value="52"></el-option>
            <el-option label="留学" value="53"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="视频介绍" prop="videoIntroduction">
          <UploadImage
            :action="qnAction"
            :fileType="['mp4']"
            :fileSize="10"
            :data="qnData"
            :size="150"
            thumbSuffix="?vframe/jpg/offset/1/w/150/h/150"
            accept="video/mp4,audio/mp4"
            v-model="form.videoIntroduction"
            :responseFn="(response, file, fileList) => qnImg +  response.key">
          </UploadImage>
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
import UploadImage from '@/components/UploadImage/UploadImage'

export default {
  data() {
    return {
      form: {
        upperShelf: false
      },
      rules: {
        curriculumName: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        curriculumImg: [
          { required: true, message: '请输入内容', trigger: 'blur', validator: (rule, value, callback) => {
            if (!this.form.curriculumImg) callback(new Error('请输入内容'))
            else callback()} }
        ],
        rotationChart: [
          { required: true, message: '请输入内容', trigger: 'blur', validator: (rule, value, callback) => {
            if (!this.rotationChart) callback(new Error('请输入内容'))
            else callback()} }
        ],
        teacher: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        teacherTelephone: [
          { required: true, trigger: 'blur', validator: (rule, value, callback) => {
            if (!value) callback(new Error('请输入内容'))
            else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) callback(new Error('请输入正确的手机号'))
            else callback()}
          }
        ],
        upperShelf: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        typeA: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        videoIntroduction: [
          { required: true, message: '请输入内容', trigger: 'blur', validator: (rule, value, callback) => {
            if (!this.form.videoIntroduction) callback(new Error('请输入内容'))
            else callback()} }
        ],
        briefIntroduction: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      qnData: {
        key: '',
        token: ''
      },
      qnAction: 'http://up.qiniu.com',
      qnImg: 'http://q8ieryh01.bkt.clouddn.com/',
      images: []
    }
  },
  computed: {
    rotationChart() {
      return this.images.join(',')
    }
  },
  components: {
    UploadImage
  },
  created() {
    if (this.$route.params.id) {
      request({
        url: '/curriculum/inquiry_course',
        method: 'get',
        params: {curriculumId: this.$route.params.id}
      }).then((res) => {
        this.form = res.data.mCurriculum
        if (this.form.rotationChart) {
          this.images = this.form.rotationChart.split(',')
        }
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
    switchChange(e) {
      if (e) {
        this.rules.numOfLearners = [
          { required: true, trigger: 'blur', validator: (rule, value, callback) => {
            if (!value) callback(new Error('请输入内容'))
            else if (!/^(-?\d+)(\.\d+)?$/.test(value)) callback(new Error('请输入数字'))
            else callback()}
          }
        ]
      } else {
        delete this.rules.numOfLearners
      }
    },
    add() {
      // 轮播图素材多张
      this.form.rotationChart = this.rotationChart
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
      // const typeA = [0,51,52,53]
      // this.form.typeA = typeA[this.form.typeB]
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
