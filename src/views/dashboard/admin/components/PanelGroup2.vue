<template>
  <el-card>
    <div slot="header">平台数据</div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <i class="el-icon-s-custom"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              用户数量
            </div>
            <count-to :start-val="0" :end-val="form.num" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-icon-wrapper icon-message">
            <i class="el-icon-s-claim"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              讲师数量
            </div>
            <count-to :start-val="0" :end-val="form.teacher" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-money">
            <i class="el-icon-s-shop"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              总营收
            </div>
            <count-to :start-val="0" :end-val="form.money" decimals="2" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-icon-wrapper icon-shopping">
            <i class="el-icon-s-cooperation"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              平台余额
            </div>
            <count-to :start-val="0" :end-val="form.balance" decimals="2" :duration="3600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import CountTo from 'vue-count-to'
import request from '@/utils/request'

export default {
  data() {
    return {
      form: {}
    }
  },
  components: {
    CountTo
  },
  created() {
    request({
      url: '/order/platform_dataBean',
      method: 'post',
    }).then((res) => {
      this.form = res.data
    })
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
      font-size: 48px;
    }

    .icon-message {
      color: #36a3f7;
      font-size: 48px;
    }

    .icon-money {
      color: #f4516c;
      font-size: 48px;
    }

    .icon-shopping {
      color: #34bfa3;
      font-size: 48px;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
