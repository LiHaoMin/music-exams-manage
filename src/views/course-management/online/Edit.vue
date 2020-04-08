<template>
  <div class="app-container">
    <el-form ref="form" :model="form">
      <el-col :span="11">
        <el-form-item label="课程名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="课程封面">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="课程状态">
          <el-col :span="12">
            <el-switch
              :value="true"
              active-text="上架状态"
              inactive-text="下架状态">
            </el-switch>
          </el-col>
          <el-col :span="6">
            <el-radio label="1">勾选免费</el-radio>
          </el-col>
        </el-form-item>
        <el-form-item label="课程简介">
          <el-input type="textarea" :rows="5" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="2">
        <el-form-item label="讲师名称">
          <el-input placeholder="请输入名称" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="讲师尊称">
          <el-input placeholder="请输入名称" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="讲师介绍">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="一级分类">
          <el-select placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="讲堂分类">
          <el-select placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-select placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-select placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学习人数">
          <el-switch
            :value="true"
            active-text="自定义数据"
            inactive-text="系统数据">
          </el-switch>
        </el-form-item>
        <el-form-item label="已学习人数">
          <el-col :span="6"><el-input placeholder="请输入数量"></el-input></el-col>
          <el-col :span="5">&nbsp;&nbsp;&nbsp;人</el-col>
        </el-form-item>
      </el-col>
       <span>&nbsp;</span>
      <el-divider></el-divider>
      <el-button type="primary" @click="onSubmit">新增</el-button>
      <el-row type="flex" justify="end">
        <el-button type="success" @click="onSubmit">确认添加</el-button>
        <el-button @click="onSubmit">取消</el-button>
      </el-row>
<!--      <el-form-item label="活动区域">-->
<!--        <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--          <el-option label="区域一" value="shanghai"></el-option>-->
<!--          <el-option label="区域二" value="beijing"></el-option>-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="活动时间">-->
<!--        <el-col :span="11">-->
<!--          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>-->
<!--        </el-col>-->
<!--        <el-col class="line" :span="2">-</el-col>-->
<!--        <el-col :span="11">-->
<!--          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>-->
<!--        </el-col>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="即时配送">-->
<!--        <el-switch v-model="form.delivery"></el-switch>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="活动性质">-->
<!--        <el-checkbox-group v-model="form.type">-->
<!--          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>-->
<!--          <el-checkbox label="地推活动" name="type"></el-checkbox>-->
<!--          <el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
<!--          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
<!--        </el-checkbox-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="特殊资源">-->
<!--        <el-radio-group v-model="form.resource">-->
<!--          <el-radio label="线上品牌商赞助"></el-radio>-->
<!--          <el-radio label="线下场地免费"></el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="活动形式">-->
<!--        <el-input type="textarea" v-model="form.desc"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button type="primary" @click="onSubmit">立即创建</el-button>-->
<!--        <el-button>取消</el-button>-->
<!--      </el-form-item>-->
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
