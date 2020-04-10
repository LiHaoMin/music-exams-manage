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
  },

  /*{
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }*/
]

export const asyncRoutes = [
  {
    path: '/course',
    component: Layout,
    name: 'CourseManagement',
    meta: {
      title: '课程管理',
      icon: 'example',
      roles: ['1']
    },
    children: [
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/course/category/index'),
        meta: { title: '课程分类', icon: 'table' }
      },
      {
        path: 'online',
        name: 'online',
        component: () => import('@/views/course/online/index'),
        meta: { title: '线上课程', icon: 'table' }
      },
      {
        path: 'online-edit',
        name: 'onlineEdit',
        hidden: true,
        component: () => import('@/views/course/online/Edit'),
        meta: { title: '课程', icon: 'table' }
      },
      {
        path: 'offline',
        name: 'offline',
        component: () => import('@/views/course/offline/index'),
        meta: { title: '线下课程', icon: 'table' }
      },
      {
        path: 'offline-edit',
        name: 'offlineEdit',
        hidden: true,
        component: () => import('@/views/course/offline/Edit'),
        meta: { title: '课程', icon: 'table' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    name: 'OrderManagement',
    children: [
      {
        path: 'order',
        name: 'Order',
        component: () => import('@/views/order/index'),
        meta: { title: '账单管理', icon: 'example' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'UserManagement',
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/user/student/index'),
        meta: { title: '学员', icon: 'example' }
      },
      {
        path: 'teacher',
        name: 'Teacher',
        component: () => import('@/views/user/teacher/index'),
        meta: { title: '讲师', icon: 'example' }
      }
    ]
  },
  {
    path: '/swipe',
    component: Layout,
    name: 'SwipeManagement',
    meta: { title: '轮播图管理', icon: 'example' },
    children: [
      {
        path: 'swipe',
        name: 'Swipe',
        component: () => import('@/views/swipe/index'),
        meta: { title: '轮播图', icon: 'example' }
      },
      {
        path: 'swipe-edit',
        name: 'SwipeEdit',
        hidden: true,
        component: () => import('@/views/swipe/Edit'),
        meta: { title: '', icon: 'example' }
      },
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'SystemManagement',
    meta: { title: '系统设置', icon: 'example' },
    children: [
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/system/index'),
        meta: { title: '管理员设置', icon: 'example' }
      },
      {
        path: 'admin-edit',
        name: 'AdminEdit',
        hidden: true,
        component: () => import('@/views/system/Edit'),
        meta: { title: '', icon: 'example' }
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
