<template>
    <el-card v-loading="loading">
        <div class="courseContent" v-if="$store.getters.currentSessionOrQuiz.type === 'session'">
            <h1>Edition de session</h1>
            <el-form>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <h2>Video</h2>
                        <el-form-item>
                            <el-upload
                                class="avatar-uploader"
                                style="height:350px"
                                drag
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :multiple="false"
                                :on-success="sessionContentSuccess"
                                :on-error="sessionContentFail"
                                :before-upload="beforeContentUpload">
                                <video v-if="sessionOrQuizContent" :src="sessionOrQuizContent" class="avatar">
                                    <!-- <track kind="subtitles" src="foo.en.vtt" srclang="en" label="English"> -->
                                </video>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">Placez votre contenu ici ou <em>cliquer pour uploader</em></div>
                                <div class="el-upload__tip" slot="tip">Fichier mp4/mpeg4/flv de taille inférieure ou égale à 150Mb</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="24">
                                <h2>Titre</h2>
                                <el-form-item>
                                    <el-input v-model="title" autofocus placeholder="Saisissez le titre ici" size="small"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <h2>Description</h2>
                                <el-form-item>
                                    <el-input v-model="description" type="textarea" placeholder="Saisissez la description ici" size="small"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        
                    </el-col>
                    <!--
                     <el-col :span="12">
                     <el-form class="demo-form-inline">
                     <el-form-item label="Fichier de sous-titrage">
                     <el-upload
                     class="upload-demo"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :on-success="sessionContentTrackSuccess"
                     :multiple="false">
                     <el-button size="small" type="primary">Cliquer pour uploader le fichier de sous-titrage</el-button>
                     <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                     </el-upload>
                     </el-form-item>
                     <el-form-item label="Lien du sous-titrage">
                     <el-select v-model="newSessionSubtrack.srclang" placeholder="Select">
                     <el-option
                     v-for="item in sessionLang"
                     :key="item.srclang"
                     :label="item.label"
                     :value="item.srclang">
                     </el-option>
                     </el-select>
                     
                     </el-form-item>
                     <el-form-item>
                     <el-button type="primary" @click="addSessionTrack()">Ajouter le sous-titrage</el-button>
                     </el-form-item>
                     </el-form>
                     <el-table
                     ref="trackTables"
                     :data="sessionOrQuiz.ressources"
                     @expand-change="handleExpandChange"
                     style="width: 100%">
                     <el-table-column type="expand">
                     <template slot-scope="props">
                     <el-form>
                     <el-form-item prop="props.row">
                     <el-row :gutter="20">
                     <el-col :span="9" :offset="3">
                     <el-form-item label="Description" >
                     <el-input v-model="props.row.description"></el-input>
                     </el-form-item>
                     </el-col>
                     <el-col :span="9">
                     <el-form-item label="Label" >
                     <el-input v-model="props.row.link"></el-input>
                     </el-form-item>
                     </el-col>
                     </el-row>
                     </el-form-item>
                     </el-form>
                     </template>
                     </el-table-column>
                     <el-table-column
                     label="Description"
                     align="left"
                     prop="description">
                     </el-table-column>
                     <el-table-column
                     label="Lien"
                     align="left"
                     prop="link">
                     </el-table-column>
                     </el-table>
                     
                     
                     </el-col>
                     -->
                </el-row>
            </el-form>
            <el-row>
                <el-col :span="24">
                    <h2>Ressources externes</h2>
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <el-form class="demo-form-inline">
                                <el-form-item label="Description la ressource">
                                    <el-input v-model="newSessionRessouce.description" placeholder="Saisir une description de la ressource" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="Lien de la ressource">
                                    <el-input v-model="newSessionRessouce.link" placeholder="Ex. www.domain.com/un-lien-vers-la-ressource.html " size="small">
                                    </el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="addSessionRessource()" size="small">Ajouter la ressource</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                        <el-col :span="16">
                            <!--<table width="100%">
                                <thead>
                                    <tr><td>Description de la ressource</td><td>Lien de la ressource</td><td></td></tr>
                                </thead>
                                <tbody>
                                    <tr v-if="1" v-for="ressource in $store.getters.currentSessionOrQuiz.ressources" :key="id">
                                        <td width="45%">
                                            <el-input :value="ressource.description" style="display:block;" type="textarea" :rows="2" @change=""></el-input>
                                        </td>
                                        <td width="45%">
                                            <el-input v-model="ressource.link" type="textarea" :rows="2" ></el-input>
                                        </td>
                                        <td>
                                            <el-button type="danger" icon="el-icon-delete" circle size="small"></el-button>
                                        </td>
                                    </tr>
                                    <tr v-else><td colspan="3"><center>Aucune ressource dans cette session</center></td></tr>
                                </tbody>
                            </table>-->
                            <el-table
                                ref="ressourceTables"
                                :data="$store.getters.currentSessionOrQuiz.ressources"
                                @expand-change="handleExpandChange"
                                :span-method="objectSpanMethod"
                                style="width: 100%">
                                <el-table-column
                                    label="Description"
                                    align="left"
                                    prop="description">
                                </el-table-column>
                                <el-table-column
                                    label="Lien"
                                    align="left"
                                    prop="link">
                                </el-table-column>
                                <el-table-column type="expand">
                                    <template slot-scope="props">
                                        <el-form>
                                            <el-form-item prop="props.row">
                                                <el-row :gutter="5">
                                                    <el-col :span="10" :offset="1">
                                                        <el-form-item label="Description" >
                                                            <el-input v-model="props.row.description" type="textarea" :rows="2" ></el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="10">
                                                        <el-form-item label="Label" >
                                                            <el-input v-model="props.row.link" type="textarea" :rows="2" ></el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="2">
                                                        <el-form-item>
                                                            <br/><br/>
                                                            <el-button type="danger" icon="el-icon-delete" circle size="small" @click="delSessionRessource(props.$index, props.row.id)"></el-button>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </el-form-item>
                                        </el-form>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <!-- <el-form-item>
                     <el-button> Annuler </el-button>
                     <el-button> Enregistrer </el-button>
                     </el-form-item> -->
                </el-col>
            </el-row>
        </div>
        <div class="courseQuiz" v-else>
            <h2>Edition de QUIZ</h2>
            <el-form>
                <el-form-item
                    prop="Note">
                    <el-input v-model="description" autofocus placeholder="Saisissez une note à propos de ce quiz"></el-input>
                </el-form-item>
                <el-form-item
                    prop="duration">
                    <label>Durée de l'évaluation en heure (laissez à 0 pour infini)</label>
                    <el-input-number v-model="duration" :min="0" :max="5"></el-input-number>
                </el-form-item>
                <hr/>
                <div class="courseQuizContainer">
                    
                    <course-setup-quiz-question v-for="(question, index) in questions" :key="index" :type="question.type" :questionIndex="index" :point="question.point" :question="question.question" :responses="question.responses" v-on:addResponse="addQuizQuestionResponse" v-on:deleteQuizQuestionResponse="delQuizQuestionResponse" v-on:deleteQuizQuestion="delQuizQuestion">
                    </course-setup-quiz-question>
                    
                </div>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addQuizQuestion('singlechoice') " plain size="small">Réponse unique</el-button>
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addQuizQuestion('multichoice') " plain size="small">Réponses multiples</el-button>
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addQuizQuestion('text') " plain size="small">Reponse texte</el-button>
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addQuizQuestion('code') " plain size="small">Reponse code</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-button @click="deactivateSessionOrQuiz()"> Retour </el-button>
            <el-button type="warning"> Enregistrer </el-button>
        </div>
    </el-card>
    <!-- <el-dialog
     title="Tips"
     :visible.sync="activeSessionOrQuizLocked"
     width="30%"
     :before-close="handleClose">
     <span>Cet élement est actuellement édité par un autre utilisateur</span>
     <span slot="footer" class="dialog-footer">
     <el-button type="primary" @click="lockedReturn()">Fermer</el-button>
     </span>
     </el-dialog> -->
    <!-- <el-dialog :title="selectedTable.name" :visible.sync="dialogFormVisible"> -->
    <!-- </el-dialog> -->
