import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import find from 'lodash/find'
import clone from 'lodash/clone'
import { normalize, schema } from 'normalizr'

Vue.use(Vuex)

// Define a schema
const ressourceEntity = new schema.Entity('ressources')

const responseEntity = new schema.Entity('responses')

const skillEntity = new schema.Entity('skills')

const requirementEntity = new schema.Entity('requirements')

const trackEntity = new schema.Entity('tracks')

const questionEntity = new schema.Entity('questions', {
  responses: [responseEntity]
})

const takenSessionOrQuizEntity = new schema.Entity('taken_session_or_quizs')

const sessionOrquizEntity = new schema.Entity('session_or_quizs', {
  ressources: [ressourceEntity],
  tracks: [trackEntity],
  questions: [questionEntity],
  taken_session_or_quizs: [takenSessionOrQuizEntity]
})

const sectionEntity = new schema.Entity('sections', {
  session_or_quizs: [sessionOrquizEntity]
})

const courseEntity = new schema.Entity('courses', {
  sections: [sectionEntity],
  skills: [skillEntity],
  requirements: [requirementEntity]
})

const mySchema = { courses: [ courseEntity ] }

// Define your article

const state = {
  entities: {
    requirements: {},
    skills: {},
    sections: {},
    session_or_quizs: {},
    ressources: {},
    tracks: {},
    questions: {},
    responses: {},
    courses: {}
  },
  settings: {
    general: {
      logo: '',
      school_name: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      school_code: '',
      language: '',
      languageRTL: false,
      timezone: 'UTC',
      dateformat: 'dd/mm/yyyy',
      currency: 'USD',
      currency_symbol: '$',
      date: '',
      active_school_year: '2018/2019'
    },
    notification: {
      student_admission: {email: true, sms: true},
      exam_results: {email: true, sms: true},
      fee_submission: {email: true, sms: true},
      absent_student: {email: true, sms: true},
      login_credential: {email: true, sms: true}
    },
    sms: {
      gateways: {
        twilio: {
          username: '',
          hash_key: '',
          sender_id: '',
          status: ''
        }
      },
      active_gateway: 1 // ex. Id of Twilio
    },
    email: {
      engine: '',
      username: '',
      password: '',
      smtp_server: '',
      port: '',
      security: ''
    },
    payment_method: {
      gateways: {
        stripe: {
          secret_key: '',
          publishable_key: ''
        }
      },
      active_gateway: 1
    }
  },
  currentCourseId: null,
  currentCourse: {},
  currentCourseId: null,
  currentCourse: {},
  currentSessionOrQuizId: null,
  currentSessionOrQuiz: {},
        // CART
  cartTotal: 0,
  cart: {},
        // USER
  token: localStorage.getItem('user-token') || '',
  status: '',
    // UI
  ui: {
    asideWidth: '420px',
    menuVerticalButton: 4,
    loading: false
  },
        // TABLE
  tablesList: [],
  newTable: null,
  activatedTable: null,
  deletedTable: null,
        // Does the user enabled/disabled tootlips ?
  showTooltips: false
}

