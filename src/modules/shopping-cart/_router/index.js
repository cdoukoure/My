import DashboardLayout from '@/components/Dashboard/Layout/DashboardLayout.vue'

import store from '../../../store' // your vuex store

import CourseBoard from '../index'
import CourseOverview from '../_components/CourseOverview'
import CourseSetup from '../_components/CourseSetup'
import CourseSetupSessionOrQuiz from '../_components/CourseSetupSessionOrQuiz'
import CourseRunning from '../_components/CourseRunning'

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

export default [
  {
    path: '/lms',
    name: 'lms',
    component: DashboardLayout,
    title: 'Learning Management System',
    // icon: 'fa-users',
    redirect: { name: 'courses' },
    // beforeEnter: ifAuthenticated,
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
        name: 'sessionOrQuizSetup',
        component: CourseSetupSessionOrQuiz
      },
      {
        path: 'courses/course-view',
        name: 'courseView',
        component: CourseOverview
      },
      {
        path: 'courses/course-view/session-or-quiz',
        name: 'courseRunning',
        component: CourseRunning
      }
    ]
  }
]