</template>

<script>
  
  import CourseSetupQuizQuestion from './CourseSetupQuizItem.vue'
  
  export default {
    // props: ['username','profile'],
    // name: 'user-card',
    /*
    props: {
        username: { default() { return '' } },
        profile: { default() { return {} } }// body data
    },
    */
    components: {
      CourseSetupQuizQuestion
    },
    data () {
      return {
        newSessionRessouce: {
          description: '',
          link: ''
        },
        sessionLang: [
          {
            value: 'fr',
            label: 'Français'
          }, {
            value: 'en',
            label: 'English'
          }, {
            value: 'es',
            label: 'Español'
          }, {
            value: 'zh',
            label: '中國'
          }, {
            value: 'ar',
            label: 'العربية'
          }
        ],
        newSessionSubtrack: {
          link: '',
          srclang: '',
          label: ''
        },
        sessionContentChanged: false,
        me: {
          id: null,
          type: '',
          title: '',
          description: '',
          content: '',
          duration: 0,
          ressources: [],
          tracks: [],
          questions: []
        },
        ressourceRowIndex: 0
      }
    },
    created () {
        /*
        this.me.questions.forEach( question => {
               //responsesTab[question.id].push(question.responses)
               this.$delete(question, 'responses')
            }
        )
  
        this.me.questions.forEach(question => {
            var responseTab = this.$store.getters.questionByIdResponseSet(question.id)
            alert(responseTab)
            this.$delete(question, 'responses')
            this.$set(question, 'responses', responseTab)
        })
        */
        // alert(JSON.stringify(this.me.questions))
    },
    mounted () {
    },
    computed: {
        /*
        loading() {
            return this.$store.getters.loading
        },
        ressourceSet() {
            return this.$store.getters.ressourceSet
        },
        ressources() {
            // return this.$store.getters.currentSessionOrQuiz.ressources.map(Id => this.ressourceSet[Id])
        },
        responseSet() {
            return this.$store.getters.responseSet
        },
        questionSet() {
            return this.$store.getters.questionSet
        },
        */
      questions () {
            /*
            var questions = this.$store.getters.currentSessionOrQuiz.questions
            // alert(JSON.stringify(this.responseSet))
            // alert(JSON.stringify(questions))
  
            questions.forEach(question => {
                // alert(JSON.stringify(typeof question.responses[0]))
                // Comprendre pourquoi question.responses ne se reinitialis e pas a chaq chargement
                if (typeof question.responses[0] === 'number' ) {
                    var responses = question.responses.map(It => this.responseSet[It])
                    this.$delete(question, 'responses')
                    this.$set(question, 'responses', responses)
                } else {
                    // alert("Not number")
                }
            })
            */
        return this.$store.getters.currentSessionOrQuiz.questions
            // alert(JSON.stringify(questions))
            // return questions
      },
        /*
        trackSet() {
            return this.$store.getters.trackSet
        },
        tracks() {
            return this.$store.getters.currentSessionOrQuiz.tracks.map(Id => this.trackSet[Id])
        },
        */
      title: {
        get () {
          return this.$store.getters.currentSessionOrQuiz.title
        },
        set (value) {
          this.$store.commit('SESSION_OR_QUIZ_SET_TITLE', value)
        }
      },
      description: {
        get () {
          return this.$store.getters.currentSessionOrQuiz.description
        },
        set (value) {
          this.$store.commit('SESSION_OR_QUIZ_SET_DESCRIPTION', value)
        }
      },
      content () {
        return this.$store.getters.currentSessionOrQuiz.content
      }

    },
    beforeDestroy () {
      this.me = {
        id: null,
        type: '',
        title: '',
        description: '',
        content: '',
        duration: 0,
        ressources: [],
        tracks: [],
        questions: []
      }
    },
    methods: {
      // End test
      lockedReturn () {
        this.$router.go(-1) // retour en arriere
      },
      sessionContentFail (res, file) { // Set sessionOrQuiz Content after submitting in saveSessionOrQuiz()
        this.$notify.error({
          title: 'Error',
          message: 'Impossible de uploader le contenu. Veuillez vérifier votre connexion internet'
        })
      },
      sessionContentSuccess (res, file) { // Set sessionOrQuiz Content after submitting in saveSessionOrQuiz()
            // this.me.content = URL.createObjectURL(file.raw)
        this.$store.commit('SESSION_OR_QUIZ_SET_CONTENT', URL.createObjectURL(file.raw))
        this.$notify.success({
          title: 'Succès',
          message: 'Contenu uploader avec succès'
        })
      },
      sessionContentTrackSuccess (res, file) {
        this.newSessionSubtrack = URL.createObjectURL(file.raw)
      },
      deactivateSessionOrQuiz () {
        this.$store.dispatch('deselectSessionOrQuiz')
        this.$router.push({ name: 'courseSetup'})
      },
      saveSessionOrQuiz () {
        if (this.me.type === 'session' && this.me.content === '') {
          this.$confirm("Vous n'avez pas encore uploadé de contenu video, voulez-vous continuer?", 'Attention', {
            confirmButtonText: 'Oui, continuer',
            cancelButtonText: 'Annuler',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('saveSessionOrQuiz', this.me).then(response => {
              console.log('Got some data, now lets show something in this component')
              this.$notify.success({
                title: 'Succès',
                message: 'Sauvegarde réussie.'
              })
            }, error => {
              console.error('Got nothing from server. Prompt user to check internet connection and try again')
              this.$notify.error({
                title: 'Error',
                message: 'Impossible de sauvegarder cet élément. Veuillez vérifier votre connexion internet',
                duration: 0
              })
            })
          }).catch(() => {
  
          })
        } else {
          this.$store.dispatch('saveSessionOrQuiz').then(response => {
            console.log('Got some data, now lets show something in this component')
            this.$notify.success({
              title: 'Succès',
              message: 'Sauvegarde réussie.'
            })
          }, error => {
            console.error('Got nothing from server. Prompt user to check internet connection and try again')
            this.$notify.error({
              title: 'Erreur',
              message: 'Impossible de sauvegarder cet élément. Veuillez vérifier votre connexion internet',
              duration: 0
            })
          })
        }
      },
      delSessionOrQuiz () {
        this.$store.dispatch('deleteSessionOrQuiz').then(response => {
          console.log('Got some data, now lets show something in this component')
          this.$router.push({ name: 'CourseSetup'})
                // TODO: stop the ajax spinner, loading is done at this point.
        }, error => {
          console.error('Got nothing from server. Prompt user to check internet connection and try again')
          this.$notify.error({
            title: 'Error',
            message: 'Impossible de supprimer cet élément. Veuillez vérifier votre connexion internet',
            duration: 0
          })
        })
      },
      handleContentChange () { // Detect video content change
        this.sessionContentChanged = true
      },
      // Session Ressources Management
      addSessionRessource () {
        this.$store.dispatch('addSessionRessource', {'description': this.newSessionRessouce.description, 'link': this.newSessionRessouce.link})
            // this.me.ressources.push({'description': this.newSessionRessouce.description, 'link': this.newSessionRessouce.link})
        this.newSessionRessouce.description = ''
        this.newSessionRessouce.link = ''
      },
      delSessionRessource (resIndex, ressourceId) {
        alert(resIndex)
        this.$store.dispatch('deleteSessionRessource', {'ressourceIndex': resIndex, 'ressourceId': ressourceId})
            // this.me.ressources.splice(resIndex, 1)
      },
      handleExpandChange (row, expandedRows) {
            // alert(JSON.stringify(row))
        if (expandedRows && expandedRows.length > 1) {
          expandedRowser = expandedRows.splice(0, 1)
        }
      },
      rowClick (row, event, column) {
        alert(JSON.stringify(event))
      },
      objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
        /* if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        } */
      },
      // Quiz Management
      addQuizQuestion (itemType) {
            // alert('Ajout de question :' + itemType)
        this.$store.commit('QUIZ_QUESTION_ADD', itemType)
            /*    this.me.questions.push(
                    {
                        id: null,
                        type: itemType,
                        seq: 0, // Les plus petits apparaissent en premier
                        question: '',
                        responses:[],
                        point: 0,
                    }
                )
            */
      },
      delQuizQuestion: function (questionIndex) {
        this.$store.commit('QUIZ_QUESTION_DELETE', questionIndex)
            /* A transferer dans le store
                this.sessionOrQuiz.courseQuizQuestions.forEach(item => {
                    if( item.counter === payload.itemCounter ) {
                        this.sessionOrQuiz.courseQuizQuestions.splice(sesOrQuiz.courseQuizQuestions.indexOf(item), 1)
                    }
                })
            */
            // this.me.questions.splice(questionIndex, 1)
      },
      addQuizQuestionResponse: function (questionIndex) {
        this.$store.commit('QUIZ_QUESTION_RESPONSE_ADD', questionIndex)
            /* A transferer dans le store
          this.sessionOrQuiz.courseQuizQuestions.forEach(item => {
            if (item.counter = payload.itemCounter){
                item.courseQuizQuestionsResponses.push(
                    {
                        id: null,
                        response: '',
                        isRight: true,
                        note: '',
                        counter: payload.responseCounter
                    }
                )
            }
          })*
            this.me.questions[questionIndex].responses.push({
                id: null,
                response: '',
                is_right: true,
                note: ''
            })
            */
      },
      delQuizQuestionResponse: function (payload) {
        this.$store.commit('QUIZ_QUESTION_RESPONSE_DELETE', payload)
            /* A transferer dans le store
          this.sessionOrQuiz.courseQuizQuestions.forEach(item => {
            if (item.counter = payload.itemCounter){
                item.courseQuizQuestionsResponses.forEach(response => {
                    if(response.counter === payload.responseCounter) {
                        item.courseQuizQuestionsResponses.splice(item.courseQuizQuestionsResponses.indexOf(response), 1)
                    }
                })
            }
          })
          *
          this.me.questions[payload.questionIndex].responses.splice(payload.responseIndex, 1)
  
          this.$nextTick(function () {
            console.log('suppression dune reponse') // => 'mis à jour'
          })
          // alert(JSON.stringify(this.QuizQuestionDataSingle))
          // alert(this.QuizQuestionDataSingle.indexOf(response))
          // var pp = this.QuizQuestionDataSingle.pop(2)
          // alert(JSON.stringify(pp))
          */
      },
      //  File Upload Checking
      beforeContentUpload (file) {
        const isMP4 = file.type === 'video/mp4'
        const isLt2M = file.size / 1024 / 1024 < 200

        if (!isMP4) {
          this.$message.error('Le contenu de la session doit être au format MP4!')
        }
        if (!isLt2M) {
          this.$message.error('La taille du contenu de la session ne peut excéder 200MB!')
        }
        return isJPG && isLt2M
      },
      beforeImageUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('Avatar picture must be JPG format!')
        }
        if (!isLt2M) {
          this.$message.error('Avatar picture size can not exceed 2MB!')
        }
        return isJPG && isLt2M
      }
    }
}
</script>

<style scoped>
h1 {
    font-size: 2rem;
    margin-top:10px;
}
h2 {
    margin: 0px;
    font-size: 1rem;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload {
    display: block;
    width: 95%;
  }
    .el-upload-dragger {
        width:100%;
        min-height: 280px;
    }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    margin: 100px 0 16px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-form-item {
    margin-bottom: 12px;
}
.image {
    overflow: hidden;
    height: 120px;
    position: relative;
}
.card-body {
    min-height: 240px;
    padding: 15px 15px 10px 15px;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
}
.author {
    text-align: center;
    text-transform: none;
    margin-top: -77px;
}
.avatar {
    width: 124px;
    height: 124px;
    border: 1px solid #FFFFFF;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    margin-bottom: 15px;
    vertical-align: middle;
}
.button-container {
    margin-bottom: 6px;
    text-align: center;
}
.el-card hr {
    margin: 5px 15px;
    margin-top: 1rem;
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
</style>
