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
          <el-select v-model="form.typeA" placeholder="请选择">
            <el-option v-for="item in firstList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="讲堂分类">
          <el-select @change="typeChange" v-model="form.typeB" placeholder="请选择">
            <el-option label="导师讲堂" value="1"></el-option>
            <el-option label="学长讲堂" value="2"></el-option>
            <el-option label="学员讲堂" value="3"></el-option>
          </el-select>
          <el-select @change="typeChange"  v-model="form.typeC" placeholder="请选择">
            <el-option label="音乐" value="1"></el-option>
            <el-option label="舞蹈" value="2"></el-option>
            <el-option label="留学" value="3"></el-option>
          </el-select>
          <el-select v-model="form.typeD" placeholder="请选择">
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
        <el-form-item label="已学习人数" v-show="isLearnNum">
          <el-col :span="6"><el-input v-model="form.numOfLearners" placeholder="请输入数量"></el-input></el-col>
          <el-col :span="5">&nbsp;&nbsp;&nbsp;人</el-col>
        </el-form-item>
      </el-col>
       <span>&nbsp;</span>
      <el-divider></el-divider>
      <el-button type="primary" @click="onSubmit">新增</el-button>
      <el-row type="flex" justify="end">
        <el-button type="success" @click="add">确认添加</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-row>
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
      }
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
      request({
        url: '/curriculum/add_curriculum',
        method: 'post',
        data: this.form
      }).then((res) => {
      })
    },
    cancel() {},
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
