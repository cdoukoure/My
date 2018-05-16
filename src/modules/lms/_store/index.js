import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  entities: {
    requirements: {},
    skills: {},
    sections: {},
    session_or_quizs: {},
    taken_session_or_quizs: {},
    files: {},
    ressources: {},
    tracks: {},
    questions: {},
    responses: {},
    courses: {}
  },
  currentCourseId: null,
  currentCourse: {},
  currentCourseId: null,
  currentCourse: {},
  currentSessionOrQuizId: null,
  currentSessionOrQuiz: {},
  cartTotal: 0,
  cartTotalAmount: 0,
  cart: [],
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
