<template>
    <el-card>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <section id="course-header">
                            <h1 id="course-title">{{ $store.getters.currentCourse.title }}</h1>
                            <el-card id="course-card">
                                <el-row>
                                    <el-col :span="16">
                                        <video :src="video" class="avatar" style="width:100%;height:431px;background-color:#EFEFEF;">
                                            <!-- <track kind="subtitles" src="foo.en.vtt" srclang="en" label="English"> -->
                                        </video>
                                    </el-col>
                                    <el-col :span="8" style="padding:10px;">
                                        <h2 class="course-price" style="margin:0;">{{ price }} {{ currency }} <small>{{ price * discount }} {{ currency }}</small></h2>
                                        <h3 class="course-price-discount" style="margin:0;">{{}} de r&eacute;duction</h3>
                                        <b> {{ numberOfsubscribers }} 25500</b> participants inscrits
                                        <el-rate v-model="rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
                                        <p>Crée par {{ $store.getters.currentCourse.author }} - Dernière mise à jour:{{ $store.getters.currentCourse.last_update }}</p>
                                        <div style="text-align:center;">
                                            <el-button type="danger" style="margin:10px auto;" @click="addToCart($store.getters.currentCourse)">Acheter maintenant</el-button> <br/>
                                            <el-button>Ajouter au panier</el-button>
                                        </div>
                                        <p>Fonctionnalités</p>
                                        <ul>
                                            <li v-for="feature in 5">
                                                <i :class="el-icon-view"></i>
                                                <span style="width:95%; float:right;">Features features {{ feature }}</span>
                                            </li>
                                        </ul>
                                    </el-col>
                                </el-row>
                            </el-card>
                            <h2 id="course-subtitle">{{ $store.getters.currentCourse.subtitle }}</h2>
                            <p v-html="description"></p>
                        </section>
                    </el-col>
                    <el-col :span="8">
                        <section id="course-skills">
                            <h3>Que vais-je apprendre ?</h3>
                            <el-row style="background-color:#F1F8FF;border:1px solid #00ACC1;border-radius:5px;padding:10px 10px 0px 10px;">
                                <el-col :span="24" v-for="skill in 6" :key="skill.id" style="padding-bottom:10px;">
                                    <b><i class="el-icon-check"></i></b>
                                    <span style="width:95%; float:right;">Vue JS is an awesome javascript Framework for building</span>
                                </el-col>
                            </el-row>
                        </section>
                        <!--</el-col>
                         <el-col :span="16">-->
                        <section id="course-requirements">
                            <h3>Exigences</h3>
                            <ul>
                                <li v-if="requirements.length > 0" v-for="req in requirements">
                                    {{ req.description }}
                                </li>
                                <li v-else>Aucune exigence</li>
                            </ul>
                        </section>
                    </el-col>
                    
                    <el-col :span="16">
                        <section id="course-program">
                            <h3>Programme du cours</h3>
                            <div class="box">
                                <el-collapse accordion v-if="sections.length > 0" class="box-section">
                                    <el-collapse-item v-for="(section, index) in sections" :key="section.id" :name="index" class="box-section-item">
                                        <template slot="title">
                                            <span style="font-size:15px;font-weight:500;">{{index+1}} - {{section.title}}</span>
                                        </template>
                                        <div v-if="section.session_or_quizs.length > 0" class="box-session-or-quiz">
                                            <ul>
                                                <li v-for="(sesQuiz, index) in $store.getters.sectionByIdSessionOrQuizSet(section.id)" :key="sesQuiz.id">
                                                    
                                                    <el-button type="text" @click="selectSessionOrQuiz(sesQuiz.id)">{{sesQuiz.title}}</el-button>
                                                </li>
                                            </ul>
                                        </div>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </section>
                    </el-col>
                    <!--<el-col :span="24">--
                     <section id="course-description">
                     <h3>Description</h3>
                     <p v-html="description"></p>
                     </section>
                     </el-col>-->
                </el-row>
            </el-col>
            <el-col :span="8">
                <course-overview-card />
            </el-col>
        </el-row>
        <el-dialog
            :title="$store.getters.currentCourse.title"
            :visible.sync="dialogVisible"
            :fullscreen="true"
            :before-close="sessionOrQuizClose">
            <el-row>
                <el-col :span="6">
                    <el-collapse accordion v-if="sections.length > 0" class="box-section">
                        <el-collapse-item v-for="(section, index) in sections" :key="section.id" :name="index" class="box-section-item">
                            <template slot="title">
                                <span style="font-size:15px;font-weight:500;">{{index+1}} - {{section.title}}</span>
                            </template>
                            <div v-if="section.session_or_quizs.length > 0" class="box-session-or-quiz">
                                <!--
                                <el-steps direction="vertical" :space="50" :active="1">
                                    <el-step v-for="(sesQuiz, index) in $store.getters.sectionByIdSessionOrQuizSet(section.id)" :key="sesQuiz.id" >
                                        <template slot="title">
                                            <el-button type="text" @click="selectSessionOrQuiz(sesQuiz.id)" class="step-button">{{sesQuiz.title}}</el-button>
                                        </template>
                                    </el-step>
                                </el-steps>
                                -->
                                <div class="el-steps el-steps--vertical">
                                    <div class="el-step is-vertical" style="flex-basis: 50px;" v-for="(sesQuiz, sesQuizIndex) in $store.getters.sectionByIdSessionOrQuizSet(section.id)" :key="sesQuiz.id">
                                        <div class="el-step__head is-finish">
                                            <div class="el-step__line" style="margin-right: 0px;">
                                                <i class="el-step__line-inner" style="transition-delay: 0ms; border-width: 0px; height: 0%;"></i>
                                            </div>
                                            <div class="el-step__icon is-text">
                                                <div class="el-step__icon-inner">{{sesQuizIndex + 1}}</div>
                                            </div>
                                        </div>
                                        <div class="el-step__main">
                                            <div class="el-step__title is-finish">
                                                <el-button type="text" @click="selectSessionOrQuiz(sesQuiz.id)" class="step-button">{{sesQuiz.title}}</el-button>
                                            </div>
                                            <div class="el-step__description is-finish"></div>
                                            <!-- is-finish is-process is-wait-->
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-col>
                <el-col :span="18" style="border-left: 1px solid #CCC;border-top: 1px solid #CCC;">
                    <el-row v-if="$store.getters.currentSessionOrQuiz.type === 'session'">
                        <el-col :span="24" style="padding-left:20px;">
                            <h2>{{ $store.getters.currentSessionOrQuiz.title }}</h2>
                        </el-col>
                        <el-col :span="24">
                            <video :src="$store.getters.currentSessionOrQuiz.content" class="avatar" style="width:100%;height:431px;background-color:#EFEFEF;">
                                <!-- <track kind="subtitles" src="foo.en.vtt" srclang="en" label="English"> -->
                            </video>
                        </el-col>
                        <el-col :span="24" style="padding-left:20px;">
                            <br/>
                            <el-tabs v-model="activeName" @tab-click="handleClick">
                                <el-tab-pane label="Description" name="description">
                                    {{ $store.getters.currentSessionOrQuiz.description }}
                                </el-tab-pane>
                                <el-tab-pane label="Ressources" name="ressources">
                                    <span v-for="ressource in $store.getters.currentSessionOrQuiz.ressources" :key="id">
                                        <span>{{ ressource.description }}</span> <a :href="ressource.link">cliquez ici</a><br/>
                                    </span>
                                </el-tab-pane>
                                <el-tab-pane label="Commentaires" name="comments">Liste des commentaires</el-tab-pane>
                            </el-tabs>
                        </el-col>
                    </el-row>
                    <el-row v-else>
                        <el-col :span="20" style="padding-left:20px;border-top:1px solid #EFEFEF">
                            <h1>{{ $store.getters.currentSessionOrQuiz.title }}</h1>
                            <p>{{ $store.getters.currentSessionOrQuiz.description }}</p>
                            <hr/>
                        </el-col>
                        <el-col :span="4" style="padding-left:20px;border-top:1px solid #EFEFEF">
                            <p style="font-size:30px;">20:20</p>
                        </el-col>
                        <el-col :span="20" style="padding-left:20px;" v-if="quizRunning === false">
                            <el-alert
                                v-if="quizResult >= 70"
                                title="Bravo ! Vous avez réussi cet exercice !"
                                type="success"
                                show-icon
                                :closable="false">
                            </el-alert>
                            <el-alert
                                v-if="quizResult < 70"
                                title="Désolé ! Vous n'avez pas réussi cet exercice !"
                                type="warning"
                                show-icon
                                :closable="false">
                            </el-alert>
                        </el-col>
                        <el-col :span="20" v-for="(question,index) in questions" :key="question.id" style="padding:20px 40px 0px 40px;">
                            <p>
                                {{ question.question }}
                                <b v-if="quizRunning === false && question.result !== 0" style="color:#67C23A">Vrai</b>
                                <b v-if="quizRunning === false && question.result === 0" style="color:#F56C6C">Faux</b>
                            </p>
                            <el-checkbox-group v-if="question.type === 'multichoice'" v-model="answers[index].answers" :disabled="quizRunning === false">
                                <el-checkbox v-for="response in question.responses" :key="id" :label="response.id" style="width:100%;margin-left:10px;height:30px;line-height:30px;">
                                    {{ response.response }}
                                    <i class="el-icon-check" style="color:#67C23A" v-if="quizRunning === false && response.is_right === true"></i>
                                    <i class="el-icon-close" style="color:#F56C6C" v-if="quizRunning === false && response.is_right === false && response.checked === true"></i>
                                </el-checkbox>
                            </el-checkbox-group>
                            <el-radio-group v-if="question.type === 'singlechoice'"  v-model="answers[index].answers" :disabled="quizRunning === false">
                                <el-radio v-for="response in question.responses" :key="id" :label="response.id" style="width:100%;margin-left:10px;height:30px;line-height:30px;">
                                    {{ response.response }}
                                    <i class="el-icon-check" style="color:#67C23A" v-if="quizRunning === false && response.is_right === true"></i>
                                    <i class="el-icon-close" style="color:#F56C6C" v-if="quizRunning === false && response.is_right === false && response.checked === true"></i>
                                </el-radio>
                            </el-radio-group>
                            <!--
                            <div v-if="quizRunning === false">
                                <p v-for="response in question.responses" :key="response.id">
                                    <i class="el-icon-close" v-if="response.checked !== response.is_right"></i> <i class="el-icon-check" v-if="response.checked === response.is_right"></i> - {{ response.response }}
                                </p>
                            </div>
                            -->
                        </el-col>
                        <el-col :span="10" style="padding:20px;">
                            <span>20:20</span>
                        </el-col>
                        <el-col :span="10" style="padding:20px;">
                            <el-button type="warning" style="float:right;" @click="validateQuiz()"> Valider </el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-dialog>
    </el-card>
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
  import CourseOverviewCard from './CourseOverviewCard.vue'

  export default {
    components: {
      CourseOverviewCard
    },
    data () {
      return {
        dialogVisible: false,
        activeName: 'description',
        answers: [],
        quizRunning: true,
        quizResult: 0,
        questions: [],
        locale: 'fr'
      }
    },
    created () {
        // this.questions = this.$store.getters.currentSessionOrQuiz.questions
        // alert(JSON.stringify(this.questions))
    },
    mounted () {
    },
    computed: {
      loadingCourse () {
        return this.$store.getters.loading
      },
        // Course Form
      author () {
        return this.$store.getters.currentCourse.instructor_name
      },
      title () {
        return this.$store.getters.currentCourse.title
      },
      subtitle () {
        return this.$store.getters.currentCourse.subtitle
      },
      description () {
        return this.$store.getters.currentCourse.description
      },
      image () {
        return this.$store.getters.currentCourse.image
      },
      badge () {
        return this.$store.getters.currentCourse.badge
      },
      rate () {
        return this.$store.getters.currentCourse.rate
      },
      isFree () {
        return this.$store.getters.currentCourse.is_free
      },
      price () {
        return this.$store.getters.currentCourse.price
      },
      status () {
        return this.$store.getters.currentCourse.status
      },
      numberOfsubscribers () {
        return this.$store.getters.currentCourse.number_of_subscribers
      },
      lastUpdate () {
        return this.$store.getters.currentCourse.last_update
      },
        // Pour le menu step vfor section -> sessionOrQuiz
      sections () {
        return this.$store.getters.currentCourse.sections
      },
      skills () {
        return this.$store.getters.currentCourseSkillSet
      },
      requirements () {
        return this.$store.getters.currentCourseRequirementSet
      }
    },
    methods: {
      selectSessionOrQuiz (sessionsOrQuizId) {
        this.questions = []
        this.$store.dispatch('selectSessionOrQuiz', sessionsOrQuizId)
            // if (this.$store.getters.currentSessionOrQuiz.type === 'quiz') {
        this.questions = this.$store.getters.currentSessionOrQuiz.questions
        this.questions.forEach(question => {
          var questionResponseSet = this.$store.getters.questionById(question.id).responses
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
                // alert(JSON.stringify(this.answers))
            // }
        this.activeName = 'description'
        this.quizRunning = true
        this.dialogVisible = true
            // alert(this.$store.state.currentSessionOrQuiz.type)
            // this.$router.push({ name: 'sessionOrQuizView'})
      },
      validateQuiz () {
        this.quizResult = 0
        this.quizRunning = true
        this.questions.forEach((question, index) => {
          question.result = question.point
          var questionResponseSet = this.$store.getters.questionById(question.id).responses
                // alert(JSON.stringify(questionResponseSet))
          questionResponseSet.forEach((response, respIndex) => {
                    // alert(typeof this.answers[index].answers)
            response.checked = false
            if (typeof this.answers[index].answers === 'number') {
                        // questionResponseSet.forEach( (response, respIndex) => {
              if (response.id === this.answers[index].answers) {
                response.checked = true
              }
                        // })
            } else {
                        // questionResponseSet.forEach( (response, respIndex) => {
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
        var question_length = this.questions.length
        this.quizResult = succeed_result_number * 100 / question_length
        this.quizRunning = false
            // alert( 'failed_result_number:' + succeed_result_number + ' - question_length:' + question_length + ' - result:' + result )
      },
      sessionOrQuizClose (done) {
            // this.$confirm('Are you sure to close this dialog?')
            // .then(_ => {
        this.$store.dispatch('selectSessionOrQuiz', null)
        done()
            // })
            // .catch(_ => {});
      },
      addToCart (item) {
        this.$store.commit('CART_ITEM_ADD', item)
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
.el-card#course-card .el-card__body .el-row{
    margin:-20px;
}
#course-header {
}
h1#course-title {
    margin-top: 0;
    font-size: 2.5rem;
}
h2#course-subtitle {
    font-size: 1.4rem;
    margin-bottom: 0px;
}
h3 {
    font-size: 1.2rem;
    margin-top: 2rem;
    margin-bottom: 0.6rem!important;
}
#course-skills {
}
#course-program {
}
.el-collapse-item__header {
                font-size: 16px;
}
.step-button {
    padding: 0;
    word-wrap: break-word;
}
.el-collapse {
    .el-collapse-item {
        div[role=tab] {
            
        }
        .el-collapse-item__wrap {
            .el-collapse-item__content {
            
                padding-bottom: 0px important;
                
                .box-session-or-quiz {
                    ul {
                        margin: 0;
                        padding-left: 10px;
                        list-style: none;
                        li {
                            height: 48px;
                            line-height: 48px;
                            padding-left: 10px;
                            .el-button {
                                width:100%;
                            }
                            .el-button--text {
                                text-align: left;
                                color: #4F4F4F;
                                font-weight: 400;
                                font-size: 15px;
                            }
                        }
                        li:hover {
                            background-color:#F1F8FF;
                            border:1px solid #00ACE1;
                        }
                    }
                    /* .el-step__icon { top: 20%;} */
                }
            }
            .el-collapse-item__header {
                background-color: #F3F6F8!important;
            }
        }
    }
}
#course-requirements {
}
#course-description {
}
/* is-finish is-process is-wait */
</style>
