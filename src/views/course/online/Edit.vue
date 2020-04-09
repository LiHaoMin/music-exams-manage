<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules"  :model="form" >
      <el-col :span="11">
        <el-form-item label="课程名称" prop="curriculumName">
          <el-input v-model="form.curriculumName"></el-input>
        </el-form-item>
        <el-form-item label="课程封面" prop="pic">
          <el-upload
            class="upload-demo"
            drag
            :limit="1"
            :file-list="fileList"
            action="https://jsonplaceholder.typicode.com/posts/">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
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
          <el-select ref="typeA" v-model="form.typeA" placeholder="请选择">
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
        <el-form-item label="学习人数">
          <el-switch
            v-model="isLearnNum"
            active-text="自定义数据"
            inactive-text="系统数据">
          </el-switch>
        </el-form-item>
        <el-form-item label="已学习人数" v-if="isLearnNum">
          <el-col :span="6"><el-input v-model="form.numOfLearners" placeholder="请输入数量"></el-input></el-col>
          <el-col :span="5">&nbsp;&nbsp;&nbsp;人</el-col>
        </el-form-item>
      </el-col>
      <span>&nbsp;</span>
      <el-divider></el-divider>
      <el-row v-if="videoList.length > 0">
        <div :key="index" v-for="(item,index) in videoList">
          <p>第1节</p>
          <el-col :span="6">课时名称：{{item.videoName}}</el-col>
          <el-col :span="6">时长：</el-col>
          <el-col :span="6">一级分类：{{item.firstCate}}</el-col>
          <el-col :span="6">讲堂分类：{{item.typeCate}}</el-col>
        </div>
      </el-row>
      <el-row>
        <el-col></el-col>
        <el-col><el-button type="primary" @click="addVideo">新增</el-button></el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-button type="success" @click="add">确认添加</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-row>
      <el-dialog :title="'第' + (videoList.length + 1) + '节'" :visible.sync="dialogFormVisible">
        <el-form :model="videoForm">
          <el-form-item label="课时名称" prop="name">
            <el-input v-model="videoForm.videoName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="课时名称" prop="name">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :limit="1">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveVideo">立即添加</el-button>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      isLearnNum: true,
      fileList: [],
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
      dialogFormVisible: false
    }
  },
  created() {
    this.getFirstList()
  },
  methods: {
    typeChange(data) {
      this.form.typeD = ''
      this.getFirstList2()
    },
    add() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert(JSON.stringify(this.form))
        }
      })
      this.form.videoList = this.videoList
      request({
        url: '/curriculum/add_curriculum',
        method: 'post',
        data: this.form
      }).then((res) => {
      })
    },
    cancel() {
      this.$router.back()
    },
    addVideo() {
      this.videoForm = {}
      this.dialogFormVisible = true
    },
    saveVideo() {
      this.videoForm.firstCate = this.$refs.typeA.$data.selected.label
      let typeB = this.$refs.typeB.$data.selected.label ? this.$refs.typeB.$data.selected.label : ''
      let typeC = this.$refs.typeC.$data.selected.label ? this.$refs.typeC.$data.selected.label : ''
      let typeD = this.$refs.typeD.$data.selected.label ? this.$refs.typeD.$data.selected.label : ''
      this.videoForm.typeCate = typeB + '-' + typeC + '-' + typeD
      this.videoList.push(this.videoForm)
      this.dialogFormVisible = false
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
