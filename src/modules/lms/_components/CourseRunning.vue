<template>
    <el-container>
        <el-header>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/lms' }">E-leaning Center</el-breadcrumb-item>
                <el-breadcrumb-item>Course Running</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            
                <el-row>
                    <el-col :span="22">
                        <h1>{{ courseTitle }}</h1>
                    </el-col>
                    <el-col :span="2" style="text-align:right;">
                        <el-tooltip class="item" effect="light" content="Back to course list" placement="top">
                            <el-button type="danger" icon="el-icon-circle-close" :round="true" size="mini" @click="back()"></el-button>
                        </el-tooltip>
                    </el-col>
                </el-row>
                
                <el-row :gutter="20">
                    <el-col :span="16">
                        <el-card>
                        
                        <el-row  style="margin:-20px;" v-if="type === 'session'">
                            
                            <el-col :span="24" v-if="video.url !== ''">
                                <video width="100%" height="450" :poster="video.imagePreview" controls>
                                    <source :src="video.url" :type="video.format">
                                    Your browser does not support the video tag.
                                </video>
                            </el-col>
                            <el-col :span="24" style="padding:20px;">
                                <h2>{{ title }}</h2>
                                <el-tabs v-model="defaulTab" @tab-click="handleClick">
                                    <el-tab-pane label="Transcription" name="transcription" v-html="transcription"></el-tab-pane>
                                    <el-tab-pane label="Ressources" name="ressource">
                                        <span v-for="ressource in ressources" style="display:block">{{ ressource.description }} - <a :href="ressource.link">Cliquez ici</a></span>
                                    </el-tab-pane>
                                    <el-tab-pane label="Feedback" name="feedback">Feedback</el-tab-pane>
                                </el-tabs>
                            </el-col>
                        </el-row>
                        
                        <el-row v-else style="margin:-20px;">
                            <el-col :span="18" style="padding:20px;">
                                <h2>{{ title }}</h2>
                                <p>{{ description }}</p>
                            </el-col>
                            <el-col :span="6">
                                <p>
                                    <!-- <b>Debut:</b> {{ startOf }} <br/>
                                    <b>Fin:</b> {{ startOf }} <br/> -->
                                    <el-button v-if="!quizRunning" @click="startQuiz()">Demarrer le quiz</el-button>
                                    <el-button v-else-if="quizRunning && quizResulting && ( currentPage == Math.ceil(questions.length / nbQuestionByPage) || questions.length == 1)" type="success" @click="restartQuiz()"> Recommencer </el-button>
                                    <span v-if="quizRunning && !quizResulting"><b>Durée:</b> {{ endOf.get('hours') }} h {{ endOf.get('minutes') }} min {{ endOf.get('seconds') }} sec</span>
                                </p>
                            </el-col>
                            
                            <el-col :span="24" style="padding:20px;" v-if="quizRunning && quizResulting">
                                <el-alert
                                    v-if="quizResult >= minResult"
                                    type="success"
                                    title="Bravo ! Vous avez réussi cet exercice !"
                                    show-icon
                                    :closable="false">
                                </el-alert>
                                <el-alert
                                    v-if="quizResult < minResult"
                                    title="Désolé ! Vous n'avez pas réussi cet exercice !"
                                    type="warning"
                                    show-icon
                                    :closable="false">
                                </el-alert>
                            </el-col>
                            <el-col :span="24" v-if="quizRunning" v-for="(question,index) in questions" :key="question.id" style="padding:20px 40px 0px 40px;">
                                <p>
                                {{ question.question }}
                                <b v-if="quizResulting === true && question.result !== 0" style="color:#67C23A">Vrai</b>
                                <b v-if="quizResulting === true && question.result === 0" style="color:#F56C6C">Faux</b>
                                </p>
                                <el-checkbox-group v-if="question.type === 'multichoice'" v-model="answers[index].answers" :disabled="quizResulting === true">
                                    <el-checkbox v-for="response in question.responses" :key="id" :label="response.id">
                                        {{ response.response }}
                                        <i class="el-icon-check" v-if="quizResulting === true && response.is_right === true"></i>
                                        <i class="el-icon-close" v-if="quizResulting === true && response.is_right === false && response.checked === true"></i>
                                        <br/>
                                        <span class="note" v-if="quizResulting === true && currentPage == Math.ceil(questions.length / nbQuestionByPage)"> {{ response.note }} </span>
                                    </el-checkbox>
                                </el-checkbox-group>
                                <el-radio-group v-if="question.type === 'singlechoice'"  v-model="answers[index].answers" :disabled="quizResulting === true">
                                    <el-radio v-for="response in question.responses" :key="id" :label="response.id">
                                        {{ response.response }}
                                        <i class="el-icon-check" v-if="quizResulting === true && response.is_right === true"></i>
                                        <i class="el-icon-close" v-if="quizResulting === true && response.is_right === false && response.checked === true"></i>
                                        <br/>
                                        <span class="note" v-if="quizResulting === true && currentPage == Math.ceil(questions.length / nbQuestionByPage)">
                                            {{ response.note }}
                                        </span>
                                    </el-radio>
                                </el-radio-group>
                                <!--
                                 <div v-if="quizResulting === false">
                                 <p v-for="response in question.responses" :key="response.id">
                                 <i class="el-icon-close" v-if="response.checked !== response.is_right"></i> <i class="el-icon-check" v-if="response.checked === response.is_right"></i> - {{ response.response }}
                                 </p>
                                 </div>
                                 -->
                                
                            </el-col>
                            <el-col :span="24" v-if="quizRunning && type === 'quiz'">
                                <hr/>
                            </el-col>
                            <el-col v-if="quizRunning && type === 'quiz'" :span="16">
                                <el-pagination
                                    background
                                    :page-size="nbQuestionByPage"
                                    layout="prev, pager, next"
                                    :total="questions.length"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="currentPage"
                                    >
                                </el-pagination>
                            </el-col>
                            <el-col :span="8">
                                <el-button v-if="quizRunning && !quizResulting && ( currentPage == Math.ceil(questions.length / nbQuestionByPage) || questions.length == 1)" type="success" @click="validateQuiz()"> Valider </el-button>
                                <el-button v-else-if="quizRunning && quizResulting && ( currentPage == Math.ceil(questions.length / nbQuestionByPage) || questions.length == 1)" type="success" @click="restartQuiz()"> Recommencer </el-button>
                                <el-button v-if="quizRunning && type === 'quiz' && !quizResulting" type="warning"> Quitter </el-button>
                            </el-col>
                            <el-col :span="24">
                                <br/><br/>
                            </el-col>
                        </el-row>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <!--
                         <el-collapse accordion v-if="sections.length > 0" class="box-section">
                         <el-collapse-item v-for="(section, index) in sections" :key="section.id" :name="index" class="box-section-item">
                         <template slot="title">
                         <span style="font-size:15px;font-weight:500;">{{index+1}} - {{section.title}}</span>
                         </template>
                         <div v-if="section.session_or_quizs.length > 0" class="box-session-or-quiz">
                         <ul>
                         <li v-for="(sesQuiz, index) in $store.getters['$_lms/sectionByIdSessionOrQuizSet'](section.id)" :key="sesQuiz.id">
                         
                         <el-button type="text" @click="selectSessionOrQuiz(sesQuiz.id)">{{sesQuiz.title}}</el-button>
                         </li>
                         </ul>
                         </div>
                         </el-collapse-item>
                         </el-collapse>
                         -->
                         <el-card>
                        <div style="margin:-20px;">
                            <el-menu default-active="1" unique-opened>
                                <div v-for="nb in 20">
                                <el-submenu v-for="(section, index) in sections" :key="section.id" :index="index + nb - 1">
                                    <template slot="title">
                                        <span style="font-size:15px;font-weight:500;">{{index+nb}} - {{section.title}}</span>
                                    </template>
                                    <el-menu-item
                                        v-for="(sesQuiz, sesOrQuizIndex) in $store.getters['$_lms/sectionByIdSessionOrQuizSet'](section.id)"
                                        :key="sesQuiz.id"
                                        :index="index + nb + '-' + (sesOrQuizIndex + 1)"
                                        @click="beforeSelectSessionOrQuiz(sesQuiz.id)"
                                        >
                                        {{index + nb + '-' + (sesOrQuizIndex + 1)}}. {{sesQuiz.title}}
                                    </el-menu-item>
                                </el-submenu>
                                </div>
                            </el-menu>
                        </div>
                        </el-card>
                    </el-col>
                </el-row>
                
        </el-main>
    </el-container>
