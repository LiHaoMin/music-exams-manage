<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="一级分类设置" name="first">
        <FirstTab />
      </el-tab-pane>
      <el-tab-pane label="导师讲堂分类设置" name="teacher">
        <TeacherTab />
      </el-tab-pane>
      <el-tab-pane label="学长讲堂分类设置" name="senior">
        <SeniorTab />
      </el-tab-pane>
      <el-tab-pane label="学员讲堂分类设置" name="student">
        <StudentTab />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FirstTab from '@/views/course/category/FirstTab'
import TeacherTab from '@/views/course/category/TeacherTab'
import SeniorTab from '@/views/course/category/SeniorTab'
import StudentTab from '@/views/course/category/StudentTab'

export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  components: {
    FirstTab,
    TeacherTab,
    SeniorTab,
    StudentTab
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
