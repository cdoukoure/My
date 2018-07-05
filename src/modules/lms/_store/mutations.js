import Vue from 'vue'

const UPDATE_ENTITIES = (state, entities) => {
    // Loop over all kinds of entities we received
    // alert(JSON.stringify(entities))
  for (let type in entities) {
        // alert(type)
    for (let entity in entities[type]) {
            // alert(JSON.stringify(entity))
      var oldObj = state.entities[type][entity] || {}
            // Merge the new data in the old object
      var newObj = Object.assign(oldObj, entities[type][entity])
            // Make sure new entities are also reactive
      Vue.set(state.entities[type], entity, newObj)
            // ex Vue.set(state.entities['courses'], courseObt, newCourseObj)
    }
  }

    // alert(JSON.stringify(entities))
    // Vue.set(state, 'entities', entities)
}

// COURSE_SETUP
const COURSE_SETUP_NEW = (state) => {
    // state.currentCourseId = null
  Vue.set(state, 'currentCourseId', null)
  Vue.set(state, 'currentCourse', {
    id: null,
    title: '',
    subtitle: '',
    description: '',
    image: '',
    badge: '',
    is_free: false,
    price: 0,
    status: 'draft',
    rate: 0,
    author: null,
    skills: [],
    requirements: [],
    sections: [],
    created_date: '',
    last_update: ''
  })
}

const COURSE_SETUP_SELECT = (state, payload) => {
    // state.currentCourseId = payload
  Vue.set(state, 'currentCourseId', payload)
  if (payload !== null) {
        // chargement de la course
    Vue.set(state, 'currentCourse', state.entities.courses[state.currentCourseId])

    if (typeof state.currentCourse.video === 'number') {
      var video = state.entities.files[state.currentCourse.video]
      Vue.delete(state.currentCourse, 'video')
      Vue.set(state.currentCourse, 'video', video)
    }

    if (state.currentCourse.sections.length > 0 && typeof state.currentCourse.sections[0] === 'number') {
      var sections = state.currentCourse.sections.map(Id => state.entities.sections[Id])
      Vue.delete(state.currentCourse, 'sections')
      Vue.set(state.currentCourse, 'sections', sections)
    }

    if (state.currentCourse.skills.length > 0 && typeof state.currentCourse.skills[0] === 'number') {
      var skills = state.currentCourse.skills.map(Id => state.entities.skills[Id])
      Vue.delete(state.currentCourse, 'skills')
      Vue.set(state.currentCourse, 'skills', skills)
    }

    if (state.currentCourse.requirements.length > 0 && typeof state.currentCourse.requirements[0] === 'number') {
      var requirements = state.currentCourse.requirements.map(Id => state.entities.requirements[Id])
      Vue.delete(state.currentCourse, 'requirements')
      Vue.set(state.currentCourse, 'requirements', requirements)
    }

    if (state.currentCourse.files.length > 0 && typeof state.currentCourse.files[0] === 'number') {
      var files = state.currentCourse.files.map(Id => state.entities.files[Id])
      Vue.delete(state.currentCourse, 'files')
      Vue.set(state.currentCourse, 'files', files)
    }
  } else Vue.set(state, 'currentCourse', {})
}

const COURSE_SETUP_GET_FILES = (state, payload) => {

}

const COURSE_SETUP_DESELECT = (state) => {
  state.currentCourse = {}
  state.currentCourseId = null
}

const COURSE_SET_VIDEO = (state, video) => {
  state.currentCourse.video = video
}

const COURSE_SET_IMAGE = (state, image) => {
  state.currentCourse.image = image
}

const COURSE_SET_BADGE = (state, badge) => {
  state.currentCourse.badge = badge
}

const COURSE_SET_TITLE = (state, title) => {
  state.currentCourse.title = title
}

const COURSE_SET_SUBTITLE = (state, subtitle) => {
  state.currentCourse.title = subtitle
}

