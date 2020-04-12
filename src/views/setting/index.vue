<template>
  <div class="app-container">
    <el-card>
      <div class="content">
        <p>账号：// TODO 账号</p>
        <p>密码：********&nbsp;&nbsp;&nbsp;<el-link type="primary" @click="savePass">修改密码</el-link></p>
      </div>
    </el-card>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="密码">
          <el-col :span="12">
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {},
      dialogFormVisible: false
    }
  },
  methods: {
    savePass() {
      this.dialogFormVisible = true
    },
    save() {
      // TODO 保存密码
    }
  }
}
</script>