const getters = {
    // LMS
  courseSet: state => {
    return state.entities.courses
  },
  courseById: (state) => (id) => {
    return state.entities.courses[id]
  },
  currentCourseId: state => {
    return state.currentCourseId
  },
  currentCourse: state => {
        // return state.entities.courses[state.currentCourseId]
    return state.currentCourse
  },
        /*
         currentCourseSkillSet: (state, getters) => {
         var skills = state.entities.courses[state.currentCourseId].skills
         // var skills = getters.currentCourse

         // return state.entities.courses[state.currentCourseId].skills.map( skillId => state.entities.skills[skillId] )
         },

         currentCourseRequirementSet: state => {
         var requirements = state.entities.courses[state.currentCourseId].requirements
         return requirements.map( reqId => state.entities.requirements[reqId] )
         },
         /*
         currentCourseSectionSet: state => {
         var sections = state.entities.courses[state.currentCourseId].sections
         return sections.map( sectionId => state.entities.sections[sectionId] )
         },
         */
  sectionByIdSessionOrQuizSet: (state) => (id) => {
    var ses_or_quizs = state.entities.sections[id].session_or_quizs
    return ses_or_quizs.map(sessionOrQuizId => state.entities.session_or_quizs[sessionOrQuizId])
  },
        /*
         currentCourseSessionOrQuizSet: state => {
         var ses_or_quizs = state.entities.courses[state.currentCourseId].session_or_quizs
         return ses_or_quizs.map( sessionOrQuizId => state.entities.session_or_quizs[sessionOrQuizId] )
         },
         */
  sessionOrQuizSet: state => {
    return state.entities.session_or_quizs
  },
  sessionOrQuizById: (state) => (id) => {
    return state.entities.session_or_quizs[id]
  },
  currentSessionOrQuizId: state => {
    return state.currentSessionOrQuizId
  },
  currentSessionOrQuiz: state => {
        // return state.entities.session_or_quizs[state.currentSessionOrQuizId]
    return state.currentSessionOrQuiz
  },
        /* Bug sur le store
         currentSessionRessourceSet: state => {
         var ressources = state.entities.session_or_quizs[state.currentSessionOrQuizId].ressources
         // console.log(ressources)
         return ressources.map( resId => state.entities.ressources[resId] )
         },
         /*
         currentSessionTrackSet: state => {
         var tracks = state.entities.session_or_quizs[state.currentSessionOrQuizId].tracks
         // console.log(ressources)
         return tracks.map( resId => state.entities.tracks[resId] )
         },
         currentQuizQuestionSet: state => {
         /*
         var questions = state.entities.session_or_quizs[state.currentSessionOrQuizId].questions
         .map( resId => state.entities.questions[resId])
         // console.log(ressources)
         /*questions.map( resId => state.entities.questions[resId] )
         questions.forEach(question => {
         question.responses.map( Id => state.entities.responses[Id] )
         })

         for (var i = 0, len = questions.length; i < len; i++) {
         questions[i].responses = questions[i].responses.map( Id => state.entities.responses[Id] )
         }
         *
         // getters.currentQuizQuestionSet = []

         var questions = state.entities.session_or_quizs[state.currentSessionOrQuizId].questions.map( resId => state.entities.questions[resId] )

         /*
         questions.forEach( question => {
         var respos = question.responses.map( Id => state.entities.responses[Id] )
         question.responses = respos
         }
         )
         *

         return questions
         },
         questionByIdResponseSet: (state) => (id) => {
         // var responses = state.entities.questions[id].responses
         // console.log(responses)
         var question = clone(state.entities.questions[id], true)
         return question.responses.map( Id => state.entities.responses[Id] )
         },
         */
  questionByIdResponseSet: (state) => (id) => {
    var responses = state.entities.questions[id].responses
    return responses.map(Id => state.entities.responses[Id])
        // return responses.map( Id => state.entities.responses[Id] )
  },
  questionById: (state) => (id) => {
    return state.entities.questions[id]
        // return quest.map( questId => state.entities.questions[questId])
  },
  responseSet: state => {
    return state.entities.responses
  },
  questionSet: state => {
    return state.entities.questions
  },
  ressourceSet: state => {
    return state.entities.ressources
  },
  trackSet: state => {
    return state.entities.tracks
  },
  requirementSet: state => {
    return state.entities.requirements
  },
  skillSet: state => {
    return state.entities.skills
  },
  sectionSet: state => {
    return state.entities.sections
  },

    // USER
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,

    // TABLE
  newTable: state => state.newTable,
  activatedTable: state => state.activatedTable,
  deletedTable: state => state.deletedTable,
  tables: state => state.tablesList,

    //
  isTooltipActive: state => {
    return state.showTooltips
  }
}