const COURSE_SET_DESCRIPTION = (state, description) => {
  state.currentCourse.description = description
}

const COURSE_SET_ISFREE = (state, isFree) => {
  state.currentCourse.is_free = isFree
}

const COURSE_SET_PRICE = (state, price) => {
  state.currentCourse.price = price
}

const COURSE_SET_DISCOUNT = (state, discount) => {
  state.currentCourse.discount = discount
}

const COURSE_SET_CURRENCY = (state, currency) => {
  state.currentCourse.currency = currency
}

const COURSE_SET_STATUS = (state, status) => {
  state.currentCourse.status = status
}

const COURSE_SET_RATE = (state, rate) => {
  state.currentCourse.rate = rate
}

const COURSE_SETUP_SKILL_NEW = (state, description) => {
    // alert('COURSE_SETUP_SECTION_NEW')
  state.currentCourse.skills.push(
    {
      id: null,
      description: description,
    })
}

const COURSE_SETUP_SKILL_UPDATE = (state, payload) => {
    // alert(JSON.stringiin    y(payload))
  state.currentCourse.skills[payload.index].description = payload.description
}

const COURSE_SETUP_SKILL_DEL = (state, index) => {
    // alert(JSON.stringiin    y(payload))
  state.currentCourse.skills.splice(index, 1)
}

const COURSE_SETUP_REQ_NEW = (state, description) => {
    // alert('COURSE_SETUP_SECTION_NEW')
  state.currentCourse.skills.push(
    {
      id: null,
      description: description,
    })
}

const COURSE_SETUP_REQ_UPDATE = (state, payload) => {
    // alert(JSON.stringiin    y(payload))
  state.currentCourse.skills[payload.index].description = payload.description
}

const COURSE_SETUP_REQ_DEL = (state, index) => {
    // alert(JSON.stringiin    y(payload))
  state.currentCourse.skills.splice(index, 1)
}

const COURSE_SETUP_SECTION_NEW = (state, title) => {
    // alert('COURSE_SETUP_SECTION_NEW')
  state.currentCourse.sections.push(
    {
      id: null,
      title: title,
      session_or_quizs: []
    })
}

const COURSE_SETUP_SECTION_UPDATE = (state, payload) => {
    // alert(JSON.stringiin    y(payload))
  state.currentCourse.sections[payload.sectionIndex].title = payload.title
}

const COURSE_SETUP_SECTION_DEL = (state, sectionIndex) => {
    // alert(JSON.stringiin    y(payload))
  state.currentCourse.sections.splice(sectionIndex, 1)
}

// COURSE_SETUP_SESSION_OR_QUIZ_NEW
const COURSE_SETUP_SESSION_OR_QUIZ_NEW = (state, payload) => {
  state.currentSessionOrQuizId = null
  state.currentSessionOrQuiz = {
    id: null,
    type: payload.type,
    content: '',
    title: '',
    description: '',
    ressources: [],
    tracks: [],
    questions: [],
    section_id: payload.sectionId
  }
}

