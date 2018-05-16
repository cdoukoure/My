<template>
    <el-container>
        <el-header>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/lms' }">E-leaning Center</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/lms/courses/course-setup' }">Course setup</el-breadcrumb-item>
                <el-breadcrumb-item>Session Or Quiz Edition</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <el-form ref="courseForm">
                <el-card>
                    <el-row>
                        <el-col :span="24">
                            <h2>Titre</h2>
                            <el-form-item>
                                <el-input v-model="title" autofocus placeholder="Saisissez le titre ici" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <h2>Description</h2>
                            <el-form-item>
                                <el-input v-model="description" type="textarea" placeholder="Saisissez la description ici" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <el-tabs v-if="$store.getters['$_lms/currentSessionOrQuiz'].type === 'session'" v-model="activeTab">
                        <el-tab-pane label="Contenu vidéo" name="video">
                            <el-row :gutter="20">
                                <el-col :span="16">

                                    <video width="100%" height="450" :poster="video.imagePreview" controls>
                                     <source :src="video.url" :type="video.type">
                                     Your browser does not support the video tag.
                                    </video>
                                    <!-- <iframe v-if="video !== ''" width="100%" height="450" style="float: center;"
                                        :src="video">
                                    </iframe>
                                    <!--<el-form-item v-if="video !== ''">
                                        <el-upload
                                            class="avatar-uploader"
                                            style="height:350px"
                                            drag
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            :multiple="false"
                                            :on-success="sessionVideoSuccess"
                                            :on-error="sessionVideoFail"
                                            :before-upload="beforeContentUpload">
                                            <video v-if="video !== ''" :src="video" class="avatar">
                                                <!-- <track kind="subtitles" src="foo.en.vtt" srclang="en" label="English"> --
                                            </video>
                                            <i class="el-icon-upload"></i>
                                            <div class="el-upload__text">Placez votre contenu ici ou <em>cliquer pour uploader</em></div>
                                            <div class="el-upload__tip" slot="tip">Fichier mp4/mpeg4/flv de taille inférieure ou égale à 150Mb</div>
                                        </el-upload>
                                    </el-form-item> -->
                                </el-col>
                                <el-col :span="8">
                                    <video-widget v-on:videoClicked="changeVideoContent"></video-widget>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="Contenu textuel" name="text">
                            <el-row :gutter="10">
                                <el-col :span="24">
                                    <el-form-item>
                                        <vue-editor id="editor"
                                            useCustomImageHandler
                                            @imageAdded="handleImageAdded"
                                            v-model="text">
                                        </vue-editor>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="Ressources externes" name="second">
                            <el-row>
                                <el-col :span="24">
                                    
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
                                    
                                </el-col>
                                <el-col :span="24">
                                    <el-table
                                        ref="ressourceTables"
                                        :data="$store.getters['$_lms/currentSessionOrQuiz'].ressources"
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
                            <el-row>
                                <el-col :span="24">
                                    <br/><br/><br/>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        
                    </el-tabs>
                    
                    
                    <div class="courseQuiz" v-else>
                        <el-row :gutter="20">
                            <el-col :span="14">
                                <el-form-item>
                                    <label>Durée de l'évaluation en minutes (laissez à 0 pour infini)</label>
                                    <el-input-number controls-position="right" v-model="duration" :min="0" :max="480"></el-input-number>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item>
                                    <label>Nombres de questions par page</label>
                                    <el-input-number controls-position="right" v-model="nbQuestionByPage" :min="0" :max="10"></el-input-number>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        
                        <h2>Edition des questions</h2>
                        <div class="courseQuizContainer">
                            
                            <el-collapse v-model="activeName" accordion>
                                
                                <course-setup-quiz-question v-for="(question, index) in questions" :key="index" :type="question.type" :questionIndex="index" :point="question.point" :question="question.question" :responses="question.responses" v-on:addResponse="addQuizQuestionResponse" v-on:deleteQuizQuestionResponse="delQuizQuestionResponse" v-on:deleteQuizQuestion="delQuizQuestion">
                                </course-setup-quiz-question>
                                
                            </el-collapse>
                            
                        </div>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addQuizQuestion('singlechoice') " plain size="small">Réponse unique</el-button>
                            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addQuizQuestion('multichoice') " plain size="small">Réponses multiples</el-button>
                            <!--
                             <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addQuizQuestion('text') " plain size="small">Reponse texte</el-button>
                             <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addQuizQuestion('code') " plain size="small">Reponse code</el-button>
                             -->
                        </el-form-item>
                    </div>
                    <div>
                        <el-button @click="deactivateSessionOrQuiz()"> Retour </el-button>
                        <el-button type="warning"> Enregistrer </el-button>
                    </div>
                </el-card>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  import axios from 'axios'
  import CourseSetupQuizQuestion from './CourseSetupSessionOrQuiz/CourseSetupQuizItem.vue'
  import VideoWidget from './CourseSetupSessionOrQuiz/VideoCard.vue'