const mutations = {
    // LMS
    // After each db actions
  UPDATE_ENTITIES (state, entities) {
        // Loop over all kinds of entities we received
        /* for (let type in entities) {
         for (let entity in entities[type]) {
         var oldObj = state.entities[type][entity] || {}
         // Merge the new data in the old object
         var newObj = Object.assign(oldObj, entities[type][entity])
         // Make sure new entities are also reactive
         Vue.set(state.entities[type], entity, newObj)
         // ex Vue.set(state.entities['courses'], courseObt, newCourseObj)
         }
         } */
        // state.entities = entities

    Vue.set(state, 'entities', entities)
        // alert(JSON.stringify(state.entities))
  },
    // COURSE_SETUP
  COURSE_SETUP_NEW (state) {
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
  },
  COURSE_SETUP_SELECT (state, payload) {
        // state.currentCourseId = payload
    Vue.set(state, 'currentCourseId', payload)
    if (payload !== null) {
            // chargement de la course
      Vue.set(state, 'currentCourse', state.entities.courses[state.currentCourseId])
            // chargement des sections
            // alert(JSON.stringify(state.currentCourse))
      if (state.currentCourse.sections.length > 0 && typeof state.currentCourse.sections[0] === 'number') {
        var sections = state.currentCourse.sections.map(Id => state.entities.sections[Id])
        Vue.delete(state.currentCourse, 'sections')
        Vue.set(state.currentCourse, 'sections', sections)
      }
            // alert(JSON.stringify(state.currentCourse))
    } else Vue.set(state, 'currentCourse', {})
  },
  COURSE_SETUP_DESELECT (state) {
    state.currentCourse = {}
    state.currentCourseId = null
  },
  COURSE_SET_IMAGE (state, image) {
    state.currentCourse.image = image
  },
  COURSE_SET_BADGE (state, badge) {
    state.currentCourse.badge = badge
  },
  COURSE_SET_TITLE (state, title) {
    state.currentCourse.title = title
  },
  COURSE_SET_SUBTITLE (state, subtitle) {
    state.currentCourse.title = subtitle
  },
  COURSE_SET_DESCRIPTION (state, description) {
    state.currentCourse.description = description
  },
  COURSE_SET_ISFREE (state, isFree) {
    state.currentCourse.is_free = isFree
  },
  COURSE_SET_PRICE (state, price) {
    state.currentCourse.price = price
  },
  COURSE_SET_STATUS (state, status) {
    state.currentCourse.status = status
  },
  COURSE_SET_RATE (state, rate) {
    state.currentCourse.rate = rate
  },
  COURSE_SETUP_SECTION_NEW (state, title) {
        // alert('COURSE_SETUP_SECTION_NEW')
    state.currentCourse.sections.push(
      {
        id: null,
        title: title,
        session_or_quizs: []
      }
                                          )
  },
  COURSE_SETUP_SECTION_UPDATE (state, payload) {
        // alert(JSON.stringify(payload))
    state.currentCourse.sections[payload.sectionIndex].title = payload.title
  },
    // COURSE_SETUP_SESSION_OR_QUIZ_NEW
  COURSE_SETUP_SESSION_OR_QUIZ_NEW (state, payload) {
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
  },
  COURSE_SETUP_SESSION_OR_QUIZ_SELECT (state, payload) {
    state.currentSessionOrQuizId = payload
    if (payload !== null) {
            // chargement de la session_or_quiz
      state.currentSessionOrQuiz = state.entities.session_or_quizs[state.currentSessionOrQuizId]
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
  },
  COURSE_SETUP_SESSION_OR_QUIZ_DESELECT (state) {
    state.currentSessionOrQuiz = {}
    state.currentSessionOrQuizId = null
  },
  SESSION_OR_QUIZ_SET_CONTENT (state, payload) {
    state.currentSessionOrQuiz.content = content
  },
  SESSION_OR_QUIZ_SET_TITLE (state, content) {
    state.currentSessionOrQuiz.name = content
  },
  SESSION_OR_QUIZ_SET_DESCRIPTION (state, content) {
    state.currentSessionOrQuiz.description = content
  },
  SESSION_OR_QUIZ_SET_DURATION (state, content) {
    state.currentSessionOrQuiz.duration = content
  },
  SESSION_RESOURCE_ADD (state, payload) {
    state.currentSessionOrQuiz.ressources.push(payload)
  },
  SESSION_RESOURCE_DELETE (state, resIndex) {
    state.currentSessionOrQuiz.ressources.splice(resIndex, 1)
        // ressources.splice(resIndex, 1)
        // state.currentSessionOrQuiz.ressources = ressources
  },
  QUIZ_QUESTION_ADD (state, itemType) {
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
        }
                                                      )
    } else {
      state.currentSessionOrQuiz.questions.push(
        {
          id: null,
          type: itemType,
          question: '',
          responses: [],
          point: 0
        }
                                                      )
    }
  },
  QUIZ_QUESTION_DELETE (state, questionIndex) {
    var questions = state.currentSessionOrQuiz.questions
    questions.splice(questionIndex, 1)
        // state.currentSessionOrQuiz.questions = questions
    Vue.set(state.currentSessionOrQuiz, 'questions', questions)
  },
  QUIZ_QUESTION_RESPONSE_ADD (state, questionIndex) {
    state.currentSessionOrQuiz
        .questions[questionIndex]
        .responses.push(
      {
        id: null,
        response: '',
        isRight: true,
        note: ''
      }
                        )
  },
  QUIZ_QUESTION_RESPONSE_DELETE (state, payload) {
    var questions = state.currentSessionOrQuiz.questions
    questions[payload.questionIndex].responses.splice(payload.responseIndex, 1)
        // state.currentSessionOrQuiz.questions = questions
    Vue.set(state.currentSessionOrQuiz, 'questions', questions)
  },
    // TABLE
  FETCH_TABLE_COLLECTION (state, tables) {
    state.tablesList = tables
    state.activatedTable = null
    state.newTable = null
    state.deletedTable = null
    state.msg = null
        // Vue.set(object, key, value)
        // Vue.delete(state.favourites, movie.id)
        // Vue.set(state.favourites, movie.id, movie)
  },
  CREATE_TABLE (state, tableObject) {
    state.newTable = tableObject
    state.activatedTable = tableObject
    state.tablesList.push(tableObject)
    state.deletedTable = null
    state.msg = null
  },
  FETCH_TABLE (state, tableId) {
    state.activatedTable = find(state.tablesList, function (table) { return table.id === tableId })
    state.deletedTable = null
    state.newTable = null
    state.msg = null
  },
  UPDATE_TABLE (state, tableObject) {
        // tabList = state.tablesList
    Object.assign(state.tablesList, state.tablesList.map(el => el.id === tableObject.id ? tableObject : el))
    state.activatedTable = find(state.tablesList, function (table) { return table.id === tableObject.id })
    state.deletedTable = null
    state.newTable = null
    state.msg = null
  },
  DELETE_TABLE (state, tableId) {
    state.deletedTable = find(state.tablesList, function (table) { return table.id === tableId })
    state.tablesList = find(state.tablesList, function (table) { return table.id !== tableId })
    state.newTable = null
    state.activatedTable = null
    state.msg = null
  },
  RESET_ACTIVE_TABLE (state) {
    state.activatedTable = null
    state.newTable = null
    state.deletedTable = null
  },
  CART_CLEAR (state) {
    state.cart = {}
    state.cartTotal = 0
  },
  CART_ITEM_REMOVE (state, item) {
    state.cartTotal -= item.count
    Vue.delete(state.cart, item.id)
  },
  CART_ITEM_ADD (state, item) {
    state.cartTotal++
    if (item.id in state.cart) {
      state.cart[item.id].count++
    } else {
      let stateItem = Object.assign({}, item)
      stateItem.count = 1
      state.cart[item.id] = stateItem
    }
  },
    // USER
  AUTH_REQUEST (state) {
    state.status = 'loading'
  },
  AUTH_SUCCESS (state, token) {
    state.status = 'success'
    state.token = token
  },
  AUTH_ERROR (state) {
    state.status = 'error'
  },
    // UI
  UI_COLLPASE_MENU (state, payload) {
    if (payload) {
      state.ui.asideWidth = '54px'
      state.ui.menuVerticalButton = 24
    } else {
      state.ui.asideWidth = '420px'
      state.ui.menuVerticalButton = 4
    }
  },
    // other mutations are done the same way
  switchTooltips (state, payload) {
    state.showTooltips = !state.showTooltips
  }

}

