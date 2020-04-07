<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="一级分类设置" name="first">
        <FirstTab />
      </el-tab-pane>
      <el-tab-pane label="导师讲堂分类设置" name="second">导师讲堂分类设置</el-tab-pane>
      <el-tab-pane label="学长讲堂分类设置" name="third">学长讲堂分类设置</el-tab-pane>
      <el-tab-pane label="学员讲堂分类设置" name="fourth">学员讲堂分类设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FirstTab from '@/views/course-management/category/FirstTab'

export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  components: {
    FirstTab
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
