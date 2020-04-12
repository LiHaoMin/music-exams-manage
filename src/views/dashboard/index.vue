<template>
  <div class="dashboard-container">
    <component v-if="currentRole" :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import teacherDashboard from './teacher'

export default {
  name: 'Dashboard',
  components: { adminDashboard, teacherDashboard },
  data() {
    return {
      currentRole: ''
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (this.roles.includes('-1')) {
      this.currentRole = 'teacherDashboard'
    }
    if (this.roles.includes('1')) {
      this.currentRole = 'adminDashboard'
    }
  }
}
</script>