const actions = {
    // UI
  uiCollapseMenu ({commit}, payload) {
    commit('UI_COLLPASE_MENU', payload)
  },
    // LMS
    // COURSE_SETUP
  selectCurrentCourse ({ commit }, courseId) {
    commit('COURSE_SETUP_SELECT', courseId)
  },
  deselectCourse ({ commit }) {
    commit('COURSE_SETUP_SELECT', null)
    commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', null)
  },
  newCourse ({ commit }) {
    commit('COURSE_SETUP_NEW')
  },
  getCourses ({ commit }) {
        /* axios
         .get('http://localhost:8000/courses/')
         .then(response => {
         normalizedEntity = normalize(response)
         console.log(normalizedEntity)
         // Use a single commit to update all normalized entities in your store
         // commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
         commit('COURSE_SETUP_SELECT', null)
         commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', null)
         }) */

    const myData = [
            // courses : [
      {
        id: 1,
        title: 'Vue JS 2 - The complete guide (incl. Vue Router and Vuex)',
        subtitle: 'Vue JS is an awesome javascript Framework for building Frontend Applications! Vue JS mixes the best of Angular and React!',
        description: 'Description description description description description description description description description Description',
        image: '',
        badge: '',
        is_free: false,
        price: 0,
        discount: 0,
        status: 'draft',
        rate: 5,
        skills: [],
        requirements: [],
        sections: [
          {
            id: 1,
            title: "L'essentiel de Vue JS",
            description: 'description description description description ',
            session_or_quizs: [
              {
                id: 1,
                type: 'session',
                title: 'Propriétés calculées et observateurs',
                description: 'Session description description description description ',
                video: '',
                content: '',
                ressources: [
                                    {id: 1, description: 'Ressources1', link: 'http://www.firstagence.com/'},
                                    {id: 2, description: 'Ressources2', link: 'http://www.firstagence-sdfssdsf.com/'}
                ],
                tracks: [],
                questions: [],
                taken_session_or_quizs: [
                                    {id: 1, student: 1, session_or_quiz: 1, date: '', score: 0.0}
                ]
              },
              {
                id: 2,
                type: 'quiz',
                title: 'quiz 1',
                description: 'Quiz description description description description ',
                video: '',
                content: '',
                ressources: [],
                tracks: [],
                questions: [
                  {
                    id: 1,
                    type: 'singlechoice',
                    question: 'question 1',
                    responses: [
                      {
                        id: 1,
                        response: 'response 1',
                        is_right: true,
                        note: 'Note de reponse 1'
                      },
                      {
                        id: 2,
                        response: 'response 2',
                        is_right: false,
                        note: 'Note de reponse 2'
                      }
                    ],
                    point: 5
                  },
                  {
                    id: 2,
                    type: 'multichoice',
                    question: 'question 2',
                    responses: [
                      {
                        id: 3,
                        response: 'response 3',
                        is_right: true,
                        note: 'Note de reponse 3'
                      },
                      {
                        id: 4,
                        response: 'response 4',
                        is_right: true,
                        note: 'Note de reponse 4'
                      },
                      {
                        id: 5,
                        response: 'response 5',
                        is_right: false,
                        note: 'Note de reponse 5'
                      },
                      {
                        id: 6,
                        response: 'response 6',
                        is_right: false,
                        note: 'Note de reponse 6'
                      }
                    ],
                    point: 5
                  }
                ], // end question
                taken_session_or_quizs: []
              }
            ] // end sessionOrQuiz
          }
        ], // end sections
        created_at: '',
        last_update: '',
        author: 1
      }
            // ] // end courses
    ] // end myData
    var normalizedEntity = normalize(myData, [courseEntity])
        // alert(JSON.stringify(normalizedEntity.entities))
    commit('UPDATE_ENTITIES', normalizedEntity.entities)
  },
  saveCourse ({ commit, state }) {
    if (state.currentCourseId === null && state.currentCourse !== null) {
      axios.post('url_to_api/', state.currentCourse)
            .then(response => {
              normalizedEntity = normalize(response)
              console.log(normalizedEntity)
                  // Use a single commit to update all normalized entities in your store
              commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
              commit('COURSE_SETUP_SELECT', response.id)
            })
            .catch(e => {
              this.$alert('This is a message', 'DB update error', {
                confirmButtonText: 'OK',
                callback: e => {
                  this.$message({
                    type: 'warning',
                    message: 'action: ${ e }'
                  })
                }
              })
            })
    } else if (state.currentCourseId !== null && state.currentCourse !== null) {
      let putUrl = 'url_to_api/' + state.currentCourseId + '/'
            // Il le champ Id et counter dans l'objet. tester si je dois les enlever
            // delete payload.sessionOrQuizObject.id
      axios.put(putUrl, state.currentCourse).then(response => {
                                                        // commit('COURSE_SETUP_SESSION_OR_QUIZ_UPDATE', response)
                                                        // commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', payload.counter)
        normalizedEntity = normalize(response)
        console.log(normalizedEntity)
                                                        // Use a single commit to update all normalized entities in your store
        commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
        commit('COURSE_SETUP_SELECT', response.id)
      })
            .catch(e => {
              this.$alert('This is a message', 'DB update error', {
                confirmButtonText: 'OK',
                callback: e => {
                  this.$message({
                    type: 'warning',
                    message: 'action: ${ e }'
                  })
                }
              })
            })
    }
  },
  deleteCourse ({ commit, state }) {
    if (!state.currentCourseId) {
            // do not add empty todos

    } else if (state.currentCourseId) {
      axios.delete('url_to_api/', { params: { id: state.currentCourseId } })
            .then(response => {
              this.getCourses()
            })
            .catch(e => {
              this.$message({
                type: 'warning',
                message: 'action: ${ e }'
              })
            })
    } else {
            // commit('COURSE_SETUP_SESSION_OR_QUIZ_DELETE', state.CourseSessionsOrQuiz.counter)
    }
  },
    // Section management
  addSection ({commit}, payload) {
        // For developpement
    alert('addSection')
    commit('COURSE_SETUP_SECTION_NEW', payload)
  },
  updateSection ({commit}, payload) {
        /*
         let putUrl = 'url_to_api/' + payload.id + '/'
         // Il le champ Id et counter dans l'objet. tester si je dois les enlever
         // delete payload.sessionOrQuizObject.id
         axios.put(putUrl, {'title':payload.title}).then(response => {
         // commit('COURSE_SETUP_SESSION_OR_QUIZ_UPDATE', response)
         // commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', payload.counter)
         // normalizedEntity = normalize(response)
         // console.log(normalizedEntity)
         // Use a single commit to update all normalized entities in your store
         // commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
         // commit('COURSE_SETUP_SELECT', response.id)
         commit('COURSE_SETUP_SECTION_UPDATE', payload)
         })
         .catch(e => {
         this.$alert('This is a message', 'DB update error', {
         confirmButtonText: 'OK',
         callback: e => {
         this.$message({
         type: 'warning',
         message: 'action: ${ e }'
         })
         }
         })
         })
         */
        // For developpement
    commit('COURSE_SETUP_SECTION_UPDATE', payload)
  },
    // COURSE_SETUP_SESSION_OR_QUIZ
  getSessionOrQuizs ({ commit }) {
    axios
        .get('http://localhost:8000/courses/' + state.currentCourseId + '/session_or_quizs/')
        .then(response => {
          normalizedEntity = normalize(response)
          console.log(normalizedEntity)
              // Use a single commit to update all normalized entities in your store
          commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
          commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', null)
        })
  },
  selectSessionOrQuiz ({ commit }, sessionOrQuizId) {
    commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', sessionOrQuizId)
  },
  deselectSessionOrQuiz ({ commit }) {
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_DESELECT')
    commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', null)
  },
  newSessionOrQuiz ({ commit }, payload) {
    commit('COURSE_SETUP_SESSION_OR_QUIZ_NEW', payload)
  },
  saveSessionOrQuiz ({ commit, state }) {
    if (state.currentSessionOrQuizId === null && state.currentSessionOrQuiz !== null) {
            // Creation de nouveau session_or_quiz
      axios.post('url_to_api/', state.currentSessionOrQuiz)
            .then(response => {
              normalizedEntity = normalize(response)
              console.log(normalizedEntity)
                  // Use a single commit to update all normalized entities in your store
              commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
              commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', response.id)
            })
            .catch(e => {
              this.$alert('This is a message', 'DB update error', {
                confirmButtonText: 'OK',
                callback: e => {
                  this.$message({
                    type: 'warning',
                    message: 'action: ${ e }'
                  })
                }
              })
            })
    } else if (state.currentSessionOrQuizId !== null && state.currentSessionOrQuiz !== null) {
            // Modification de session_or_quiz
      let putUrl = 'url_to_api/' + state.currentSessionOrQuizId + '/'
            // Il le champ Id et counter dans l'objet. tester si je dois les enlever
            // delete payload.sessionOrQuizObject.id
      axios.put(putUrl, state.currentSessionOrQuiz).then(response => {
                                                               // commit('COURSE_SETUP_SESSION_OR_QUIZ_UPDATE', response)
                                                               // commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', payload.counter)
        normalizedEntity = normalize(response, course)
        console.log(normalizedEntity)
                                                               // Use a single commit to update all normalized entities in your store
        commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
        commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', response.id)
      })
            .catch(e => {
              this.$alert('This is a message', 'DB update error', {
                confirmButtonText: 'OK',
                callback: e => {
                  this.$message({
                    type: 'warning',
                    message: 'action: ${ e }'
                  })
                }
              })
            })
    } else return
  },
  deleteSessionOrQuiz ({ commit, state }) {
    if (!state.currentSessionOrQuizId) {
            // do not add empty todos
      return
    }

    axios.delete('url_to_api/', { params: { id: state.currentSessionOrQuizId } })
        .then(response => {
          this.getSessionOrQuizs()
        })
        .catch(e => {
          this.$message({
            type: 'warning',
            message: 'action: ${ e }'
          })
        })
  },
  addSessionRessource ({ commit }, payload) {
    commit('SESSION_RESOURCE_ADD', payload)
  },
  deleteSessionRessource ({ commit }, payload) {
        /*
         if(typeof payload.ressourceId === 'number') {
         axios.delete('url_to_api/', { params: { id: payload.ressourceId } } )
         .then(response => {
         commit('SESSION_RESOURCE_DELETE', payload.ressourceIndex)
         // this.getSessionOrQuizs()
         })
         .catch(e => {
         this.$message({
         type: 'warning',
         message: 'action: ${ e }'
         })
         })
         } else {
         commit('SESSION_RESOURCE_DELETE', payload.ressourceIndex)
         }
         */
    commit('SESSION_RESOURCE_DELETE', payload.ressourceIndex)
  },

    // USER
  AuthRequest ({commit, dispatch}, user) {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      axios({url: 'auth', data: user, method: 'POST' })
            .then(resp => {
              const token = resp.data.token
              localStorage.setItem('user-token', token)
                // Add the following line:
              axios.defaults.headers.common['Authorization'] = token
              commit(AUTH_SUCCESS, resp)
              dispatch(USER_REQUEST)
              resolve(resp)
            })
            .catch(err => {
              commit(AUTH_ERROR, err)
              localStorage.removeItem('user-token')
              reject(err)
            })
    })
  },
  AuthLogout ({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')
                           // remove the axios default header
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  },
    // TABLE
  loadTables ({ commit }) {
    axios
        .get('http://localhost:8000/tables/')
        .then(tables => {
              // alert(JSON.stringify(tables))
          commit('FETCH_TABLE_COLLECTION', tables.data)
        })
  },
  selectTable ({ commit }, tableId) {
    commit('FETCH_TABLE', tableId)
  },
  addTable ({ commit }, tableObject) {
    if (!tableObject) {
            // do not add empty todos
      return
    }
        // table = tableObject
        // alert(JSON.stringify(tableObject))
    axios.post('http://localhost:8000/tables/', tableObject)
        .then(response => {
          alert(JSON.stringify(response.data))
          commit('CREATE_TABLE', response.data)
        })
        .catch(e => {
          this.$alert('This is a message', 'DB update error', {
            confirmButtonText: 'OK',
            callback: e => {
              this.$message({
                type: 'warning',
                message: 'action: ${ e }'
              })
            }
          })
        })
  },
  updateTable ({ commit }, tableObject) {
    if (!tableObject) {
            // do not add empty todos
      this.$message('This is a message.')
      return
    }
    let putUrl = 'http://localhost:8000/tables/' + tableObject.id + '/'
        // delete tableObject.id
    axios.put(putUrl, tableObject).then(response => {
      commit('UPDATE_TABLE', response.data)
    })
        .catch(e => {
          this.$alert('This is a message', 'DB update error', {
            confirmButtonText: 'OK',
            callback: e => {
              this.$message({
                type: 'warning',
                message: 'action: ${ e }'
              })
            }
          })
        })
  },
  deleteTable ({ commit, state }) {
    if (!state.activatedTable) {
            // do not add empty todos
      return
    }
    table = state.activatedTable
    axios.post('/todos', table.id).then(response => {
      commit('DELETE_TABLE', response.data)
    })
        .catch(e => commit('TABLE_MSG', e))
  },
  resetActivatedTable ({ commit }) {
    commit('RESET_ACTIVE_TABLE')
  },
  clearNewTable ({ commit }) {
    commit('CLEAR_NEW_TABLE')
  },
  switchTooltips ({commit}) {
    commit('switchTooltips')
  }

}

