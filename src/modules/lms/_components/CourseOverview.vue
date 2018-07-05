<template>
    <el-container>
        <el-header>
        <el-row :gutter="10">
                    <el-col :span="20">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/lms' }">E-leaning Center</el-breadcrumb-item>
                <el-breadcrumb-item>Course setup</el-breadcrumb-item>
            </el-breadcrumb>
            </el-col>
            <el-col :span="4">
            <cart-status></cart-status>
            </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-card>
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <section id="course-header">
                                    <el-row>
                                        <el-col :span="22">
                                            <h1 id="course-title">{{ title }}</h1>
                                        </el-col>
                                        <el-col :span="2" style="text-align:right;">
                                            <el-tooltip class="item" effect="light" content="Back to course list" placement="top">
                                                <el-button type="danger" icon="el-icon-circle-close" :round="true" size="mini" @click="back()"></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="light" content="Edit course" placement="bottom">
                                                <el-button style="margin-top:10px;" type="warning" icon="el-icon-edit" :round="true" size="mini" @click="edit()"></el-button>
                                            </el-tooltip>
                                        </el-col>
                                    </el-row>
                                    <el-card id="course-card">
                                        <el-row>
                                            <el-col :span="16">
                                                <video v-if="video" width="100%" height="100%">
                                                    <source :src="video.url" :type="video.type">
                                                        Your browser does not support the video tag.
                                                </video>
                                                <img v-else-if="image" :src="image" class="avatar" style="width:100%;height:431px;background-color:#EFEFEF;"/>
                                            </el-col>
                                            <el-col :span="8" style="padding:10px;">
                                                <h2 class="course-price" style="margin:0; font-size:3rem;">{{ price - (price * discount / 100)}} {{ currency }} <small style="color:#909399; text-decoration:line-through;">{{ price }} {{ currency }}</small>
                                                </h2>
                                                <h3 class="course-price-discount" style="margin:0;">{{ discount }}% de r&eacute;duction</h3>
                                                <b> {{ numberOfsubscribers }} 25500</b> participants inscrits
                                                <el-rate v-model="rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
                                                <p>Crée par {{ author }} - Dernière mise à jour:{{ lastUpdate }}</p>
                                                <div style="text-align:center;">
                                                    <el-button type="danger" style="margin:10px auto;">Acheter maintenant</el-button> <br/>
                                                    <el-button @click="addToCart(Id)">Ajouter au panier</el-button>
                                                </div>
                                                <p>Fonctionnalités</p>
                                                <p>
                                                    <span v-for="feature in 5">
                                                        <i :class="el-icon-view"></i>
                                                        <span>Features {{ feature }}</span>
                                                    </span>
                                                </p>
                                            </el-col>
                                        </el-row>
                                    </el-card>
                                    
                                </section>
                            </el-col>
                            <el-col :span="16">
                                <h2 id="course-subtitle">{{ subtitle }}</h2>
                                    <p v-html="description"></p>
                                <section id="course-skills">
                                    <h3>Que vais-je apprendre ?</h3>
                                    <el-row class="skills">
                                        <el-col :span="24" v-for="skill in skills" :key="skill.id" style="padding-bottom:20px;">
                                            <b><i class="el-icon-check"></i></b>
                                            <span style="width:95%; float:right;">{{ skill.description }}</span>
                                        </el-col>
                                    </el-row>
                                </section>
                                <!--</el-col>
                                 <el-col :span="16">-->
                                <section id="course-requirements">
                                    <h3>Exigences</h3>
                                    <ul>
                                        <li v-if="requirements.length < 0">Aucune exigence</li>
                                        <li v-else v-for="req in requirements" class="requirement">
                                            {{ req.description }}
                                        </li>
                                    </ul>
                                </section>
                            </el-col>
                            
                            <el-col :span="8">
                                <div style="margin-top: 20px;"></div>
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
                                        @click="runCourse(sesQuiz.id)">
                                        {{index + nb + '-' + (sesOrQuizIndex + 1)}}. {{sesQuiz.title}}
                                        <!-- <span style="display:block"> {{ Math.floor(sesQuiz.duration/60) }} hr {{sesQuiz.duration % 60}} min </span> -->
                                    </el-menu-item>
                                </el-submenu>
                                </div>
                            </el-menu>
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
                       <!-- <course-overview-card /> -->
                    </el-col>
                </el-row>
            </el-card>
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
  import CartStatus from './Cart/CartStatus.vue'

  export default {
    components: {
      CartStatus
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
      currency () {
        return this.$store.getters['$_lms/currentCourse'].currency
      },
        // Course Form
      author () {
        return this.$store.getters['$_lms/currentCourse'].author
      },
      Id() {
        return this.$store.getters['$_lms/currentCourse'].id
      },
      title () {
        return this.$store.getters['$_lms/currentCourse'].title
      },
      subtitle () {
        return this.$store.getters['$_lms/currentCourse'].subtitle
      },
      description () {
        return this.$store.getters['$_lms/currentCourse'].description
      },
      video () {
        return this.$store.getters['$_lms/currentCourse'].video
      },
      image () {
        return this.$store.getters['$_lms/currentCourse'].image
      },
      badge () {
        return this.$store.getters['$_lms/currentCourse'].badge
      },
      rate () {
        return this.$store.getters['$_lms/currentCourse'].rate
      },
      isFree () {
        return this.$store.getters['$_lms/currentCourse'].is_free
      },
      price () {
        return this.$store.getters['$_lms/currentCourse'].price
      },
      discount () {
        return this.$store.getters['$_lms/currentCourse'].discount
      },
      status () {
        return this.$store.getters['$_lms/currentCourse'].status
      },
      numberOfsubscribers () {
        return this.$store.getters['$_lms/currentCourse'].number_of_subscribers
      },
      lastUpdate () {
        return this.$store.getters['$_lms/currentCourse'].last_update
      },
        // Pour le menu step vfor section -> sessionOrQuiz
      sections () {
        return this.$store.getters['$_lms/currentCourse'].sections
      },
      skills () {
        return this.$store.getters['$_lms/currentCourse'].skills
      },
      requirements () {
        return this.$store.getters['$_lms/currentCourse'].requirements
      }
    },
    methods: {
      selectSessionOrQuiz (sessionsOrQuizId) {
        this.questions = []
        this.$store.dispatch('$_lms/selectSessionOrQuiz', sessionsOrQuizId)
        this.questions = this.$store.getters['$_lms/currentSessionOrQuiz'].questions
        this.questions.forEach(question => {
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
        this.activeName = 'description'
        this.quizRunning = true
        this.dialogVisible = true
      },
      validateQuiz () {
        this.quizResult = 0
        this.quizRunning = true
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
        var question_length = this.questions.length
        this.quizResult = succeed_result_number * 100 / question_length
        this.quizRunning = false
            // alert( 'failed_result_number:' + succeed_result_number + ' - question_length:' + question_length + ' - result:' + result )
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
      runCourse (sesQuizId) {
            // alert(sesQuizId)
        this.$store.dispatch('$_lms/selectSessionOrQuiz', sesQuizId)
        this.$router.push({ name: 'courseRunning'})
      },
      addToCart (item) {
        // alert(JSON.stringify(item))
        this.$store.dispatch('$_lms/addToCart', item)
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
    border: 1px solid #DCDFE6;
    background-color: #FFF;
    
    &:hover {
        background-color: #FFF;
    }

    /deep/ .el-submenu__title {
    
        &:hover {
            background-color: #FFFFFF;
        }
    }
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
    
    .el-row {
        width: 100%;
    }
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
h3 {
    font-size: 1.2rem;
    margin-top: 2rem;
    margin-bottom: 0.6rem!important;
}
video {
/*object-fit: contain;*/
/*       object-fit: fill; */
    object-fit: cover;
    width:100%;
    height:450px;
}
.skills {
    background-color:#F2F6FC;
    border:1px solid #EBEEF5;
    border-radius:5px;
    padding:10px 10px 0px 10px;
}
.requirement {
    padding:10px 10px 15px 10px;
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
