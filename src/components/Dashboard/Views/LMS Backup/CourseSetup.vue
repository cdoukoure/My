<template>
    <el-container>
        <el-aside>
            <!-- -->
            <button type="text" @click="active = 0"> Généralités </button>
            <hr/>
            <!--
             <el-form ref="sectionForm">
             <el-form-item>
             <el-input placeholder="Saissez ici le titre de la section" v-model="courseSetup.title" class="input-with-select">
             <!-- <el-button slot="append" icon="el-icon-circle-plus"></el-button> --
             </el-input>
             </el-form-item>
             <el-form-item>
             <el-button icon="el-icon-circle-plus" @click="addSection()"> Ajouter une section </el-button>
             </el-form-item>
             </el-form>
             -->
            <hr/>
            <!--  // Collapse,// CollapseItem, -->
            <el-collapse accordion>
                <!-- <draggable id="list1" :list="course.sections" :options="{group:{name:'section', animation: 100 }}" @change="log"> --
                 <el-collapse-item v-for="section in course.sections" :key="tmpId" label="section.title">
                 <el-form-item>
                 <el-button icon="el-icon-circle-plus" @click="addSessionOrQuiz(section, 'session')"> Session </el-button>
                 <el-button icon="el-icon-circle-plus" @click="addSessionOrQuiz(section, 'quiz')"> Quiz </el-button>
                 </el-form-item>
                 <!-- Mettre des boutons "Edit", "Ajouter Session" et "Ajouter QUIZ" sur chaque collapse-item qd on est en mode edit--
                 <el-steps direction="vertical" :active="" simple finish-status="primary" class="step-menu">
                 <el-step v-for="item in section.sessionsOrQuiz" :key="tmpId" title="item.title">
                 <!--
                 <span slot="title">
                 {{ item.title }}
                 <el-button icon="el-icon-edit" @click="editSessionOrQuiz(item)"></el-button>
                 <el-button icon="el-icon-delete" @click="delSessionOrQuiz(item)"></el-button>
                 </span>
                 <!-- Mettre des boutons "Edit" et "Delete" sur chaque step qd on est en mode edit --
                 </el-step>
                 </el-steps>
                 </el-collapse-item>
                 <!-- </draggable> -->
            </el-collapse>
        </el-aside>
        <el-container class="main-panel">
            <el-header>
                <el-row :gutter="20" style="margin-bottom: 20px;margin-top:-80px;">
                    <el-col :span="2" style="padding: 20px;">
                        <el-button>
                            + Section
                        </el-button>
                        (Au clic, afficher la fenetre "Creation de tuto")
                    </el-col>
                    <el-col :span="10" :offset="8" style="padding: 20px;">
                        <el-input placeholder="Please input">
                            <i
                                class="el-icon-search el-input__icon"
                                slot="suffix">
                            </i>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                    </el-col>
                </el-row>
            </el-header>
            <div class="content" style="">
                <el-main>
                    <el-card v-loading="loadingCourse">
                        <div class="course" v-show="activeView === 0">
                            <el-form ref="courseForm">
                                <el-row :gutter="20">
                                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                        <el-form-item>
                                            <!-- :on-preview="handlePreview" :on-remove="handleRemove" -->
                                            <el-upload
                                                class="avatar-uploader"
                                                drag
                                                action="https://jsonplaceholder.typicode.com/posts/"
                                                :on-success="courseImageSuccess"
                                                :before-upload="beforeImageUpload">
                                                <img v-if="courseSetupImage" :src="courseSetupImage" class="avatar"/>
                                                <i class="el-icon-upload"></i>
                                                <div class="el-upload__text">Placez votre image ici ou <em>cliquer pour uploader</em></div>
                                                <div class="el-upload__tip" slot="tip">Fichier jpg/png de taille inférieure ou égale à 500kb</div>
                                            </el-upload>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                        <el-row>
                                            <el-col :span="24">
                                                <el-form-item label="Titre">
                                                    <el-input v-model="courseSetupTitle" autofocus placeholder="Saisissez le titre ici"></el-input>
                                                </el-form-item>
                                                <el-form-item label="Description">
                                                    <el-input v-model="courseSetupDescription" type="textarea" placeholder="Saisissez une description ici"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                                <el-form-item>
                                                    <span style="display:block;line-height: 40px;font-size: 14px;color: #606266;">Ce cours est gratuit ?</span>
                                                    <el-switch v-model="courseSetupIsFree" inactive-text="Non" active-text="Oui"></el-switch>
                                                </el-form-item>
                                            </el-col>
                                            <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                                                <el-form-item label="Prix">
                                                    <el-input v-model="courseSetupPrice" placeholder="Saisissez le prix. ex: 20.000" :disabled="courseSetupIsFree == 1"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    <!--
                                     <el-col :span="24">
                                     <el-form-item>
                                     <el-button> Annuler </el-button>
                                     <el-button> Enregistrer </el-button>
                                     </el-form-item>
                                     </el-col>
                                     -->
                                </el-row>
                            </el-form>
                        </div>
                        <div class="courseContent" v-show="activeView === 1">
                            <el-form>
                                <el-row :gutter="20">
                                    <el-col :span="16">
                                        <el-form-item>
                                            <!-- :on-preview="handlePreview" :on-remove="handleRemove" -->
                                            <el-upload
                                                class="avatar-uploader"
                                                style="height:350px"
                                                drag
                                                action="https://jsonplaceholder.typicode.com/posts/"
                                                :multiple="false"
                                                :on-success="sessionContentSuccess"
                                                :on-error="sessionContentFail"
                                                :before-upload="beforeContentUpload">
                                                <video v-if="courseSetupSessionsOrQuizContent" :src="courseSetupSessionsOrQuizContent" class="avatar">
                                                    <!-- <track kind="subtitles" src="foo.en.vtt" srclang="en" label="English"> -->
                                                </video>
                                                <i class="el-icon-upload"></i>
                                                <div class="el-upload__text">Placez votre contenu ici ou <em>cliquer pour uploader</em></div>
                                                <div class="el-upload__tip" slot="tip">Fichier mp4/mpeg4/flv de taille inférieure ou égale à 150Mb</div>
                                            </el-upload>
                                        </el-form-item>
                                        <!-- <video v-if="courseSessionQuizForm.type === 'video'" :src="courseSessionForm.video"></video>
                                         <slider v-if="courseSessionQuizForm.type === 'slide'" :src="courseSessionForm.video"></slider> -->
                                    </el-col>
                                    <!--
                                    <el-col :span="8">
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
                                        :data="courseSetupSessionsOrQuiz.ressources"
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
                                <el-row>
                                    <el-col :span="24">
                                        <h4>Titre</h4>
                                        <el-form-item>
                                            <el-input v-model="courseSetupSessionsOrQuizTitle" autofocus placeholder="Saisissez le titre ici"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <h4>Description</h4>
                                        <el-form-item>
                                            <el-input v-model="courseSetupSessionsOrQuizDescription" type="textarea" placeholder="Saisissez la description ici"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <el-row>
                                <el-col :span="24">
                                    <h4>Ressources externes</h4>
                                    <el-form :inline="true" class="demo-form-inline">
                                        <el-form-item label="Lien de la ressource">
                                            <el-input v-model="newSessionRessouce.description" placeholder="Saisir une description de la ressource"></el-input>
                                        </el-form-item>
                                        <el-form-item label="Description la ressource">
                                            <el-input v-model="newSessionRessouce.link" placeholder="Ex. domain.com/un-lien-vers-la-ressource.html ">
                                                <template slot="prepend">Http://</template>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" @click="addSessionRessource()">Ajouter la ressource</el-button>
                                        </el-form-item>
                                    </el-form>
                                    <el-table
                                        ref="ressourceTables"
                                        :data="courseSetupSessionsOrQuiz.ressources"
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
                        <div class="courseQuiz" v-show="activeView === 2">
                            <h4>Edition d'un QUIZ</h4>
                            <el-form>
                                <el-form-item
                                    prop="Note">
                                    <el-input v-model="courseSetupSessionsOrQuizDescription" autofocus placeholder="Saisissez une note à propos de ce quiz"></el-input>
                                </el-form-item>
                                <el-form-item
                                    prop="duration">
                                    <label>Durée de l'évaluation (laissez à 0 pour infini)</label>
                                    <el-input-number v-model="courseSetupSessionsOrQuizDuration" :min="0" :max="5"></el-input-number>
                                </el-form-item>
                                <hr/>
                                <div class="courseQuizContainer">
                                    <course-setup-quiz-item v-for="question in courseSetupSessionsOrQuizQuestions" :key="id" :type="question.type" :counter="question.counter" v-bind:point="5" :question="question.question" :courseQuizItemsResponses="question.responses" v-on:addResponse="addQuizQuestionResponse" v-on:deleteQuizItemResponse="delQuizQuestionResponse" v-on:deleteQuizItem="delQuizQuestion">
                                    </course-setup-quiz-item>
                                </div>
                                <el-form-item>
                                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addQuizQuestion('singlechoice') " plain>Réponse unique</el-button>
                                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addQuizQuestion('multichoice') " plain>Réponses multiples</el-button>
                                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addQuizQuestion('text') " plain>Reponse</el-button>
                                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addQuizQuestion('code') " plain>Reponse code</el-button>
                                </el-form-item>
                                <el-form-item>
                                    <el-button> Annuler </el-button>
                                    <el-button> Enregistrer </el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-card>
                </el-main>
            </div>
            <el-footer></el-footer>
        </el-container>
        <el-dialog
            title="Tips"
            :visible.sync="activeSessionOrQuizLocked"
            width="30%"
            :before-close="handleClose">
            <span>Cet élement est actuellement édité par un autre utilisateur</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="lockedReturn()">Fermer</el-button>
            </span>
        </el-dialog>
    </el-container>
    <!-- <el-dialog :title="selectedTable.name" :visible.sync="dialogFormVisible"> -->
    <!-- </el-dialog> -->
