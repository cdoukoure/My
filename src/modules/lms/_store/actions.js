import api from '../_api'

import { normalize, schema } from 'normalizr'

// Define a schema
const ressourceEntity = new schema.Entity('ressources')

const responseEntity = new schema.Entity('responses')

const skillEntity = new schema.Entity('skills')

const requirementEntity = new schema.Entity('requirements')

const trackEntity = new schema.Entity('tracks')

const fileEntity = new schema.Entity('files')

const questionEntity = new schema.Entity('questions', {
  responses: [responseEntity]
})

const takenSessionOrQuizEntity = new schema.Entity('taken_session_or_quizs')

const sessionOrquizEntity = new schema.Entity('session_or_quizs', {
  video: fileEntity,
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
  files: [fileEntity],
  skills: [skillEntity],
  requirements: [requirementEntity]
})

const mySchema = { courses: [ courseEntity ] }

/*
const getProducts = (context) => {
  api.fetchProducts
    .then((response) => {
      context.commit('PRODUCTS_UPDATED', response);
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.error(error);
    });
};
*/

const getCourses = (context) => {
    /* api.fetchCourses
    .then(response => {
        normalizedEntity = normalize(response)
        console.log(normalizedEntity)
        // Use a single commit to update all normalized entities in your store
        // commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
        commit('COURSE_SETUP_SELECT', null)
        commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', null)
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.error(error);
    }); */

  const myData = [
            // courses : [
    {
      id: 1,
      title: 'Vue JS 2 - The complete guide (incl. Vue Router and Vuex)',
      subtitle: 'Vue JS is an awesome javascript Framework for building Frontend Applications! Vue JS mixes the best of Angular and React!',
      description: 'Description description description description description description description description description Description',
      files_dir: '',
      video: 1,
      image: '',
      badge: '',
      files: [
                        {id: 1, name: 'comment-creer-un-composent-monofichier.mp4', url: 'https://www.w3schools.com/html/mov_bbb.mp4', size: 8, format: 'video/mp4', date: '08/05/2018'},
                        {id: 2, name: 'comment-creer-un-composent-monofichier2.mp4', url: 'https://www.w3schools.com/html/movie.mp4', size: 8, format: 'video/mp4', date: '08/05/2018'},
                        {id: 3, name: 'comment-creer-un-composent-monofichier3.mp4', url: 'https://www.w3schools.com/html/mov_bbb.mp4', size: 8, format: 'video/mp4', date: '08/05/2018'},
                        {id: 4, name: 'comment-creer-un-composent-monofichier4.mp4', url: 'https://www.w3schools.com/html/movie.mp4', size: 8, format: 'video/mp4', date: '08/05/2018'},
                        {id: 5, name: 'comment-creer-un-composent-monofichier5.mp4', url: 'https://www.w3schools.com/html/mov_bbb.mp4', size: 8, format: 'video/mp4', date: '08/05/2018'},
                        {id: 6, name: 'comment-creer-un-composent-monofichier6.mp4', url: 'https://www.w3schools.com/html/movie.mp4', size: 8, format: 'video/mp4', date: '08/05/2018'}
      ],
      is_free: false,
      price: 10,
      discount: 5,
      total: 9.5,
      currency: '$',
      status: 'draft',
      rate: 5,
      skills: [
        {id:1, description: "Skills 1: Vue JS is an awesome javascript Framework for building"},
        {id:2, description: "Skills 2: Vue JS is an awesome javascript Framework for building"},
        {id:3, description: "Skills 3: Vue JS is an awesome javascript Framework for building"},
        {id:4, description: "Skills 4: Vue JS is an awesome javascript Framework for building"},
        {id:5, description: "Skills 5: Vue JS is an awesome javascript Framework for building"},
        {id:6, description: "Skills 6: Vue JS is an awesome javascript Framework for building"}
      ],
      requirements: [
        {id:1, description: "Requirement 1: Vue JS is an awesome javascript Framework for building"},
        {id:2, description: "Requirement 2: Vue JS is an awesome javascript Framework for building"},
        {id:3, description: "Requirement 3: Vue JS is an awesome javascript Framework for building"}
      ],
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
              video: 1,
              transcription: "<p>Bienvenue dans « <b>Découvrir le design graphique : Refonte d'un panneau d'information </b>» </p><p>J'ai reçu un e-mail avec une composition en pièce jointe, élaborée par un designer local. N'étant pas satisfaite du résultat, la cliente a sollicité mon aide. Il s'agit d'un grand panneau extérieur de sept pieds par quatre à installer au départ du sentier de la réserve de Seneca Meadows Wetlands Preserve au nord de l'État de New York. Seneca Meadows a récemment été reconnue comme zone importante pour la conservation des oiseaux (IBA). Ce panneau symbolise donc la fierté et l'envie de partager cette reconnaissance avec les visiteurs.</p><p>Nous avons choisi cet exemple non pas parce que vous travaillez sur un panneau extérieur, mais parce qu'il présente des points communs avec votre travail actuel. Un panneau d'information est à la fois une vitrine et une mine d'informations à l'instar des pages Internet. C'est aussi vrai pour les supports imprimés (brochures, affiches) : un grand message principal et des messages détaillés plus petits, le tout sur une même page. Je pense que cet exemple vous parlera et j'espère qu'il vous sera utile.<br/>Nous utilisons des outils courants : texte, police, photos et composition sur une page statique, qui devrait parler à la plupart des personnes qui la verront.</p>",
              duration: 12,
              ressources: [
                                    {id: 1, description: 'Ressources1', link: 'http://www.firstagence.com/'},
                                    {id: 2, description: 'Ressources2', link: 'http://www.firstagence-sdfssdsf.com/'}
              ],
              tracks: [],
              questions: [],
              nb_question_by_page: 1,
              taken_session_or_quizs: [
                                    {id: 1, student: 1, session_or_quiz: 1, date: '', score: 0.0}
              ],
              min_result: 0
            },
            {
              id: 2,
              type: 'quiz',
              title: 'quiz 1',
              description: 'Quiz description description description description ',
              video: 2,
              transcription: '',
              duration: 12,
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
              nb_question_by_page: 5,
              taken_session_or_quizs: [],
              min_result: 70
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
    // alert(JSON.stringify(context))
  context.commit('UPDATE_ENTITIES', normalizedEntity.entities)
}

/*

{
    "ressources":{
        "1":{"id":1,"description":"Ressources1","link":"http://www.firstagence.com/"},
        "2":{"id":2,"description":"Ressources2","link":"http://www.firstagence-sdfssdsf.com/"}
    },
    "taken_session_or_quizs":{
        "1":{"id":1,"student":1,"session_or_quiz":1,"date":"","score":0}
    },
    "session_or_quizs":{
        "1":{"id":1,"type":"session","title":"Propriétés calculées et observateurs","description":"Session description description description description ","video":1,"text":"","duration":12,"ressources":[1,2],"tracks":[],"questions":[],"nb_question_by_page":1,"taken_session_or_quizs":[1]},
        "2":{"id":2,"type":"quiz","title":"quiz 1","description":"Quiz description description description description ","video":2,"text":"","duration":12,"ressources":[],"tracks":[],"questions":[1,2],"nb_question_by_page":5,"taken_session_or_quizs":[]}
    },
    "responses":{
        "1":{"id":1,"response":"response 1","is_right":true,"note":"Note de reponse 1"},
        "2":{"id":2,"response":"response 2","is_right":false,"note":"Note de reponse 2"},
        "3":{"id":3,"response":"response 3","is_right":true,"note":"Note de reponse 3"},
        "4":{"id":4,"response":"response 4","is_right":true,"note":"Note de reponse 4"},
        "5":{"id":5,"response":"response 5","is_right":false,"note":"Note de reponse 5"},
        "6":{"id":6,"response":"response 6","is_right":false,"note":"Note de reponse 6"}
    },
    "questions":{
        "1":{"id":1,"type":"singlechoice","question":"question 1","responses":[1,2],"point":5},
        "2":{"id":2,"type":"multichoice","question":"question 2","responses":[3,4,5,6],"point":5}
    },
    "sections":{
        "1":{"id":1,"title":"L'essentiel de Vue JS","description":"description description description description ","session_or_quizs":[1,2]}
    },
    "files":{
        "1":{"id":1,"name":"comment-creer-un-composent-monofichier.mp4","url":"https://www.w3schools.com/html/mov_bbb.mp4","size":8,"type":"video/mp4","date":"08/05/2018"},
        "2":{"id":2,"name":"comment-creer-un-composent-monofichier2.mp4","url":"https://www.w3schools.com/html/movie.mp4","size":8,"type":"video/mp4","date":"08/05/2018"},
        "3":{"id":3,"name":"comment-creer-un-composent-monofichier3.mp4","url":"https://www.w3schools.com/html/mov_bbb.mp4","size":8,"type":"video/mp4","date":"08/05/2018"},
        "4":{"id":4,"name":"comment-creer-un-composent-monofichier4.mp4","url":"https://www.w3schools.com/html/movie.mp4","size":8,"type":"video/mp4","date":"08/05/2018"},
        "5":{"id":5,"name":"comment-creer-un-composent-monofichier5.mp4","url":"https://www.w3schools.com/html/mov_bbb.mp4","size":8,"type":"video/mp4","date":"08/05/2018"},
        "6":{"id":6,"name":"comment-creer-un-composent-monofichier6.mp4","url":"https://www.w3schools.com/html/movie.mp4","size":8,"type":"video/mp4","date":"08/05/2018"}
    },
    "courses":{
        "1":{"id":1,"title":"Vue JS 2 - The complete guide (incl. Vue Router and Vuex)","subtitle":"Vue JS is an awesome javascript Framework for building Frontend Applications! Vue JS mixes the best of Angular and React!","description":"Description description description description description description description description description Description","files_dir":"","video":"","image":"","badge":"","files":[1,2,3,4,5,6],"is_free":false,"price":10,"currency":"$","discount":5,"status":"draft","rate":5,"skills":[],"requirements":[],"sections":[1],"created_at":"","last_update":"","author":1}
    }
}

*/

const selectCurrentCourse = (context, courseId) => {
  context.commit('COURSE_SETUP_SELECT', courseId)
}

const deselectCourse = (context) => {
  context.commit('COURSE_SETUP_SELECT', null)
  context.commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', null)
}

const newCourse = (context) => {
  context.commit('COURSE_SETUP_NEW')
}

const saveCourse = (context) => {
  if (context.state.currentCourseId === null && context.state.currentCourse !== null) {
    api.createCourse(context.state.currentCourse)
        .then(response => {
          normalizedEntity = normalize(response)
          console.log(normalizedEntity)
            // Use a single commit to update all normalized entities in your store
          context.commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
          context.commit('COURSE_SETUP_SELECT', response.id)
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
  } else if (context.state.currentCourseId !== null && context.state.currentCourse !== null) {
    api.updateCourse(context.state.currentCourseId, context.state.currentCourse)
        .then(response => {
            // commit('COURSE_SETUP_SESSION_OR_QUIZ_UPDATE', response)
            // commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', payload.counter)
          normalizedEntity = normalize(response)
          console.log(normalizedEntity)
            // Use a single commit to update all normalized entities in your store
          context.commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
          context.commit('COURSE_SETUP_SELECT', response.id)
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
}

const deleteCourse = (context) => {
  if (!context.state.currentCourseId) {
        // do not add empty todos

  } else if (context.state.currentCourseId) {
    api.deleteCourse(context.state.currentCourseId)
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
}

// skill management
const addSkill = (context, payload) => {
  context.commit('COURSE_SETUP_SKILL_NEW', payload)
     /*
     api.createSection(payload)
     .then(response => {
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_UPDATE', response)
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', payload.counter)
        normalizedEntity = normalize(response)
        console.log(normalizedEntity)
        // Use a single commit to update all normalized entities in your store
        context.commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
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
}

const updateSkill = (context, payload) => {
  // alert(JSON.stringify(payload))
  context.commit('COURSE_SETUP_SKILL_UPDATE', payload)

     /*
     api.updateSection(payload)
     .then(response => {
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_UPDATE', response)
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', payload.counter)
        normalizedEntity = normalize(response)
        console.log(normalizedEntity)
        // Use a single commit to update all normalized entities in your store
        commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
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
}

const deleteSkill = (context, payload) => {
  // alert("Action : " + payload)
  context.commit('COURSE_SETUP_SKILL_DEL', payload)
     /*
     api.deleteSection(payload)
     .then(response => {
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_UPDATE', response)
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', payload.counter)
        normalizedEntity = normalize(response)
        console.log(normalizedEntity)
        // Use a single commit to update all normalized entities in your store
        context.commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
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
}

// Requirements management
const addRequirement = (context, payload) => {
  context.commit('COURSE_SETUP_REQ_NEW', payload)
     /*
     api.createSection(payload)
     .then(response => {
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_UPDATE', response)
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', payload.counter)
        normalizedEntity = normalize(response)
        console.log(normalizedEntity)
        // Use a single commit to update all normalized entities in your store
        context.commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
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
}

const updateRequirement = (context, payload) => {
  // alert(JSON.stringify(payload))
  context.commit('COURSE_SETUP_REQ_UPDATE', payload)

     /*
     api.updateSection(payload)
     .then(response => {
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_UPDATE', response)
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', payload.counter)
        normalizedEntity = normalize(response)
        console.log(normalizedEntity)
        // Use a single commit to update all normalized entities in your store
        commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
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
}

const deleteRequirement = (context, payload) => {
  // alert("Action : " + payload)
  context.commit('COURSE_SETUP_REQ_DEL', payload)
     /*
     api.deleteSection(payload)
     .then(response => {
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_UPDATE', response)
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', payload.counter)
        normalizedEntity = normalize(response)
        console.log(normalizedEntity)
        // Use a single commit to update all normalized entities in your store
        context.commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
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
}

// Section management
const addSection = (context, payload) => {
  context.commit('COURSE_SETUP_SECTION_NEW', payload)
     /*
     api.createSection(payload)
     .then(response => {
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_UPDATE', response)
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', payload.counter)
        normalizedEntity = normalize(response)
        console.log(normalizedEntity)
        // Use a single commit to update all normalized entities in your store
        context.commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
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
}

const updateSection = (context, payload) => {
     // alert(JSON.stringify(payload))
  context.commit('COURSE_SETUP_SECTION_UPDATE', payload)

     /*
     api.updateSection(payload)
     .then(response => {
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_UPDATE', response)
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', payload.counter)
        normalizedEntity = normalize(response)
        console.log(normalizedEntity)
        // Use a single commit to update all normalized entities in your store
        commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
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
}

const deleteSection = (context, payload) => {
     // alert("Action : " + payload)
  context.commit('COURSE_SETUP_SECTION_DEL', payload)
     /*
     api.deleteSection(payload)
     .then(response => {
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_UPDATE', response)
        // commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', payload.counter)
        normalizedEntity = normalize(response)
        console.log(normalizedEntity)
        // Use a single commit to update all normalized entities in your store
        context.commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
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
}

// COURSE_SETUP_SESSION_OR_QUIZ
const getSessionOrQuizzes = (context) => {
    // http://localhost:8000/courses/
  api.courseGetSessionOrQuizzes(state.currentCourseId)
    .then(response => {
      normalizedEntity = normalize(response)
      console.log(normalizedEntity)
          // Use a single commit to update all normalized entities in your store
      context.commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
      context.commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', null)
    })
}

const selectSessionOrQuiz = (context, sessionOrQuizId) => {
  context.commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', sessionOrQuizId)
}

const deselectSessionOrQuiz = (context) => {
    // commit('COURSE_SETUP_SESSION_OR_QUIZ_DESELECT')
  context.commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', null)
}

const newSessionOrQuiz = ({ commit }, payload) => {
  commit('COURSE_SETUP_SESSION_OR_QUIZ_NEW', payload)
}

const saveSessionOrQuiz = (context) => {
  if (context.state.currentSessionOrQuizId === null && context.state.currentSessionOrQuiz !== null) {
        // Creation de nouveau session_or_quiz
    api.createSessionOrQuiz(context.state.currentSessionOrQuiz)
        .then(response => {
          normalizedEntity = normalize(response)
          console.log(normalizedEntity)
            // Use a single commit to update all normalized entities in your store
          context.commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
          context.commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', response.id)
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
  } else if (context.state.currentSessionOrQuizId !== null && context.state.currentSessionOrQuiz !== null) {
    api.updateSessionOrQuiz(context.state.currentSessionOrQuizId, context.state.currentSessionOrQuiz)
        .then(response => {
            // commit('COURSE_SETUP_SESSION_OR_QUIZ_UPDATE', response)
            // commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', payload.counter)
          normalizedEntity = normalize(response, course)
          console.log(normalizedEntity)
            // Use a single commit to update all normalized entities in your store
          context.commit('UPDATE_ENTITIES', { entities: normalizedEntity.entities })
          context.commit('COURSE_SETUP_SESSION_OR_QUIZ_SELECT', response.id)
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
}

const deleteSessionOrQuiz = (context) => {
  if (!context.state.currentSessionOrQuizId) {
        // do not add empty todos
    return
  }

  api.deleteSessionOrQuiz(context.state.currentSessionOrQuizId)
    .then(response => {
      this.getSessionOrQuizzes()
    })
    .catch(e => {
      this.$message({
        type: 'warning',
        message: 'action: ${ e }'
      })
    })
}

const addSessionRessource = (context, payload) => {
  context.commit('SESSION_RESOURCE_ADD', payload)
}

const deleteSessionRessource = (context, payload) => {
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
  context.commit('SESSION_RESOURCE_DELETE', payload.ressourceIndex)
}

const addToCart = (context, courseId) => {
    context.commit('CART_ITEM_ADD', courseId)
}


const computeTotalAmountCart = (context) => {
    context.commit('CART_COMPUTE_TOTAL')
}


const removeToCart = (context, courseId) => {
    context.commit('CART_ITEM_REMOVE', courseId)
}

const clearCart = (context) => {
    context.commit('CART_CLEAR')
}

export default {
  getCourses,
  selectCurrentCourse,
  deselectCourse,
  newCourse,
  saveCourse,
  deleteCourse,
  addSkill,
  updateSkill,
  deleteSkill,
  addRequirement,
  updateRequirement,
  deleteRequirement,
  addSection,
  updateSection,
  deleteSection,
  getSessionOrQuizzes,
  selectSessionOrQuiz,
  deselectSessionOrQuiz,
  newSessionOrQuiz,
  saveSessionOrQuiz,
  deleteSessionOrQuiz,
  addSessionRessource,
  deleteSessionRessource,
  addToCart,
  removeToCart,
  computeTotalAmountCart,
  clearCart
}