const COURSE_SETUP_SESSION_OR_QUIZ_SELECT = (state, payload) => {
  state.currentSessionOrQuizId = payload
  if (payload !== null) {
        // chargement de la session_or_quiz
    state.currentSessionOrQuiz = state.entities.session_or_quizs[state.currentSessionOrQuizId]

    if (typeof state.currentSessionOrQuiz.video === 'number') {
      var video = state.entities.files[state.currentSessionOrQuiz.video]
      Vue.delete(state.currentSessionOrQuiz, 'video')
      Vue.set(state.currentSessionOrQuiz, 'video', video)
    }
        // alert(state.currentSessionOrQuiz.ressources.length)
    if (state.currentSessionOrQuiz.ressources.length > 0 && typeof state.currentSessionOrQuiz.ressources[0] === 'number') {
            // alert('OK')
      var ressources = state.currentSessionOrQuiz.ressources.map(Id => state.entities.ressources[Id])
      Vue.delete(state.currentSessionOrQuiz, 'ressources')
      Vue.set(state.currentSessionOrQuiz, 'ressources', ressources)
    }
    if (state.currentSessionOrQuiz.tracks.length > 0 && typeof state.currentSessionOrQuiz.tracks[0] === 'number') {
      var tracks = state.currentSessionOrQuiz.tracks.map(Id => state.entities.tracks[Id])
      Vue.delete(state.currentSessionOrQuiz, 'tracks')
      Vue.set(state.currentSessionOrQuiz, 'tracks', tracks)
    }
    if (state.currentSessionOrQuiz.questions.length > 0 && typeof state.currentSessionOrQuiz.questions[0] === 'number') {
      var questions = state.currentSessionOrQuiz.questions.map(Id => state.entities.questions[Id])
      questions.forEach(question => {
                              // Comprendre pourquoi question.responses ne se reinitialis e pas a chaq chargement
        if (question.responses.length > 0 && typeof question.responses[0] === 'number') {
          var responses = question.responses.map(It => state.entities.responses[It])
          Vue.delete(question, 'responses')
          Vue.set(question, 'responses', responses)
        }
      })
      Vue.delete(state.currentSessionOrQuiz, 'questions')
      Vue.set(state.currentSessionOrQuiz, 'questions', questions)
    }
        // alert(JSON.stringify(questions))
        // return questions
  } else state.currentSessionOrQuiz = {}
}

const COURSE_SETUP_SESSION_OR_QUIZ_DESELECT = (state) => {
  state.currentSessionOrQuiz = {}
  state.currentSessionOrQuizId = null
}

const SESSION_OR_QUIZ_SET_VIDEO = (state, payload) => {
  Vue.set(state.currentSessionOrQuiz, 'video', payload)
}

const SESSION_OR_QUIZ_SET_TEXT = (state, payload) => {
  state.currentSessionOrQuiz.text = payload
}

const SESSION_OR_QUIZ_SET_TITLE = (state, content) => {
  state.currentSessionOrQuiz.name = content
}

const SESSION_OR_QUIZ_SET_DESCRIPTION = (state, content) => {
  state.currentSessionOrQuiz.description = content
}

const SESSION_OR_QUIZ_SET_DURATION = (state, content) => {
  state.currentSessionOrQuiz.duration = content
}

const SESSION_OR_QUIZ_SET_MINRESULT = (state, content) => {
  state.currentSessionOrQuiz.min_result = content
}

const SESSION_RESOURCE_ADD = (state, payload) => {
  state.currentSessionOrQuiz.ressources.push(payload)
}

const SESSION_RESOURCE_DELETE = (state, resIndex) => {
  state.currentSessionOrQuiz.ressources.splice(resIndex, 1)
    // ressources.splice(resIndex, 1)
    // state.currentSessionOrQuiz.ressources = ressources
}

const QUIZ_QUESTION_ADD = (state, itemType) => {
  if (itemType === 'code' || itemType === 'text') {
    state.currentSessionOrQuiz.questions.push(
      {
        id: null,
        type: itemType,
        question: '',
        responses: [
          {
            id: null,
            response: '',
            isRight: true,
            note: ''
          }
        ],
        point: 0
      })
  } else {
    state.currentSessionOrQuiz.questions.push(
      {
        id: null,
        type: itemType,
        question: '',
        responses: [],
        point: 0
      })
  }
}

const QUIZ_QUESTION_DELETE = (state, questionIndex) => {
  var questions = state.currentSessionOrQuiz.questions
  questions.splice(questionIndex, 1)
    // state.currentSessionOrQuiz.questions = questions
  Vue.set(state.currentSessionOrQuiz, 'questions', questions)
}

const QUIZ_QUESTION_RESPONSE_ADD = (state, questionIndex) => {
  state.currentSessionOrQuiz
    .questions[questionIndex]
    .responses.push(
    {
      id: null,
      response: '',
      isRight: true,
      note: ''
    })
}

