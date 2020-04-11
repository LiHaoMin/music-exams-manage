<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules"  :model="form" label-width="120px">
      <el-col :span="11">
        <el-form-item label="课程名称" prop="curriculumName">
          <el-input v-model="form.curriculumName"></el-input>
        </el-form-item>
        <el-form-item label="课程封面" prop="pic">
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
        <el-form-item label="讲师尊称">
          <el-input v-model="form.teacherCall" placeholder="请输入名称" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="讲师介绍">
          <el-input v-model="form.teacherIntroduce" type="textarea" :rows="5" placeholder="请输入内容" maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="一级分类">
          <el-select ref="typeA" v-model="form.typeA" placeholder="请选择" @change="(e) => {$message.info('e')}">
            <el-option v-for="item in firstList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="讲堂分类">
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
            inactive-text="系统数据">
          </el-switch>
        </el-form-item>
        <el-form-item label="已学习人数" v-if="form.isNumOfLearners && userType != 3">
          <el-col :span="6"><el-input v-model="form.numOfLearners" placeholder="请输入数量"></el-input></el-col>
          <el-col :span="5">&nbsp;&nbsp;&nbsp;人</el-col>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <span>&nbsp;</span>
        <el-divider></el-divider>
      </el-col>
    </el-form>
    <div :key="index" v-for="(item,index) in videoList">
      <el-row>
        <el-col>
          <el-row>
            <p>第{{item.videoPosition}}节</p>
            <el-col :span="6">课时名称：{{item.videoName}}</el-col>
            <el-col :span="4">时长：</el-col>
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
    </div>
    <el-col :span="24">
      <el-row>
        <el-col :span="6"><div>第{{videoList.length + 1}}节</div></el-col>
        <el-col :span="6"><el-button type="primary" @click="addVideo">新增</el-button></el-col>
      </el-row>
    </el-col>
    <el-col :span="24">
      <el-row type="flex" justify="end">
        <el-button type="success" @click="add">确认添加</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-row>
    </el-col>
    <el-dialog :title="'第' + (videoList.length + 1) + '节'" :visible.sync="dialogFormVisible">
      <el-form :model="videoForm">
        <el-form-item label="课时名称" prop="name">
          <el-input v-model="videoForm.videoName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请上传课程视频">
          <el-upload
            list-type="picture-card"
            :action="qnAction"
            :data="qnData"
            :file-list="vfileList"
            :on-success="vuploadPic"
            :before-upload="vbeUpload"
            :limit="1"
            :on-remove="removeVideo">
            <i class="el-icon-plus"></i>
            <div class="el-upload__tip" slot="tip"></div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveVideo">立即添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isLearnNum: true,
      fileList: [],
      vfileList: [],
      firstList: [],
      firstList2: [],
      form: {
        typeB: '',
        typeC: '',
        typeD: '',
      },
      rules: {
        curriculumName: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        upperShelf: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        briefIntroduction: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        teacherName: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      videoList: [],
      videoForm: {},
      dialogFormVisible: false,
      qnData: {
        key: '',
        token:  ''
      },
      qnAction: 'http://up.qiniu.com',
      qnImg: 'http://q8ieryh01.bkt.clouddn.com/',
      imageUrl: ''
    }
  },
  created() {
    this.getFirstList()
    if (this.$route.params.id) {
      request({
        url: '/curriculum/inquiry_course',
        method: 'get',
        params: {curriculumId: this.$route.params.id}
      }).then((res) => {
        this.form = res.data.mCurriculum
        this.form.typeB = res.data.mCurriculum.typeB+""
        this.form.typeC = res.data.mCurriculum.typeC+""
        this.getFirstList2()
        this.videoList = res.data.mVideoList
        this.fileList.push({url: this.form.curriculumImg})
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
      const list = ['', '待审核', '审核不通过', '已上架', '', '已下架']
      return data ? list[data] : '待审核'
    }
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
    removeVideo(file, fileList) {
      this.vfileList = []
      this.videoForm.videoUrl = null
    },
    vuploadPic(response, file, fileList) {
      this.vfileList.push({url: this.qnImg +  response.key})
      this.videoForm.videoUrl = this.qnImg +  response.key
    },
    vbeUpload(file, fileList) {
      this.qnData.key =  new Date().getTime() + file.name
      return true
    },
    typeChange(data) {
      this.form.typeD = ''
      this.getFirstList2()
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
      this.videoForm.videoPosition = this.videoList.length + 1
      this.videoForm.type = 1
      this.videoList.push(this.videoForm)
      this.dialogFormVisible = false
      // TODO 时长
    },
    deleteVideo(idx, item) {
      if (!item.id) {
        this.videoList.splice(idx, 1)
      }
      request({
        url: '/video',
        method: 'post',
        data: [{
          curriculumId: item.curriculumId,
          id: item.id,
          isDelete: true
        }]
      }).then((res) => {
        this.videoList.splice(idx, 1)
      })
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
    }
  }
}
</script>
