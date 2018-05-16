import Vue from 'vue'
import Router from 'vue-router'

import store from '../store' // your vuex store

import Hello from '@/components/Hello'
import tableList from '@/components/tableList'
import tableDetails from '@/components/tableDetails'

import DashboardLayout from '@/components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import Login from '@/components/GeneralViews/Login.vue'
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
// User Views
import UserProfile from '@/components/Dashboard/Views/User/UserProfile.vue'
// Admin pages
import Overview from '@/components/Dashboard/Views/Overview.vue'
import Notifications from '@/components/Dashboard/Views/Notifications.vue'
import Icons from '@/components/Dashboard/Views/Icons.vue'
import Maps from '@/components/Dashboard/Views/Maps.vue'
import Typography from '@/components/Dashboard/Views/Typography.vue'
import TableList from '@/components/Dashboard/Views/TableList.vue'
import StudentDashboard from '@/components/Dashboard/Views/StudentDashboard.vue'
import StudentTimetable from '@/components/Dashboard/Views/StudentTimetable.vue'
import StudentPayment from '@/components/Dashboard/Views/StudentPayment.vue'
/** * LMS
import CourseBoard from '@/components/Dashboard/Views/LMS/CourseBoard'
import CourseOverview from '@/components/Dashboard/Views/LMS/CourseOverview'
import CourseSetup from '@/components/Dashboard/Views/LMS/CourseSetup'
import CourseSetupSessionOrQuiz from '@/components/Dashboard/Views/LMS/CourseSetupSessionOrQuiz'
import Cart from '@/components/Dashboard/Views/LMS/Cart'
*/

import lmsRoutes from '@/modules/lms/_router'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

var baseRoutes = [
  {
    path: '/',
    name: 'Hello',
    component: Hello,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/table',
    name: 'List',
    component: tableList,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/table/new',
    name: 'New',
    component: tableDetails,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/table/:id',
    name: 'Details',
    component: tableDetails,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/student',
    component: DashboardLayout,
      // beforeEnter: ifAuthenticated,
    redirect: '/student/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: StudentDashboard
      },
      {
        path: 'me',
        name: 'me',
        component: UserProfile
      },
      {
        path: 'timetable',
        name: 'timetable',
        component: StudentTimetable
      },
      {
        path: 'payment',
        name: 'payment',
        component: StudentPayment
      }
    ]
  },
  {
    path: '/admin',
    component: DashboardLayout,
    // beforeEnter: ifAuthenticated,
    redirect: '/admin/stats',
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: Overview
      },
      {
        path: 'stats',
        name: 'stats',
        component: UserProfile
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: Notifications
      },
      {
        path: 'icons',
        name: 'icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'maps',
        component: Maps
      },
      {
        path: 'typography',
        name: 'typography',
        component: Typography
      },
      {
        path: 'table-list',
        name: 'table-list',
        component: TableList
      }/*,
      {
        path: 'lms',
        component: CourseBoard,
        redirect: '/admin/lms/courses',
        children: [
        {
          path: 'courses',
            name: 'courses',
            component: CourseBoard
        },
          {
            path: 'courses/course-setup',
            name: 'courseSetup',
            component: CourseSetup
          },
          {
            path: 'courses/course-setup/session-or-quiz',
            name: 'CourseSetupSessionOrQuiz',
            component: CourseSetupSessionOrQuiz
          },
        ]
    } */
    ]
  },
  /* {
    path: '/lms',
    component: DashboardLayout,
    // beforeEnter: ifAuthenticated,
    redirect: '/lms/courses',
    children: [
        {
          path: 'courses',
            name: 'courses',
            component: CourseBoard
        },
          {
            path: 'courses/course-setup',
            name: 'courseSetup',
            component: CourseSetup
          },
          {
            path: 'courses/course-setup/session-or-quiz',
            name: 'courseSetupSessionOrQuiz',
            component: CourseSetupSessionOrQuiz
          },
          {
            path: 'courses/course-view',
            name: 'courseView',
            component: CourseOverview
          },
          {
            path: 'courses/course-view/session-or-quiz',
            name: 'sessionOrQuizView',
            component: CourseOverview
          },
          {
            path: 'cart',
            name: 'courseCart',
            component: Cart
          },
        ]
    }, */
  { path: '*', component: NotFound }

]

const routes = baseRoutes.concat(lmsRoutes)

export default new Router({
  mode: 'history',
  routes: routes
})