/*

$sql = mysql_query("SELECT * FROM item_details WHERE posting_id='$item_number'");
$results = array();
while($row = mysql_fetch_array($sql))
{
   $results[] = array(
      'title' => base64_decode($row['title']),
      'price' => $row['price'],
      'seller_user' => $row['user']
   );
}
$json = json_encode($results);

*/

  export default {
    components: {
      VueEditor,
      CourseSetupQuizQuestion,
      VideoWidget
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
        ressourceRowIndex: 0,
        activeTab: 'video'
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
      loading () {
        return this.$store.getters.loading
      },
      ressourceSet () {
        return this.$store.getters['$_lms/ressourceSet']
      },
      ressources () {
            // return this.$store.getters['$_lms/currentSessionOrQuiz'].ressources.map(Id => this.ressourceSet[Id])
      },
      responseSet () {
        return this.$store.getters['$_lms/responseSet']
      },
      questionSet () {
        return this.$store.getters['$_lms/questionSet']
      },
      questions () {
        var questions = this.$store.getters['$_lms/currentSessionOrQuiz'].questions
            // alert(JSON.stringify(this.responseSet))
            // alert(JSON.stringify(questions))
  
        questions.forEach(question => {
                // alert(JSON.stringify(typeof question.responses[0]))
                // Comprendre pourquoi question.responses ne se reinitialis e pas a chaq chargement
          if (typeof question.responses[0] === 'number') {
            var responses = question.responses.map(It => this.responseSet[It])
            this.$delete(question, 'responses')
            this.$set(question, 'responses', responses)
          } else {
                    // alert("Not number")
          }
        })
            // return this.$store.getters['$_lms/currentSessionOrQuiz'].questions
            // alert(JSON.stringify(questions))
        return questions
      },
      trackSet () {
        return this.$store.getters['$_lms/trackSet']
      },
      tracks () {
        return this.$store.getters['$_lms/currentSessionOrQuiz'].tracks.map(Id => this.trackSet[Id])
      },
      title: {
        get () {
          return this.$store.getters['$_lms/currentSessionOrQuiz'].title
        },
        set (value) {
          this.$store.commit('$_lms/SESSION_OR_QUIZ_SET_TITLE', value)
        }
      },
      description: {
        get () {
          return this.$store.getters['$_lms/currentSessionOrQuiz'].description
        },
        set (value) {
          this.$store.commit('$_lms/SESSION_OR_QUIZ_SET_DESCRIPTION', value)
        }
      },
      video () {
        return this.$store.getters['$_lms/currentSessionOrQuiz'].video
      },
      text: {
        get () {
          return this.$store.getters['$_lms/currentSessionOrQuiz'].transcription
        },
        set (value) {
          this.$store.commit('$_lms/SESSION_OR_QUIZ_SET_TEXT', value)
        }
      },
      duration: {
        get () {
          return this.$store.getters['$_lms/currentSessionOrQuiz'].duration
        },
        set (value) {
          this.$store.commit('$_lms/SESSION_OR_QUIZ_SET_DURATION', value)
        }
      },
      minResult: {
        get () {
          return this.$store.getters['$_lms/currentSessionOrQuiz'].min_result
        },
        set (value) {
          this.$store.commit('$_lms/SESSION_OR_QUIZ_SET_MINRESULT', value)
        }
      }
    },
    beforeDestroy () {
    },
    methods: {
      // End test
      lockedReturn () {
        this.$router.go(-1) // retour en arriere
      },
      sessionVideoFail (res, file) { // Set sessionOrQuiz Content after submitting in saveSessionOrQuiz()
        this.$notify.error({
          title: 'Error',
          message: 'Impossible de uploader le contenu. Veuillez vérifier votre connexion internet'
        })
      },
      sessionVideoSuccess (res, file) { // Set sessionOrQuiz Content after submitting in saveSessionOrQuiz()
            // this.me.content = URL.createObjectURL(file.raw)
        this.$store.commit('$_lms/SESSION_OR_QUIZ_SET_VIDEO', URL.createObjectURL(file.raw))
            /*
            this.$notify.success({
                title: 'Succès',
                message: 'Contenu uploader avec succès',
            })
            */
        this.$message({
          type: 'success',
          message: 'Contenu uploader avec succès'
        })
      },
      sessionContentTrackSuccess (res, file) {
        this.newSessionSubtrack = URL.createObjectURL(file.raw)
      },
      handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)

        var formData = new FormData()
        formData.append('image', file)
            /*
            axios({
                url: 'https://fakeapi.yoursite.com/images',
                method: 'POST',
                data: formData
            })
            */
        this.$store.dispatch('$_lms/sessionTextContentHandleImage', formData)
            .then((result) => {
              let url = result.data.url // Get url from response
              Editor.insertEmbed(cursorLocation, 'image', url)
              resetUploader()
            })
            .catch((err) => {
              console.log(err)
            })
      },
      deactivateSessionOrQuiz () {
        this.$store.dispatch('$_lms/deselectSessionOrQuiz')
        this.$router.push({ name: 'courseSetup'})
      },
      saveSessionOrQuiz () {
        if (this.me.type === 'session' && this.me.content === '') {
          this.$confirm("Vous n'avez pas encore uploadé de contenu video, voulez-vous continuer?", 'Attention', {
            confirmButtonText: 'Oui, continuer',
            cancelButtonText: 'Annuler',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('$_lms/saveSessionOrQuiz', this.me).then(response => {
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
          this.$store.dispatch('$_lms/saveSessionOrQuiz').then(response => {
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
        this.$store.dispatch('$_lms/deleteSessionOrQuiz').then(response => {
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
        this.$store.dispatch('$_lms/addSessionRessource', {'description': this.newSessionRessouce.description, 'link': this.newSessionRessouce.link})
            // this.me.ressources.push({'description': this.newSessionRessouce.description, 'link': this.newSessionRessouce.link})
        this.newSessionRessouce.description = ''
        this.newSessionRessouce.link = ''
      },
      delSessionRessource (resIndex, ressourceId) {
        alert(resIndex)
        this.$store.dispatch('$_lms/deleteSessionRessource', {'ressourceIndex': resIndex, 'ressourceId': ressourceId})
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
        this.$store.commit('$_lms/QUIZ_QUESTION_ADD', itemType)
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
        this.$store.commit('$_lms/QUIZ_QUESTION_DELETE', questionIndex)
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
        this.$store.commit('$_lms/QUIZ_QUESTION_RESPONSE_ADD', questionIndex)
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
        this.$store.commit('$_lms/QUIZ_QUESTION_RESPONSE_DELETE', payload)
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
          this.$message.error('Picture must be JPG format!')
        }
        if (!isLt2M) {
          this.$message.error('Picture size can not exceed 2MB!')
        }
        return isJPG && isLt2M
      },
      changeVideoContent (payload) {
        // alert(JSON.stringify(payload))
        this.$store.commit('$_lms/SESSION_OR_QUIZ_SET_VIDEO', payload)
        // var vid = document.getElementById("video1");
        // alert(vid.duration);
        var myVideo = document.getElementsByTagName('video')[0]
        this.$store.commit('$_lms/SESSION_OR_QUIZ_SET_DURATION', myVideo.duration)
        // alert(myVideo.duration)
        myVideo.load()
        myVideo.play()
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
.courseQuizContainer {
    padding: 10px;
    margin: 10px;
    background-color: #EBEEF5;
}
</style>
