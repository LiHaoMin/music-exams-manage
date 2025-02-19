import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

export const asyncRoutes = [
  {
    path: '/course',
    component: Layout,
    name: 'CourseManagement',
    alwaysShow: true,
    meta: {
      title: '课程管理',
      icon: 'example',
      roles: ['2']
    },
    children: [
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/course/category/index'),
        meta: { title: '课程分类', roles: ['2'] }
      },
      {
        path: 'online',
        name: 'online',
        component: () => import('@/views/course/online/index'),
        meta: { title: '线上课程', roles: ['2'] }
      },
      {
        path: 'online-edit',
        name: 'onlineEdit',
        hidden: true,
        component: () => import('@/views/course/online/Edit'),
        meta: { title: '线上课程', roles: ['2'] }
      },
      {
        path: 'offline',
        name: 'offline',
        component: () => import('@/views/course/offline/index'),
        meta: { title: '线下课程', roles: ['2'] }
      },
      {
        path: 'offline-edit',
        name: 'offlineEdit',
        hidden: true,
        component: () => import('@/views/course/offline/Edit'),
        meta: { title: '线下课程', roles: ['2'] }
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    name: 'CourseManagement',
    meta: {
      title: '课程管理',
      icon: 'example',
      roles: ['-1']
    },
    children: [
      {
        path: 'online',
        name: 'online',
        component: () => import('@/views/course/online/index'),
        meta: { title: '课程管理', icon: 'example', roles: ['-1'] }
      },
      {
        path: 'online-edit',
        name: 'onlineEdit',
        hidden: true,
        component: () => import('@/views/course/online/Edit'),
        meta: { title: '', roles: ['-1'] }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    name: 'OrderManagement',
    meta: {
      title: '账单管理',
      icon: 'example',
      roles: ['3']
    },
    children: [
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/order/index'),
        meta: { title: '账单管理', roles: ['3'] }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'UserManagement',
    meta: { title: '用户管理', icon: 'example', roles: ['4'] },
    children: [
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/user/student/index'),
        meta: { title: '学员', roles: ['4'] }
      },
      {
        path: 'teacher',
        name: 'Teacher',
        component: () => import('@/views/user/teacher/index'),
        meta: { title: '讲师', roles: ['4'] }
      },
      {
        path: 'teacher-edit',
        name: 'TeacherEdit',
        hidden: true,
        component: () => import('@/views/user/teacher/Edit'),
        meta: { title: '', roles: ['4'] }
      }
    ]
  },
  {
    path: '/swipe',
    component: Layout,
    name: 'SwipeManagement',
    meta: { title: '轮播图管理', icon: 'example', roles: ['5'] },
    children: [
      {
        path: 'swipe',
        name: 'Swipe',
        component: () => import('@/views/swipe/index'),
        meta: { title: '轮播图', roles: ['5']}
      },
      {
        path: 'swipe-edit',
        name: 'SwipeEdit',
        hidden: true,
        component: () => import('@/views/swipe/Edit'),
        meta: { title: '', roles: ['5'] }
      },
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'SystemManagement',
    meta: { title: '系统设置', icon: 'example', roles: ['7'] },
    children: [
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/system/index'),
        meta: { title: '管理员设置', roles: ['7'] }
      },
      {
        path: 'admin-edit',
        name: 'AdminEdit',
        hidden: true,
        component: () => import('@/views/system/Edit'),
        meta: { title: '', roles: ['7'] }
      }
    ]
  },
  {
    path: '/service',
    component: Layout,
    name: 'ServiceManagement',
    meta: { title: '客服管理', icon: 'example', roles: ['6'] },
    children: [
      {
        path: 'customer-service',
        name: 'CustomerService',
        component: () => import('@/views/service/index'),
        meta: { title: '客服管理', roles: ['6'] }
      },
    ]
  },
  {
    path: '/income',
    component: Layout,
    name: 'IncomeManagement',
    meta: { title: '', icon: 'example', roles: ['-1'] },
    children: [
      {
        path: 'income-index',
        name: 'Income',
        component: () => import('@/views/income/index'),
        meta: { title: '课程收益', roles: ['-1'] }
      },
    ]
  },
  {
    path: '/setting',
    component: Layout,
    name: 'SettingManagement',
    meta: { title: '', icon: 'example', roles: ['-1'] },
    children: [
      {
        path: 'setting-index',
        name: 'Setting',
        component: () => import('@/views/setting/index'),
        meta: { title: '账号设置', roles: ['-1'] }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