const QUIZ_QUESTION_RESPONSE_DELETE = (state, payload) => {
  var questions = state.currentSessionOrQuiz.questions
  questions[payload.questionIndex].responses.splice(payload.responseIndex, 1)
    // state.currentSessionOrQuiz.questions = questions
  Vue.set(state.currentSessionOrQuiz, 'questions', questions)
}

const CART_CLEAR = (state) => {
    state.cart = []
    state.cartTotal = 0
    // state.totalAmount = 0
}

const CART_ITEM_REMOVE = (state, courseId) => {
    // state.cartTotal--
    if (state.cart.indexOf(courseId) > -1) {
        // state.cart[course.id].count--
        state.cart.splice(state.cart.indexOf(courseId), 1)
        state.cartTotal--
        // state.cartTotalAmount = state.cartTotalAmount - course.total
    }
}

const CART_ITEM_ADD = (state, courseId) => {
    // alert("CART_ITEM_ADD")
    // state.cartTotalAmount = state.cartTotalAmount + course.total
    if (state.cart.indexOf(courseId) > -1) {
      // state.cart[course.id].count++ Only one for course
      
    } else {
      // let stateItem = Object.assign({}, course)
      // stateItem.count = 1
      state.cart.push(courseId)
      state.cartTotal++
    }
}

const CART_COMPUTE_TOTAL = (state) => {    
    // alert("CART_COMPUTE_TOTAL")
    var courseInCart = state.cart.map(Id => state.entities.courses[Id])
    state.cartTotalAmount = 0
    courseInCart.forEach(course => {
        state.cartTotalAmount = state.cartTotalAmount + course.total
    })
}

export default {
  UPDATE_ENTITIES,
  COURSE_SETUP_NEW,
  COURSE_SETUP_SELECT,
  COURSE_SETUP_DESELECT,
  COURSE_SET_VIDEO,
  COURSE_SET_IMAGE,
  COURSE_SET_BADGE,
  COURSE_SET_TITLE,
  COURSE_SET_SUBTITLE,
  COURSE_SET_DESCRIPTION,
  COURSE_SET_ISFREE,
  COURSE_SET_PRICE,
  COURSE_SET_DISCOUNT,
  COURSE_SET_CURRENCY,
  COURSE_SET_STATUS,
  COURSE_SET_RATE,
  COURSE_SETUP_SKILL_NEW,
  COURSE_SETUP_SKILL_UPDATE,
  COURSE_SETUP_SKILL_DEL,
  COURSE_SETUP_REQ_NEW,
  COURSE_SETUP_REQ_UPDATE,
  COURSE_SETUP_REQ_DEL,
  COURSE_SETUP_SECTION_NEW,
  COURSE_SETUP_SECTION_UPDATE,
  COURSE_SETUP_SECTION_DEL,
  COURSE_SETUP_SESSION_OR_QUIZ_NEW,
  COURSE_SETUP_SESSION_OR_QUIZ_SELECT,
  COURSE_SETUP_SESSION_OR_QUIZ_DESELECT,
  SESSION_OR_QUIZ_SET_TITLE,
  SESSION_OR_QUIZ_SET_DESCRIPTION,
  SESSION_OR_QUIZ_SET_VIDEO,
  SESSION_OR_QUIZ_SET_TEXT,
  SESSION_OR_QUIZ_SET_DURATION,
  SESSION_RESOURCE_ADD,
  SESSION_RESOURCE_DELETE,
  QUIZ_QUESTION_ADD,
  QUIZ_QUESTION_DELETE,
  QUIZ_QUESTION_RESPONSE_ADD,
  QUIZ_QUESTION_RESPONSE_DELETE,
  // Shopping
  CART_CLEAR,
  CART_ITEM_REMOVE,
  CART_ITEM_ADD,
  CART_COMPUTE_TOTAL
}