let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
  strict: process.env.NODE_ENV !== 'production'
})

Vue.config.devtools = true

global.store = store

export default store

/*
 {
 "ressources":{
 "1":{"id":1,"description":"Ressources1","link":"http://www.firstagence.com/"},
 "2":{"id":2,"description":"Ressources2","link":"http://www.firstagence-sdfssdsf.com/"}
 },
 "session_or_quizs":{
 "1":{"id":1,"type":"session","content":"","title":"Propriétés calculées et observateurs","description":"Session description description description description ","ressources":[1,2],"tracks":[],"questions":[]},
 "2":{"id":2,"type":"quiz","content":"","title":"quiz 1","description":"Quiz description description description description ","ressources":[],"tracks":[],"questions":[1,2]}
 },
 "responses":{
 "1":{"id":1,"response":"response 1","is_right":true,"note":""},
 "2":{"id":2,"response":"response 2","is_right":true,"note":""},
 "3":{"id":3,"response":"response 3","is_right":true,"note":""}
 },
 "questions":{
 "1":{"id":1,"type":"singlechoice","question":"question 1","responses":[1,2],"point":0},
 "2":{"id":2,"type":"multichoice","question":"question 2","responses":[3],"point":0}
 },
 "sections":{
 "1":{"id":1,"title":"L'essentiel de Vue JS","description":"description description description description ","session_or_quizs":[1,2]}
 },
 "courses":{
 "1":{"id":1,"title":"Vue JS 2 - The complete guide (incl. Vue Router and Vuex)","subtitle":"Vue JS is an awesome javascript Framework for building Frontend Applications! Vue JS mixes the best of Angular and React!","description":"Description description description description description description description description description Description","image":"","badge":"","is_free":false,"price":0,"status":"draft","rate":5,"author":1,"skills":[],"requirements":[],"sections":[1],"created_date":"","last_update":""}
 }
 }

 [
 {
 "question":1,
 "responses":[
 {"id":1,"response":"response 1","is_right":true,"note":"Note de reponse 1"}
 ],
 "answers":[1]
 },
 {
 "question":2,
 "responses":[
 {"id":3,"response":"response 3","is_right":true,"note":"Note de reponse 3"},
 {"id":4,"response":"response 4","is_right":true,"note":"Note de reponse 4"}
 ],
 "answers":[1,2]
 }
 ]
 */