</template>

<script>
  
  import CourseSetupQuizItem from './CourseSetupQuizItem.vue'
  
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
      CourseSetupQuizItem
    },
    created () {
        // this.$store.dispatch('loadCourse')

        // A ramener dans le store
        // var cnt = 1
        /*
        this.course.courseSections.forEach(section => {
            section.sessionsOrQuiz.forEach(sesOrQuiz => {
                sesOrQuiz.courseQuizItems.forEach(item => {
                    item.counter = cnt++
                })
            })
        })
        */
        // this.counter = this.courseQuizItemsResponses.length
    },
    mounted () {
        // this.counter = this.courseQuizItemsResponses.length
    },
    data () {
      return {
        activeView: 0,
        newSessionRessouce: {
          description: '',
          link: ''
        },
        sessionLang: [{
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
        }],
        newSessionSubtrack: {
          link: '',
          srclang: '',
          label: ''
        },
        newSectionName: '',
        newSectionDescription: '',
        sessionContentChanged: false
      }
    },
    computed: {
      loadingCourse () {
        return this.$store.getters.loading
      },
        // Course Form
      courseSetupImage () {
        return this.$store.getters.courseSetupWithSectionsAndSessionOrQuiz.imageUrl
      },
      courseSetupTitle: {
        get () {
          return this.$store.getters.courseSetupWithSectionsAndSessionOrQuiz.title
        },
        set (value) {
          this.$store.commit('COURSE_SET_TITLE', value)
        }
      },
      courseSetupDescription: {
        get () {
          return this.$store.getters.courseSetupWithSectionsAndSessionOrQuiz.description
        },
        set (value) {
          this.$store.commit('COURSE_SET_DESCRIPTION', value)
        }
      },
      courseSetupIsFree: {
        get () {
          return this.$store.getters.courseSetupWithSectionsAndSessionOrQuiz.isFree
        },
        set (value) {
          this.$store.commit('COURSE_SET_ISFREE', value)
        }
      },
      courseSetupPrice: {
        get () {
          return this.$store.getters.courseSetupWithSectionsAndSessionOrQuiz.price
        },
        set (value) {
          this.$store.commit('COURSE_SET_PRICE', value)
        }
      },
      courseSetupStatus: {
        get () {
          return this.$store.getters.courseSetupWithSectionsAndSessionOrQuiz.status
        },
        set (value) {
          this.$store.commit('COURSE_SET_STATUS', value)
        }
      },
        // Pour le menu step vfor section -> sessionOrQuiz
      courseSetupSectionsWithSessionOrQuiz () {
        return this.$store.getters.courseSetupWithSectionsAndSessionOrQuiz.sectionWithSessionOrQuiz
      },
        // section Form
      courseSectionTitle: {
        get () {
          return this.$store.getters.courseSetupSection.title
        },
        set (value) {
          this.$store.commit('SECTION_SET_TITLE', value)
        }
      },
      courseSectionDescription: {
        get () {
          return this.$store.getters.courseSetupSection.description
        },
        set (value) {
          this.$store.commit('SECTION_SET_DESCRIPTION', value)
        }
      },
      courseSectionCounter () {
        return this.$store.getters.courseSetupSection.counter
      },
        // SessionOrQuiz Form
      activeSessionOrQuizLocked () {
        return this.$store.getters.courseSetupSessionsOrQuiz.locked
      },
      courseSetupSessionsOrQuizType () {
        return this.$store.getters.courseSetupSessionsOrQuiz.type
      },
      courseSetupSessionsOrQuizContent () {
        return this.$store.getters.courseSetupSessionsOrQuiz.content
      },
      courseSetupSessionsOrQuizTitle: {
        get () {
          return this.$store.getters.courseSetupSessionsOrQuiz.title
        },
        set (value) {
          this.$store.commit('SESSION_OR_QUIZ_SET_TITLE', value)
        }
      },
      courseSetupSessionsOrQuizDescription: {
        get () {
          return this.$store.getters.courseSetupSessionsOrQuiz.description
        },
        set (value) {
          this.$store.commit('SESSION_OR_QUIZ_SET_DESCRIPTION', value)
        }
      },
      courseSetupSessionsOrQuizDuration: {
        get () {
          return this.$store.getters.courseSetupSessionsOrQuiz.duration
        },
        set (value) {
          this.$store.commit('SESSION_OR_QUIZ_SET_DURATION', value)
        }
      },
      courseSetupSessionsOrQuizRessources () {
        return this.$store.getters.courseSetupSessionsOrQuiz.ressources
      },
      courseSetupSessionsOrQuizQuestions () {
        return this.$store.getters.courseSetupSessionsOrQuiz.questions
      },
      courseSetupSessionsOrQuizCounter () {
        return this.$store.getters.courseSetupSessionsOrQuiz.counter
      }
        /*
        courseSetupSection() {
            return this.$store.getters.courseSetupSection
        },
        */
    },
    methods: {
      lockedReturn () {
        this.$router.go(-1) // retour en arriere
      },
      // Course Management
      courseImageSuccess (res, file) { // Set sessionOrQuiz Content after submitting in saveSessionOrQuiz()
        this.$store.commit('COURSE_SET_IMAGE', URL.createObjectURL(file.raw))
      },
      // Section Management
      newSection () {
        this.$store.dispatch('newSection')
      },
      selectSection (sectionCounter) {
        this.$store.dispatch('selectSection', this.courseSectionCounter)
      },
      saveSection () {
        this.$store.dispatch('saveSection')
      },
      delSection (sectionCounter) {
        this.$store.dispatch('deleteSection', sectionCounter)
      },
      // SessionOrQuiz Management
      newSessionOrQuiz (sectionCounter) {
        this.$store.dispatch('newSessionOrQuiz', sectionCounter)
      },
      selectSessionOrQuiz (sessionsOrQuizCounter) {
        this.$store.dispatch('selectSessionOrQuiz', sessionsOrQuizCounter).then(response => {
          console.log('Got some data, now lets show something in this component')
                // TODO: stop the ajax spinner, loading is done at this point.
        }, error => {
          console.error('Got nothing from server. Prompt user to check internet connection and try again')
          this.$notify.error({
            title: 'Error',
            message: 'Impossible de selectionner cet élément. Veuillez vérifier votre connexion internet',
            duration: 0
          })
        })
      },
      sessionContentFail (res, file) { // Set sessionOrQuiz Content after submitting in saveSessionOrQuiz()
        this.$notify.error({
          title: 'Error',
          message: 'Impossible de uploader le contenu. Veuillez vérifier votre connexion internet'
        })
      },
      sessionContentSuccess (res, file) { // Set sessionOrQuiz Content after submitting in saveSessionOrQuiz()
        this.$store.commit('SESSION_OR_QUIZ_SET_CONTENT', URL.createObjectURL(file.raw))
        this.$notify.success({
          title: 'Succès',
          message: 'Contenu uploader avec succès'
        })
      },
      sessionContentTrackSuccess (res, file) {
        this.newSessionSubtrack = URL.createObjectURL(file.raw)
      },
      saveSessionOrQuiz () {
        if (this.courseSetupSessionsOrQuizContent === '') {
          this.$confirm("Vous n'avez pas encore téléchargé de contenu, voulez-vous continuer?", 'Attention', {
            confirmButtonText: 'Oui, continuer',
            cancelButtonText: 'Annuler',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('saveSessionOrQuiz').then(response => {
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
      delSessionOrQuiz (sessionsOrQuizCounter) {
        this.$store.dispatch('deleteSessionOrQuiz', sessionsOrQuizCounter).then(response => {
          console.log('Got some data, now lets show something in this component')
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
        this.newSessionRessouce.description = ''
        this.newSessionRessouce.link = ''
      },
      delSessionRessource (resCounter) {
        this.$store.dispatch('deleteSessionRessource', resCounter)
      },
      handleExpandChange (row, expandedRows) {
        if (expandedRows && expandedRows.length > 1) {
          expandedRowser = expandedRows.splice(0, 1)
        }
      },
      // Quiz Management
      addQuizQuestion (itemType) {
            // alert('Ajout de question :' + itemType)
        this.$store.commit('QUIZ_QUESTION_ADD', itemType)
            /* A transferer dans le store
                this.courseSetupSessionsOrQuiz.courseQuizItems.push(
                    {
                        id: null,
                        type: itemType,
                        seq: 0, // Les plus petits apparaissent en premier
                        question: '',
                        courseQuizItemsResponses:[],
                        point: 0,
                        counter: this.counter++
                    }
                )
            */
      },
      delQuizQuestion: function (payload) {
        this.$store.commit('QUIZ_QUESTION_DELETE', payload)
            /* A transferer dans le store
                this.courseSetupSessionsOrQuiz.courseQuizItems.forEach(item => {
                    if( item.counter === payload.itemCounter ) {
                        this.courseSetupSessionsOrQuiz.courseQuizItems.splice(sesOrQuiz.courseQuizItems.indexOf(item), 1)
                    }
                })
            */
      },
      addQuizQuestionResponse: function (payload) {
        this.$store.commit('QUIZ_QUESTION_RESPONSE_ADD', payload)
            /* A transferer dans le store
          this.courseSetupSessionsOrQuiz.courseQuizItems.forEach(item => {
            if (item.counter = payload.itemCounter){
                item.courseQuizItemsResponses.push(
                    {
                        id: null,
                        response: '',
                        isRight: true,
                        note: '',
                        counter: payload.responseCounter
                    }
                )
            }
          }) */
      },
      delQuizQuestionResponse: function (payload) {
        this.$store.commit('QUIZ_QUESTION_RESPONSE_DELETE', payload)
            /* A transferer dans le store
          this.courseSetupSessionsOrQuiz.courseQuizItems.forEach(item => {
            if (item.counter = payload.itemCounter){
                item.courseQuizItemsResponses.forEach(response => {
                    if(response.counter === payload.responseCounter) {
                        item.courseQuizItemsResponses.splice(item.courseQuizItemsResponses.indexOf(response), 1)
                    }
                })
            }
          })
          */
        this.$nextTick(function () {
          console.log('suppression dune reponse') // => 'mis à jour'
        })
          // alert(JSON.stringify(this.quizItemDataSingle))
          // alert(this.quizItemDataSingle.indexOf(response))
          // var pp = this.quizItemDataSingle.pop(2)
          // alert(JSON.stringify(pp))
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

<style slot-scope>
h4 {
    margin-top: 0px;
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