</template>

<i18n>
{
  "en": {
    "hello": "hello world!"
  },
  "fr": {
    "hello": "Bonjour tout le monde!"
  }
}
</i18n>

<script>
  import find from 'lodash/find'
  // import CourseOverviewCard from './CourseSetup/CourseOverviewCard.vue'
  var moment = require('moment')

  export default {
    components: {
      // CourseOverviewCard
    },
    data () {
      return {
        dialogVisible: false,
        answers: [],
        quizRunning: false,
        quizResulting: false,
        quizResult: 0,
        questions: [],
        questionSet: [],
        currentPage: 1,
        defaulTab: 'transcription',
        locale: 'fr',
        startOf: '',
        endOf: moment.duration(60, 'seconds'), // moment().format('LTS'), //moment().endOf('hour').fromNow(),
        timerID: null
      }
    },
    created () {
        // this.questions = this.$store.getters.currentSessionOrQuiz.questions
        // alert(JSON.stringify(this.questions))
        // alert(typeof moment().format('LTS'))
  
        // selection automatique de la premiere session du cours
      var sesQuizId = null
      if (this.$store.getters['$_lms/currentSessionOrQuizId'] !== null) {
        sesQuizId = this.$store.getters['$_lms/currentSessionOrQuizId']
      } else {
        sesQuizId = this.$store.getters['$_lms/currentCourse'].sections[0].session_or_quizs[0]
      }
        // alert(firstSession)
      this.selectSessionOrQuiz(sesQuizId)
    },
    mounted () {
        // this.clock()
        // alert(JSON.stringify(this.endOf))
    },
    beforeRouteLeave (to, from, next) {
            // const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
            // if (answer) {
            // this.saveTable()
            //    next()
            // } else {
            //    next(false)
            // }
  
      if (this.type === 'quiz' && this.quizRunning) {
        this.$confirm('Do you really want to leave?', 'Warning', {
          confirmButtonText: 'Quit wiyhout save',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          next()
        }).catch(() => {
          next(false)
        })
      } else next()
    },
    beforeDestroy () {
        // clearInterval(this.timerID)
        // alert(JSON.stringify(this.endOf))
    },
    computed: {
      loadingCourse () {
        return this.$store.getters.loading
      },
        // Course Form
      sections () {
        return this.$store.getters['$_lms/currentCourse'].sections
      },
      courseTitle () {
        return this.$store.getters['$_lms/currentCourse'].title
      },
      type () {
        return this.$store.getters['$_lms/currentSessionOrQuiz'].type
      },
      title () {
        return this.$store.getters['$_lms/currentSessionOrQuiz'].title
      },
      description () {
        return this.$store.getters['$_lms/currentSessionOrQuiz'].description
      },
      video () {
        return this.$store.getters['$_lms/currentSessionOrQuiz'].video
      },
      transcription () {
        return this.$store.getters['$_lms/currentSessionOrQuiz'].transcription
      },
      duration () {
        return this.$store.getters['$_lms/currentSessionOrQuiz'].duration
      },
      ressources () {
        return this.$store.getters['$_lms/currentSessionOrQuiz'].ressources
      },
      minResult () {
        return this.$store.getters['$_lms/currentSessionOrQuiz'].min_result
      },
      nbQuestionByPage () {
        return this.$store.getters['$_lms/currentSessionOrQuiz'].nb_question_by_page
      }
    },
    methods: {
      clock () {
            /*
            this.timerID = setInterval(
                () => this.$set(this.startOf, moment().format('LTS')),
                1000
            )
            */
        var self = this // moment().subtract(1, 'seconds')
        if (this.endOf > moment.duration(0, 'seconds')) {
          this.endOf = this.endOf.subtract(1, 'seconds') // moment().format('LTS')
          setTimeout(self.clock, 1000)
        } else {
          this.validateQuiz()
        }
      },
      beforeSelectSessionOrQuiz (sessionsOrQuizId) {
        if (this.type === 'quiz' && this.quizRunning) {
          this.$confirm('Do you really want to leave?', 'Warning', {
            confirmButtonText: 'Quit wiyhout save',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.selectSessionOrQuiz(sessionsOrQuizId)
          }).catch(() => {
            return false
          })
        } else this.selectSessionOrQuiz(sessionsOrQuizId)
      },
      selectSessionOrQuiz (sessionsOrQuizId) {
        this.questions = []
        this.questionSet = []
        this.answers = []
        this.quizRunning = false
        this.quizResulting = false
        this.quizResult = 0
        this.$store.dispatch('$_lms/selectSessionOrQuiz', sessionsOrQuizId)
  
        if (this.type === 'quiz') {
          this.questionSet = this.$store.getters['$_lms/currentSessionOrQuiz'].questions
  
          this.questionSet.forEach(question => {
            var questionResponseSet = this.$store.getters['$_lms/questionById'](question.id).responses
            var responses = []
            questionResponseSet.forEach(response => {
              if (response.is_right) {
                response.checked = false
                responses.push(response)
              }
            })
            var answer = { 'question': question, 'responses': responses, 'answers': []}
            this.answers.push(answer)
          })
          this.questions = this.questionSet.slice(0, this.nbQuestionByPage)
        } else {
                // alert(JSON.stringify(this.video))
        }
      },
      handleCurrentChange (val) {
            // alert( Math.ceil(this.questions.length * 100 / this.nbQuestionByPage) )
            // Pagination
        this.questions = this.questionSet.slice((val - 1) * this.nbQuestionByPage, val * this.nbQuestionByPage)
      },
      startQuiz () {
        alert(this.duration)
        this.startOf = moment().format('LTS')
        this.endOf = moment.duration(this.duration, 'minutes')
        this.clock()
        this.quizRunning = true
      },
      validateQuiz () {
        this.quizResult = 0
            // this.quizResulting = true
        this.questions.forEach((question, index) => {
          question.result = question.point
          var questionResponseSet = this.$store.getters['$_lms/questionById'](question.id).responses
          questionResponseSet.forEach((response, respIndex) => {
            response.checked = false
            if (typeof this.answers[index].answers === 'number') {
              if (response.id === this.answers[index].answers) {
                response.checked = true
              }
            } else {
              this.answers[index].answers.forEach(ans => {
                if (response.id === ans) {
                  response.checked = true
                }
              })
            }
                    // alert(JSON.stringify(response))
                    /* this.answers.forEach( answer => {
                        alert(JSON.stringify(questionResponseSet[respIndex]))
                        response.checked = false
                        if (typeof answer.answers === 'number') {
                            // answer.answers.forEach( ans => {
                            if (response.id === answer.answers) {
                                // alert(response.id + ' - ' + answer.answers + ' - ' + response.checked)
                                questionResponseSet[respIndex].checked = true
                                // this.$set(response, 'checked', true)
                                // alert(questionResponseSet[respIndex].checked)
                            }
                            // })
                        } else {
                            answer.answers.forEach( ans => {
                                if (response.id === ans) {
                                    response.checked = true
                                }
                            })
                        }
  
                    }) */
          })
                // alert(JSON.stringify(questionResponseSet))
  
          questionResponseSet.forEach((response, respIndex) => {
            if (response.checked !== response.is_right) {
                                    // alert(JSON.stringify(response))
              question.result = 0
                        // this.$set(question, 'result', 0)
            }
          })
          this.$set(question, 'responses', questionResponseSet)
                // var answer = { 'question': question, 'responses':responses, 'answers': []}
                // this.answers.push(answer)
        })
            // alert(JSON.stringify(this.questions))
        var succeed_result_number = 0
        this.questions.forEach(question => {
          if (question.result !== 0) succeed_result_number++
        })
            // var question_length = this.questions.length
        this.quizResult = Math.floor(succeed_result_number * 100 / this.questions.length)
        this.quizResulting = true
            // alert( 'failed_result_number:' + succeed_result_number + ' - question_length:' + question_length + ' - result:' + result )
      },
      restartQuiz () {
            // this.quizResulting = true
            // this.quizResult = 0
        this.selectSessionOrQuiz(this.$store.getters['$_lms/currentSessionOrQuizId'])
      },
      sessionOrQuizClose (done) {
            // this.$confirm('Are you sure to close this dialog?')
            // .then(_ => {
        this.$store.dispatch('$_lms/selectSessionOrQuiz', null)
        done()
            // })
            // .catch(_ => {});
      },
      back () {
        this.$router.push({ name: 'courses'})
      },
      edit () {
        this.$router.push({ name: 'courseSetup'})
      },
      addToCart (item) {
        this.$store.commit('$_cart/CART_ITEM_ADD', item)
            /* this.$toast.open({
                message: 'Added to cart',
                type: 'is-success'
            }) */
      }
    },
    watch: {
      locale (val) {
        this.$i18n.locale = val
      }
    }
  }
