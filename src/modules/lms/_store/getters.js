import find from 'lodash/find'

const courseSet = state => state.entities.courses

const courseById = (state) => (id) => state.entities.courses[id]

const currentCourseId = state => state.currentCourseId

const currentCourse = state => state.currentCourse

const sectionByIdSessionOrQuizSet = (state) => (id) => {
  var ses_or_quizs = state.entities.sections[id].session_or_quizs
  return ses_or_quizs.map(sessionOrQuizId => state.entities.session_or_quizs[sessionOrQuizId])
}

const getCourseVideoFiles = (state) => {
  let videoFormat = ['video/mp4', 'video/ogg', 'video/webm', 'video/x-flv']
  var videoFiles = []
            // alert(videoFormat)
  if (state.currentCourseId) {
    state.currentCourse.files.forEach(fil => {
                // alert(fil.format)
      if (videoFormat.indexOf(fil.format) > -1) {
        videoFiles.push(fil)
      }
    })
  }
    // alert(JSON.stringify(videoFiles))
  return videoFiles
}

const sessionOrQuizSet = state => state.entities.session_or_quizs

const sessionOrQuizById = (state) => (id) => state.entities.session_or_quizs[id]

const currentSessionOrQuizId = state => state.currentSessionOrQuizId

const currentSessionOrQuiz = state => state.currentSessionOrQuiz

const questionByIdResponseSet = (state) => (id) => {
  var responses = state.entities.questions[id].responses
  return responses.map(Id => state.entities.responses[Id])
}

const questionById = (state) => (id) => state.entities.questions[id]

const responseSet = state => state.entities.responses

const questionSet = state => state.entities.questions

const ressourceSet = state => state.entities.ressources

const trackSet = state => state.entities.tracks

const requirementSet = state => state.entities.requirements

const skillSet = state => state.entities.skills

const sectionSet = state => state.entities.sections

const cartCourses = (state) => {
    /*
    return state.added.map(({ id, quantity }) => {
    
        const product = state.entities.products.find(p => p.id === id)

        return {
            name: product.name,
            price: product.price,
            quantity
        }
    })
    */
    // return this.$store.getters['$_lms/courseSet']
    return state.cart.map(Id => state.entities.courses[Id])

}

const cartTotalAmount = state => state.cartTotalAmount

const cartTotal = state => state.cartTotal

export default {
  courseSet,
  courseById,
  currentCourseId,
  currentCourse,
  getCourseVideoFiles,
  sectionByIdSessionOrQuizSet,
  sessionOrQuizSet,
  sessionOrQuizById,
  currentSessionOrQuizId,
  currentSessionOrQuiz,
  questionByIdResponseSet,
  questionById,
  responseSet,
  questionSet,
  ressourceSet,
  trackSet,
  requirementSet,
  skillSet,
  sectionSet,
  cartCourses,
  cartTotal,
  cartTotalAmount
}
