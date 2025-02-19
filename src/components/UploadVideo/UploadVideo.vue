<template>
  <div class="ele-upload-video">
    <!-- 上传组件 -->
    <el-upload
      :accept="accept"
      :action="action"
      :before-upload="handleBeforeUploadVideo"
      :data="data"
      :disabled="videoUploadPercent > 0 && videoUploadPercent < 100"
      :headers="headers"
      :httpRequest="httpRequest"
      :list-type="drag ? 'picture' : 'picture-card'"
      :name="name"
      :on-error="handleUploadError"
      :on-progress="handleUploadProcess"
      :on-success="handleUploadSuccess"
      :show-file-list="false"
      :withCredentials="withCredentials"
      v-if="!value"
    >
      <!-- 上传进度 -->
      <el-progress
        :percentage="videoUploadPercent"
        style="margin-top: 10px;"
        type="circle"
        v-if="videoUploadPercent > 0"
      />

      <template v-else>
        <template v-if="drag">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </template>

        <!-- 非drag -->
        <template v-else>
          <div :style="{ width: size + 'px', height: size + 'px', lineHeight: size + 'px' }">
            <i class="el-icon-plus"></i>
          </div>
        </template>

        <!-- 上传提示 -->
        <div
          class="el-upload__tip"
          slot="tip"
          v-if="showTip"
        >
          请上传
          <span
            style="color: #F56C6C"
          >&nbsp;{{this.fileType ? this.fileType.join('/') : '视频'}}&nbsp;</span>格式文件
          <template v-if="fileSize">
            ，且文件大小不超过
            <span style="color: #F56C6C">{{fileSize}}</span>&nbsp;MB
          </template>
        </div>
      </template>
    </el-upload>

    <!-- 视频缩略 -->
    <vue-hover-mask v-if="value">
      <img
        :autoplay="false"
        :src="value + thumbSuffix"
        :style="{width: size + 'px', height: size ? size + 'px' : 'auto'}"
      />
      <template v-slot:action>
        <span
          @click="handlePlayerVideo"
          class="ele-upload-video_mask__item"
        >
          <i class="el-icon-video-play"></i>
        </span>
        <span
          @click="handleDeleteVideo"
          class="ele-upload-video_mask__item"
        >
          <i class="el-icon-delete"></i>
        </span>
      </template>
    </vue-hover-mask>

    <!-- 弹窗播放 -->
    <el-dialog
      :visible.sync="isShowVideo"
      append-to-body
    >
      <video
        :autoplay="true"
        :src="value"
        controls="controls"
        style="width: 100%"
        v-if="isShowVideo"
      >您的浏览器不支持视频播放</video>
    </el-dialog>
  </div>
</template>

<script>
import VueHoverMask from 'vue-hover-mask/src/index'

export default {
  name: 'EleUploadVideo',
  components: {
    VueHoverMask
  },
  props: {
    // 值
    value: {
      type: String
    },
    // 上传地址
    action: {
      type: String,
      required: true
    },
    // 响应处理函数
    responseFn: Function,
    // 文件大小限制(Mb)
    fileSize: {
      type: Number
    },
    // 缩略图后缀, 例如七牛云缩略图样式 (?imageView2/1/w/20/h/20)
    thumbSuffix: {
      type: String,
      default: ''
    },
    // 图片显示大小
    size: {
      type: Number,
      default: 150
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true
    },
    // 文件类型
    fileType: {
      type: Array
    },
    // 设置上传的请求头部(同官网)
    headers: Object,
    // 支持发送 cookie 凭证信息 (同官网)
    withCredentials: {
      type: Boolean,
      default: false
    },
    // 是否启用拖拽上传 (同官网)
    drag: {
      type: Boolean,
      default: false
    },
    // 上传时附带的额外参数(同官网)
    data: {
      type: Object
    },
    // 上传的文件字段名 (同官网)
    name: {
      type: String,
      default: 'file'
    },
    // 覆盖默认的上传行为，可以自定义上传的实现 (同官网)
    httpRequest: Function,
    // 接受上传的文件类型（thumbnail-mode 模式下此参数无效）(同官网)
    accept: String
  },
  data () {
    return {
      isShowVideo: false,
      videoUploadPercent: 0
    }
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize)
    }
  },
  methods: {
    // 上传大小和格式检测
    handleBeforeUploadVideo (file) {
      // 校检格式
      let isVideo = false
      if (Array.isArray(this.fileType)) {
        const type = file.type.split('/')
        isVideo = type[0] === 'video' && this.fileType.includes(type[1])
      } else {
        isVideo = file.type.includes('video')
      }

      if (!isVideo) {
        this.$message.error(`${file.name}格式不正确, 请上传格式正确的视频`)
        return false
      }

      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize
        if (!isLt) {
          this.$message.error(`上传视频大小不能超过${this.fileSize}MB哦!`)
          return false
        }
      }
      return true
    },

    // 上传进度
    handleUploadProcess (event, file) {
      this.videoUploadPercent = Number(event.total.percent.toFixed(0))
    },

    // 上传成功
    handleUploadSuccess (response, file) {
      this.videoUploadPercent = 0
      this.$message.success('上传成功!')
      if (this.responseFn) {
        this.$emit('input', this.responseFn(response, file))
      } else {
        this.$emit('input', response)
      }
    },

    // 上传失败
    handleUploadError (err, file, fileList) {
      this.$message.error('上传失败, 请重试!')
      this.videoUploadPercent = 0
      this.$emit('error', err, file, fileList)
    },

    // 删除视频
    handleDeleteVideo () {
      this.$emit('delete')
      this.$emit('input', null)
    },

    // 播放视频
    handlePlayerVideo () {
      this.isShowVideo = true
    }
  }
}
</script>

<style>
  .ele-upload-video_mask__item {
    padding: 0 10px;
  }

  .ele-upload-video .el-upload__tip {
    line-height: 12px;
  }
</style>
