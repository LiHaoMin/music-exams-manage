<template>
  <div class="app-container" :style="{'pointer-events': (!this.$route.query.upperShelf ? 'auto': 'none')}">
    <el-form ref="form" :rules="rules"  :model="form" label-width="120px">
      <el-col :span="11">
        <el-form-item label="课程名称" prop="curriculumName">
          <el-input v-model="form.curriculumName" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="课程封面" prop="curriculumImg">
          <upload-image
            :action="qnAction"
            :fileType="['png', 'jpg']"
            :data="qnData"
            :size="150"
            thumbSuffix="?imageView2/1/w/150/h/150"
            accept="image/jpeg,image/png"
            v-model="form.curriculumImg"
            :responseFn="(response, file, fileList) => qnImg +  response.key">
          </upload-image>
        </el-form-item>
        <el-form-item label="课程状态" prop="upperShelf">
          <el-switch
            v-model="form.upperShelf"
            active-text="上架状态"
            inactive-text="下架状态">
          </el-switch>
        </el-form-item>
        <el-form-item label="课程价格" prop="money">
          <el-col :span="6"><el-input v-model="form.money" placeholder="请输入金额"></el-input></el-col>
          <el-col :span="5">&nbsp;&nbsp;&nbsp;元</el-col>
          <el-col :span="6">
            <el-checkbox v-model="form.freeAdmission" label="勾选免费"></el-checkbox>
          </el-col>
        </el-form-item>
        <el-form-item label="课程简介" prop="briefIntroduction">
          <el-input type="textarea" v-model="form.briefIntroduction" :rows="5" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="2">
        <el-form-item label="讲师姓名" prop="teacherName">
          <el-input v-model="form.teacherName" placeholder="请输入名称" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="讲师尊称" prop="teacherCall">
          <el-input v-model="form.teacherCall" placeholder="请输入名称" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="讲师介绍" prop="teacherIntroduce">
          <el-input v-model="form.teacherIntroduce" type="textarea" :rows="5" placeholder="请输入内容" maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="一级分类" prop="typeA">
          <el-select ref="typeA" v-model="form.typeA" placeholder="请选择">
            <el-option v-for="item in firstList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="讲堂分类" prop="typeB">
          <el-select ref="typeB" @change="typeChange" v-model="form.typeB" placeholder="请选择">
            <el-option label="导师讲堂" value="1"></el-option>
            <el-option label="学长讲堂" value="2"></el-option>
            <el-option label="学员讲堂" value="3"></el-option>
          </el-select>
          <el-select ref="typeC" @change="typeChange"  v-model="form.typeC" placeholder="请选择">
            <el-option label="音乐" value="1"></el-option>
            <el-option label="舞蹈" value="2"></el-option>
            <el-option label="留学" value="3"></el-option>
          </el-select>
          <el-select ref="typeD" v-model="form.typeD" placeholder="请选择">
            <el-option v-for="item in firstList2" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学习人数" v-if="userType != 3">
          <el-switch
            v-model="form.isNumOfLearners"
            active-text="自定义数据"
            inactive-text="系统数据" @change="switchChange">
          </el-switch>
        </el-form-item>
        <el-form-item label="已学习人数" prop="numOfLearners" v-if="form.isNumOfLearners && userType != 3">
          <el-col :span="6"><el-input v-model="form.numOfLearners" placeholder="请输入数量"></el-input></el-col>
          <el-col :span="5">&nbsp;&nbsp;&nbsp;人</el-col>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <span>&nbsp;</span>
        <el-divider></el-divider>
      </el-col>
    </el-form>
    <el-col :span="24">
      <el-row :key="index" v-for="(item,index) in videoList">
        <el-col>
          <el-row>
            <p>第{{item.videoPosition}}节</p>
            <el-col :span="6">课时名称：{{item.videoName}}</el-col>
            <el-col :span="4">时长：{{item.videoTime | videoTime}}</el-col>
            <el-col :span="6">一级分类：{{firstCate}}</el-col>
            <el-col :span="6">讲堂分类：{{typeCate}}
              <span v-if="userType == 3">状态：{{item.type | videoType}}</span>
            </el-col>
            <el-col :span="2">
              <el-link :underline="false" type="danger" @click="deleteVideo(index, item)">删除</el-link>
            </el-col>
          </el-row>
          <el-divider></el-divider>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><div>第{{videoList.length + 1}}节</div></el-col>
        <el-col :span="6"><el-button type="primary" @click="addVideo">新增</el-button></el-col>
      </el-row>
    </el-col>
    <el-col :span="24" v-if="!this.$route.query.upperShelf">
      <el-row type="flex" justify="end">
        <el-button type="success" @click="add">确认添加</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-row>
    </el-col>
    <el-dialog :title="'第' + (videoList.length + 1) + '节'" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
      <el-form ref="videoForm" :model="videoForm" :rules="videoFormRules" label-position="top">
        <el-form-item label="课时名称" prop="videoName">
          <el-input v-model="videoForm.videoName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请上传课程视频" prop="videoUrl">
          <UploadVideo
            :action="qnAction"
            :fileType="['mp4']"
            :data="qnData"
            :size="150"
            :http-request="uploadFile"
            thumbSuffix="?vframe/jpg/offset/1/w/150/h/150"
            accept="video/mp4,audio/mp4"
            v-model="videoForm.videoUrl"
            :responseFn="(response, file, fileList) => qnImg +  response.key">
          </UploadVideo>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="videoCancle">取 消</el-button>
        <el-button type="primary" @click="saveVideo">立即添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