</script>

<style lang="scss" scoped>

.el-submenu {
    /* background-color:#DCDFE6!important; */
    &:hover {
        background-color: #FFF;
    }

    border-bottom: 1px solid #DCDFE6;
    background-color: #FFF;
    
    /deep/ .el-submenu__title {
    
        &:hover {
            background-color: #FFFFFF;
        }
    }
}

.el-checkbox {
    width:100%;
    margin-left:10px;
    margin-bottom:10px;
    min-height:25px;
    line-height:25px;

    /deep/ .el-checkbox__input {
        line-height: 30px;
        vertical-align: top!important;
    }
    
    /deep/ .note {
        line-height: 25px;
    }
    
    &.is-disabled {

        /deep/ .el-checkbox__input {
            line-height: 25px;
            vertical-align: top!important;
        }
    
        /deep/ .note {
            color: #606266;
            font-weight: 400;
        }
    }
}
.el-radio {
    width:100%;
    margin-left:10px;
    /* margin-bottom:10px; */
    min-height:20px;
    line-height:20px;
    
    /deep/ .el-radio__label {
        line-height: 19px;
    }
    
    &.is-disabled {
        margin-bottom:10px;
        
        /deep/ .note {
            margin-top: 10px;
            margin-left: 27px;
            color: #606266;
            font-weight: 400;
        }
    }
}
.el-icon-check {
    color:#67C23A;
}
.el-icon-close {
    color:#F56C6C;
}
.el-header {
    width: 100%;
    padding: 9px 18px;
    height: 48px!important;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    color: #fff;
    font-size: 22px;
    position: relative;
    z-index: 0;
    font-weight: 400;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    background-color: #FFF;
    border-bottom: 1px solid rgb(235, 238, 245);
}
.el-main {
    padding: 20px;
    min-height: calc(100vh - 48px);
    position: relative;
    float: right;
    width: 100%;
    /* width: calc(100% - 260px); */
    -webkit-transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
    transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
}
.el-card {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #DCDFE6;
    border-radius: 0px;
}
.el-card#course-card .el-card__body .el-row{
    margin:-20px;
}
.el-breadcrumb {
    font-size: 1.5rem;
}
#course-header {
}
#course-title {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 2.5rem;
}
#course-subtitle {
    font-size: 1.4rem;
    margin-bottom: 0px;
}
h1 {
    margin-top: 20px;
    font-size: 1.7rem;
}
h2 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 0.6rem!important;
}
hr {
    margin: 5px 15px;
    margin-top: 3rem;
    margin-bottom: 1rem;
    border: 0;
    border-top-width: 0px;
    border-top-style: none;
    border-top-color: currentcolor;
    border-top: 1px solid rgba(0,0,0,.1);
    box-sizing: content-box;
    height: 0;
    overflow: visible;
}
/* is-finish is-process is-wait */
</style>