import UploadImage from '@/components/UploadImage/UploadImage'
import UploadVideo from "@/components/UploadVideo/UploadVideo"
import { mapGetters } from 'vuex'
import * as qiniu from 'qiniu-js'

export default {
  data() {
    return {
      isLearnNum: true,
      firstList: [],
      firstList2: [],
      form: {
        typeB: '',
        typeC: '',
        typeD: '',
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
        upperShelf: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        money: [
          { required: true, trigger: 'blur', validator: (rule, value, callback) => {
            if (!value) callback(new Error('请输入内容'))
            else if (!/^(-?\d+)(\.\d+)?$/.test(value)) callback(new Error('请输入数字'))
            else callback()}
          }
        ],
        briefIntroduction: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        teacherName: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        teacherCall: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        teacherIntroduce: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        typeA: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        typeB: [
          { required: true, message: '请输入内容', trigger: 'blur', validator: (rule, value, callback) => {
            if (!this.form.typeB || !this.form.typeC || !this.form.typeD) callback(new Error('请输入内容'))
            else callback()}
          }
        ]
      },
      videoList: [],
      videoDelList: [],
      videoForm: {},
      videoFormRules: {
        videoName: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        videoUrl: [
          { required: true, message: '请输入内容', trigger: 'blur', validator: (rule, value, callback) => {
            if (!this.videoForm.videoUrl) callback(new Error('请输入内容'))
            else callback()} }
        ]
      },
      dialogFormVisible: false,
      qnData: {
        key: '',
        token:  ''
      },
      qnAction: 'http://up.qiniu.com',
      qnImg: 'http://static.yinyuebojiangtang.com/',
      imageUrl: '',
      subscription: null
    }
  },
  components: {
    UploadImage,
    UploadVideo
  },
  created() {
    this.getFirstList()
    if (this.$route.query.id) {
      request({
        url: '/curriculum/inquiry_course',
        method: 'get',
        params: {curriculumId: this.$route.query.id}
      }).then((res) => {
        this.form = res.data.mCurriculum
        this.form.typeB = res.data.mCurriculum.typeB+""
        this.form.typeC = res.data.mCurriculum.typeC+""
        this.getFirstList2()
        this.videoList = res.data.mVideoList
      })
    }
    request({
      url: '/user/qiniu',
      method: 'get'
    }).then((res) => {
      this.qnData = res.data
    })
  },
  computed: {
    ...mapGetters([
      'userType'
    ]),
    firstCate() {
      return this.$refs.typeA.$data.selected.label
    },
    typeCate() {
      const typeB = this.$refs.typeB.$data.selected.label ? this.$refs.typeB.$data.selected.label : ''
      const typeC = this.$refs.typeC.$data.selected.label ? this.$refs.typeC.$data.selected.label : ''
      const typeD = this.$refs.typeD.$data.selected.label ? this.$refs.typeD.$data.selected.label : ''
      return typeB && typeC && typeD ?  typeB + '-' + typeC + '-' + typeD : ''
    }
  },
  filters: {
    videoType(data) {
      const list = ['', '待审核', '审核不通过', '已上架', '已下架']
      return data ? list[data] : '待审核'
    },
    videoTime(data) {
      return (data / 60).toFixed(2) + '分钟'
    }
  },
  methods: {
    typeChange(data) {
      this.form.typeD = ''
      this.getFirstList2()
    },
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
      this.form.teacher = this.form.teacherName
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.videoList = this.videoList
          if (this.$route.query.id) {
            this.edit()
          } else  {
            this.save()
          }
        }
      })
    },
    save() {
      request({
        url: '/curriculum/add_curriculum',
        method: 'post',
        data: this.form
      }).then((res) => {
        this.$router.replace({name:'online'})
      })
    },
    async edit() {
      await request({
        url: '/curriculum/update_curriculum',
        method: 'post',
        data: this.form
      })
      // 添加视频
      var videoListData = []
      this.videoList.forEach((el) => {
        if (!el.id) {
          el.curriculumId = this.form.id
          videoListData.push(el)
        }
      })
      await request({
        url: '/video/add_vnideo',
        method: 'post',
        data: videoListData
      })
      if (this.videoDelList.length > 0) {
        await request({
          url: '/video',
          method: 'post',
          data: this.videoDelList
        })
      }
      this.$router.replace({name:'online'})
    },
    cancel() {
      this.$router.replace({name:'online'})
    },
    addVideo() {
      this.vfileList = []
      this.videoForm = {}
      this.dialogFormVisible = true
    },
    saveVideo() {
      this.$refs.videoForm.validate((valid) => {
        if (valid) {
          this.videoForm.videoPosition = this.videoList.length + 1
          this.videoForm.type = 1
          if (this.form.userId)
            this.videoForm.userId = this.form.userId
          this.dialogFormVisible = false
          // 时长
          request({
            url: this.videoForm.videoUrl + '?avinfo',
            method: 'get'
          }).then((res) => {
            if (res && res.format) {
              this.videoForm.videoTime = parseInt(res.format.duration)
              this.videoList.push(this.videoForm)
            }
          })
        }
      })
    },
    deleteVideo(idx, item) {
      if (item.id) {
        item.isDelete = true
        this.videoDelList.push(item)
      }
      this.videoList.splice(idx, 1)
    },
    getFirstList() {
      request({
        url: '/curriculum-classification/first_class_classification',
        method: 'get',
        params: {
          num: 1,
          size: 100000
        }
      }).then((res) => {
        this.firstList = res.data.records
      })
    },
    getFirstList2() {
      request({
        url: '/curriculum-classification/two_level_classification',
        method: 'post',
        data: {
          classroomOsType: this.form.typeC,
          classroomType: this.form.typeB,
          num: 1,
          size: 100000
        }
      }).then((res) => {
        this.firstList2 = res.data.records
      })
    },
    videoCancle() {
      this.dialogFormVisible = false
      if (this.subscription) {
        this.subscription.unsubscribe()
      }
    },
    uploadFile(option) {
      const fileName = this.changeFileName(option.file.name)

      const qnPutextra = {
        fname: '',
        params: {},
        mimeType: null
      }
      const qnConfig = {
        useCdnDomain: true,
        disableStatisticsReport: false,
        retryCount: 6,
        region: qiniu.region.z0
      }
      const observable = qiniu.upload(
        option.file,
        fileName,
        this.qnData.token,
        qnPutextra,
        qnConfig
      )
      this.subscription = observable.subscribe({
        next: option.onProgress,
        error: option.onError,
        complete: option.onSuccess
      })
    },
    changeFileName(filename) {
      return filename.replace(/.[a-zA-Z0-9]+$/, (match) => {
        return `-${Date.now()}${match}`
      })
    }
  }
}
</script>
