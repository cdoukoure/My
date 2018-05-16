<template>
    <el-container>
        <el-header>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/lms' }">E-leaning Center</el-breadcrumb-item>
                <el-breadcrumb-item>Course setup</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <el-form ref="courseForm">
                <el-card>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item>
                                <label style="font-size:14px; font-weight:500;">Titre</label>
                                <el-input v-model="title" autofocus placeholder="Saisissez le titre ici"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-tabs v-model="activeName">
                                <el-tab-pane label="Configuration" name="config">
                                    <el-row :gutter="40">
                                        <el-col :span="24">
                                            <el-row :gutter="20">
                                                <el-col :span="9">
                                                    <el-form-item>
                                                        <!-- :on-preview="handlePreview" :on-remove="handleRemove" -->
                                                        <label style="font-size:14px;">Vidéo de présentation</label>
                                                        <el-upload
                                                            class="video-uploader"
                                                            drag
                                                            action="https://jsonplaceholder.typicode.com/posts/"
                                                            :on-success="courseVideoSuccess"
                                                            :before-upload="beforeVideoUpload">
                                                            <video v-if="video" :src="video" class="avatar">
                                                                <!-- <track kind="subtitles" src="foo.en.vtt" srclang="en" label="English"> -->
                                                            </video>
                                                            <i class="el-icon-upload"></i>
                                                            <div class="el-upload__text">Placez votre vidéo de démonstration ici ou <em>cliquer pour uploader</em></div>
                                                            <div class="el-upload__tip" slot="tip">Fichier MP4 de taille inférieure ou égale à 200Mb</div>
                                                        </el-upload>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="9">
                                                    <el-form-item>
                                                        <!-- :on-preview="handlePreview" :on-remove="handleRemove" -->
                                                        <label style="font-size:14px;">Image de présentation</label>
                                                        <el-upload
                                                            class="image-uploader"
                                                            drag
                                                            action="https://jsonplaceholder.typicode.com/posts/"
                                                            :on-success="courseImageSuccess"
                                                            :before-upload="beforeImageUpload">
                                                            <img v-if="image" :src="image" class="avatar"/>
                                                            <i class="el-icon-upload"></i>
                                                            <div class="el-upload__text">Placez votre image de présentation ici ou <em>cliquer pour uploader</em></div>
                                                            <div class="el-upload__tip" slot="tip">Fichier jpg/png de taille inférieure ou égale à 500kb</div>
                                                        </el-upload>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="6">
                                                    <el-form-item>
                                                        <!-- :on-preview="handlePreview" :on-remove="handleRemove"
                                                         <el-upload
                                                         class="badge-uploader"
                                                         drag
                                                         action="https://jsonplaceholder.typicode.com/posts/"
                                                         :on-success="courseBadgeSuccess"
                                                         :before-upload="beforeImageUpload">
                                                         <img v-if="badge" :src="badge" class="avatar"/>
                                                         <i class="el-icon-upload"></i>
                                                         <div class="el-upload__text">Placez votre badge ici ou <em>cliquer pour uploader</em></div>
                                                         <div class="el-upload__tip" slot="tip">Fichier jpg/png de taille inférieure ou égale à 500kb</div>
                                                         </el-upload>
                                                         -->
                                                        <label style="font-size:14px;">Badge (image)</label>
                                                        <el-upload
                                                            action="https://jsonplaceholder.typicode.com/posts/"
                                                            list-type="picture-card"
                                                            :on-success="courseBadgeSuccess"
                                                            :before-upload="beforeImageUpload">
                                                            <i class="el-icon-plus"></i>
                                                            <div class="el-upload__tip" slot="tip">Fichier jpg/png de taille inférieure ou égale à 500kb</div>
                                                        </el-upload>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="24">
                                                    <el-form-item label="Sous-titre">
                                                        <el-input v-model="subtitle" type="textarea" autosize placeholder="Saisissez un sous-titre ici" size="small"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="Description">
                                                        <el-input v-model="description" type="textarea" autosize placeholder="Saisissez une description ici" size="small"></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="12">
                                                    <el-form-item>
                                                        <label style="display:block;line-height: 40px;font-size: 14px;color: #606266;">Ce cours est gratuit ?</label>
                                                        <el-switch v-model="isFree" inactive-text="Non" active-text="Oui"></el-switch>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col  :xs="24" :sm="24" :md="6" :lg="6" :xl="12">
                                                    <el-form-item label="Prix">
                                                        <el-input v-model="price" placeholder="Saisissez le prix. ex: 20000" :disabled="isFree == 1" size="small">
                                                                <el-select v-model="currency" slot="append" placeholder="Select">
                                                                    <el-option label="Dollars ($)" value="$"></el-option>
                                                                    <el-option label="Livre (£)" value="£"></el-option>
                                                                    <el-option label="Euro (€)" value="€"></el-option>
                                                                    <el-option label="XOF" value="XOF"></el-option>
                                                                </el-select>
                                                        </el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col  :xs="24" :sm="24" :md="6" :lg="6" :xl="12">
                                                    <el-form-item label="Appliquer une réduction de">
                                                        <el-input v-model="discount" placeholder="ex: 20" :disabled="isFree == 1" size="small">
                                                            <template slot="append">%</template>
                                                        </el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col  :xs="24" :sm="24" :md="6" :lg="6" :xl="12">
                                                    <span v-if="isFree == 0" style="display:block; height:80px;line-height:80px; text-align:center; font-weight:bold; font-size:3rem; color:#67C23A;">{{ price - (price * discount / 100) }} {{ currency }}</span>
                                                    <span v-if="isFree == 1" style="display:block; height:80px;line-height:80px; text-align:center; font-weight:bold; font-size:3rem; color:#E6A23C;">Gratuit</span>
                                                </el-col>
                                                <el-col  :span="24">
                                                    <el-form-item>
                                                        <label style="display:block;line-height: 40px;font-size: 14px;color: #606266;">Status</label>
                                                        <el-radio-group v-model="status" size="small">
                                                            <el-radio-button label="draft"></el-radio-button>
                                                            <el-radio-button label="submitted"></el-radio-button>
                                                            <el-radio-button label="accepted"></el-radio-button>
                                                            <el-radio-button label="rejected"></el-radio-button>
                                                            <el-radio-button label="change"></el-radio-button>
                                                        </el-radio-group>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                                <el-tab-pane label="Programme du cours" name="program">
                                    <el-row :gutter="40">
                                        <el-col :span="24">
                                                <!--
                                                 <el-collapse accordion>
                                                 <el-collapse-item v-for="(sesQuiz, index) in CourseSessionOrQuizs" :key="sesQuiz.id" :title="sesQuiz.name" :name="index">
                                                 <div> {{ sesQuiz.description }}
                                                 <el-button type="primary" icon="el-icon-edit" size="mini" circle style="float:right;" @click="selectSessionOrQuiz(sesQuiz.id)"></el-button>
                                                 </div>
                                                 <div></div>
                                                 </el-collapse-item>
                                                 </el-collapse>
                                                 -->
                                                <div>
                                                    <label>Ajouter section</label>
                                                    <el-form :inline="true" class="form-inline">
                                                        <el-form-item class="input">
                                                            <el-input v-model="newSection" placeholder="Saississez ici le nouveau titre de la section et cliquer sur le bouton à droite." size="mini" style="display:block;" type="textarea" autosize></el-input>
                                                        </el-form-item>
                                                        <el-form-item>
                                                            <el-tooltip class="item" effect="dark" content="Ajouter une nouvelle section" placement="bottom">
                                                                <el-button type="warning" plain icon="el-icon-upload2" size="mini" @click="addSection()">Ajouter une nouvelle section
                                                                </el-button>
                                                            </el-tooltip>
                                                        </el-form-item>
                                                    </el-form>
                                                </div>
                                                <el-collapse accordion @change="clearLocalState()">
                                                    <el-collapse-item v-for="(section, index) in sections" :key="section.id" :name="index" style="border:1px solid #ebeef5;padding:0px 10px;">
                                                        <template slot="title">
                                                            <i class="header-icon el-icon-plus"></i>
                                                            &nbsp; {{ section.title }}
                                                            <span style="float:right;margin-right: 20px;">{{ section.duration }}</span>
                                                        </template>
                                                        <div>
                                                            <el-form :inline="true" class="form-inline">
                                                                <el-row>
                                                                <el-col :span="21">
                                                                <el-form-item class="input">
                                                                    <!-- <el-input v-model="actualSection" placeholder="Saississez ici le nouveau titre de la section et cliquer sur le bouton à droite." size="mini" style="display:block;" type="textarea" autosize></el-input>-->
                                                                    <el-input :value="section.title" style="display:block;" type="textarea" autosize @change="localSectionUpdate(section.id, index, $event)">
                                                                    </el-input>
                                                                </el-form-item>
                                                                </el-col>
                                                                <el-col :span="3">
                                                                <el-form-item>
                                                                 <el-tooltip class="item" effect="dark" content="Modifier le titre de la section" placement="top">
                                                                 <el-button type="warning" :round="true" plain icon="el-icon-upload2" size="mini" @click="updateSection()">Modifier</el-button>
                                                                 </el-tooltip>
                                                                 </el-form-item>
                                                                 </el-col>
                                                                 </el-row>
                                                            </el-form>
                                                        </div>
                                                        <div style="margin:0px 15px 10px 0px;">
                                                            <el-row>
                                                                <el-col :span="21">
                                                            <el-button type="primary" icon="el-icon-plus" size="mini" plain @click="addSession0rQuiz(section.id, 'session')">Session</el-button>
                                                            
                                                            <el-button type="primary" icon="el-icon-plus" size="mini" plain @click="addSession0rQuiz(section.id, 'quiz')">Quiz</el-button>
                                                            </el-col>
                                                                <el-col :span="3">
                                                            <el-tooltip class="item" effect="dark" content="Cliquez pour supprimer cette section et toutes les sessions et quiz qu'elle contient." placement="right">
                                                                <el-button type="danger" icon="el-icon-delete" :round="true" size="mini" plain  @click="delSection(section.id)">Supprimer</el-button>
                                                            </el-tooltip>
                                                            
                                                            <!-- <el-button style="margin-top:10px;" type="danger" icon="el-icon-delete" :round="true" size="mini" plain  @click="delSection(index)">Supprimer</el-button> -->
                                                            
                                                            </el-col>
                                                                 </el-row>
                                                        </div>
                                                        <div v-if="section.session_or_quizs.length > 0">
                                                            <el-collapse accordion style="margin-left:10px;border:1px solid #ebeef5;padding:0px 10px;" @change="clearLocalState()">
                                                                <el-collapse-item v-for="(sesQuiz, index) in $store.getters['$_lms/sectionByIdSessionOrQuizSet'](section.id)" :key="sesQuiz.id" :name="index">
                                                                    <template slot="title">
                                                                        <i class="header-icon el-icon-view"></i> &nbsp; {{ sesQuiz.title }}
                                                                        <span style="float:right;margin-right: 20px">{{ Math.floor(sesQuiz.duration/60) }} min {{ Math.ceil(sesQuiz.duration % 60) }} sec</span>
                                                                    </template>
                                                                    <div> {{ sesQuiz.description }}
                                                                        <el-button type="primary" icon="el-icon-edit" size="mini" circle style="float:right;" @click="selectSessionOrQuiz(sesQuiz.id)"></el-button>
                                                                    </div>
                                                                </el-collapse-item>
                                                            </el-collapse>
                                                        </div>
                                                    </el-collapse-item>
                                                </el-collapse>
                                            
                                        </el-col>
                                    </el-row>
                                </el-tab-pane>
                                
                                <el-tab-pane label="Galerie de fichers" name="files">
                                    <course-file-management></course-file-management>
                                </el-tab-pane>
                                <el-row>
                                <el-col :span="24">
                                                    <hr/>
                                </el-col>
                                <el-col :span="24">
                                    <el-button @click="deactivateCourse()"> Retour </el-button>
                                    <el-button type="primary" @click="saveCourse()"> Enregistrer </el-button>
                                </el-col>
                                </el-row>
                            </el-tabs>
                        </el-col>
                    </el-row>
                    
                </el-card>
            </el-form>
        </el-main>
    </el-container>
    <!--
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
     -->
</template>

<script>
  import CourseFileManagement from './CourseSetup/CourseFileManagement.vue'

  export default {
    /*
    props: {
        courseIndex: { type: Number, default: 0 }
    },
    */
    components: {
      CourseFileManagement
    },
    created () {
    },
    mounted () {
        // alert(JSON.stringify(this.sections))
      this.$store.dispatch('$_lms/selectSessionOrQuiz', null)
    },
    data () {
      return {
        newSection: '',
        actualSection: '',
        activeName: 'config',
        localSection: {'sectionId': null, 'sectionIndex': null, 'title': null}
      }
    },
    methods: {
      // sectionSet: () => this.$store.state.$_lms.entities.sections,
      lockedReturn () {
        this.$router.go(-1) // retour en arriere
      },
      clearLocalState () {
        this.newSection = ''
        this.actualSection = ''
        this.localSection = {'sectionId': null, 'sectionIndex': null, 'title': null}
      },
      // Course Management
      courseVideoSuccess (res, file) { // Set sessionOrQuiz Content after submitting in saveSessionOrQuiz()
        this.$store.commit('$_lms/COURSE_SET_VIDEO', URL.createObjectURL(file.raw))
      },
      courseImageSuccess (res, file) { // Set sessionOrQuiz Content after submitting in saveSessionOrQuiz()
        this.$store.commit('$_lms/COURSE_SET_IMAGE', URL.createObjectURL(file.raw))
      },
      courseBadgeSuccess (res, file) { // Set sessionOrQuiz Content after submitting in saveSessionOrQuiz()
        this.$store.commit('$_lms/COURSE_SET_BADGE', URL.createObjectURL(file.raw))
      },
      deactivateCourse () {
        this.$router.push({ name: 'courses' })
        this.$store.dispatch('$_lms/deselectCourse')
      },
      saveCourse () {
        this.$store.dispatch('$_lms/saveCourse').then(response => {
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
      },
      delCourse () {
        this.$confirm('Cela supprimera de manière permanente cette section et toutes les sessions et les quiz contenus. Voulez-vous continuer?', 'Warning', {
          confirmButtonText: 'Supprimer tout',
          cancelButtonText: 'Annuler',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('$_lms/deleteCourse').then(response => {
            this.$message({
              type: 'success',
              message: 'Suppression achevée'
            })
            console.log('Got some data, now lets show something in this component')
            this.$router.push({ name: 'courses'})
                // TODO: stop the ajax spinner, loading is done at this point.
          }, error => {
            console.error('Got nothing from server. Prompt user to check internet connection and try again')
            this.$notify.error({
              title: 'Error',
              message: 'Impossible de supprimer cet élément. Veuillez vérifier votre connexion internet',
              duration: 0
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Suppression annulée'
          })
        })
      },
      // Section Management
      addSection () {
        // alert(this.newSection)
        this.$store.dispatch('$_lms/addSection', this.newSection)
        .then(response => {
          this.$message({
            type: 'success',
            message: 'Section créée avec succès'
          })
          console.log('Got some data, now lets show something in this component')
        }, error => {
          console.error('Got nothing from server. Prompt user to check internet connection and try again')
          this.$notify.error({
            title: 'Error',
            message: 'Impossible de créer une nouvelle section. Veuillez vérifier votre connexion internet',
            duration: 0
          })
        })
      },
      localSectionUpdate (sectionId, sectionIndex, value) {
        // alert(value)
        this.localSection = {'sectionId': sectionId, 'sectionIndex': sectionIndex, 'title': value}
        // alert(JSON.stringify(this.localSection))
        // this.$store.dispatch('$_lms/updateSection', {'sectionId':sectionId, 'sectionIndex':sectionIndex, 'title':value})
      },
      updateSection (sectionId, sectionIndex, value) {
        // alert(value)
        this.$store.dispatch('$_lms/updateSection', this.localSection)
        .then(response => {
          this.clearLocalState()
          this.$message({
            type: 'success',
            message: 'Section modifiée avec succès'
          })
          console.log('Got some data, now lets show something in this component')
        }, error => {
          console.error('Got nothing from server. Prompt user to check internet connection and try again')
          this.$notify.error({
            title: 'Error',
            message: 'Impossible de modifier cette section. Veuillez vérifier votre connexion internet',
            duration: 0
          })
        })
      },
      delSection (sectionId) {
        this.$confirm('Cela supprimera de manière permanente cette section et toutes les sessions et les quiz contenus. Voulez-vous continuer?', 'Warning', {
          confirmButtonText: 'Supprimer tout',
          cancelButtonText: 'Annuler',
          type: 'warning'
        }).then(() => {
            // alert(sectionId)
          this.$store.dispatch('$_lms/deleteSection', sectionId)
            .then(response => {
              this.$message({
                type: 'success',
                message: 'Section supprimée avec succès'
              })
              console.log('Got some data, now lets show something in this component')
            }, error => {
              console.error('Got nothing from server. Prompt user to check internet connection and try again')
              this.$notify.error({
                title: 'Error',
                message: 'Impossible de supprimer la section. Veuillez vérifier votre connexion internet',
                duration: 0
              })
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Suppression annulée'
          })
        })
      },
      // SessionOrQuiz Management
      addSession0rQuiz (sectionId, itemType) {
            // alert(itemType)
        this.$store.dispatch('$_lms/newSessionOrQuiz', {'sectionId': sectionId, 'type': itemType})
            // alert(this.$store.state.currentSessionOrQuiz.type)
        this.$router.push({ name: 'courseSetupSessionOrQuiz'})
      },
      selectSessionOrQuiz (sessionsOrQuizId) {
        this.$store.dispatch('$_lms/selectSessionOrQuiz', sessionsOrQuizId)
            // alert(this.$store.state.currentSessionOrQuiz.type)
        this.$router.push({ name: 'sessionOrQuizSetup'})
      },
      beforeVideoUpload (file) {
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
    },
    computed: {
      loadingCourse () {
        return this.$store.getters.loading
      },
        // Course Form
      title: {
        get () {
          return this.$store.getters['$_lms/currentCourse'].title
        },
        set (value) {
          this.$store.commit('$_lms/COURSE_SET_TITLE', value)
        }
      },
      subtitle: {
        get () {
          return this.$store.getters['$_lms/currentCourse'].subtitle
        },
        set (value) {
          this.$store.commit('$_lms/COURSE_SET_SUBTITLE', value)
        }
      },
      description: {
        get () {
          return this.$store.getters['$_lms/currentCourse'].description
        },
        set (value) {
          this.$store.commit('$_lms/COURSE_SET_DESCRIPTION', value)
        }
      },
      isFree: {
        get () {
          return this.$store.getters['$_lms/currentCourse'].is_free
        },
        set (value) {
          this.$store.commit('$_lms/COURSE_SET_ISFREE', value)
        }
      },
      price: {
        get () {
          return this.$store.getters['$_lms/currentCourse'].price
        },
        set (value) {
          this.$store.commit('$_lms/COURSE_SET_PRICE', value)
        }
      },
      discount: {
        get () {
          return this.$store.getters['$_lms/currentCourse'].discount
        },
        set (value) {
          this.$store.commit('$_lms/COURSE_SET_DISCOUNT', value)
        }
      },
      currency: {
        get () {
          return this.$store.getters['$_lms/currentCourse'].currency
        },
        set (value) {
          this.$store.commit('$_lms/COURSE_SET_CURRENCY', value)
        }
      },
      status: {
        get () {
          return this.$store.getters['$_lms/currentCourse'].status
        },
        set (value) {
          this.$store.commit('$_lms/COURSE_SET_STATUS', value)
        }
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
        // Pour le menu step vfor section -> sessionOrQuiz
        // sectionSet: () => this.$store.state.entities.sections,
        /*
        sectionSet() {
            return this.$store.getters.sectionSet
        },
        */
      sections () {
        return this.$store.getters['$_lms/currentCourse'].sections
      }
  
    }
}
</script>

<style slot-scope>
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
.el-breadcrumb {
    font-size: 1.5rem;
}
.el-card {
    -webkit-box-shadow: none;
    box-shadow: none;
    border: 1px solid #DCDFE6;
    border-radius: 0px;
}
h1 {
    font-size: 2rem;
    margin-top: 10px;
}
h4 {
    margin-top: 0px;
}
.image-uploader .el-upload, .video-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    width: 99.5%;
    overflow: hidden;
}
.el-upload {
    display: block;
    width: 100%;
}
.el-upload-dragger {
    width:100%;
    min-height: 280px;
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
    display: block;
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
.form-inline .input {
    width:95%;
}
.form-inline .input .el-form-item__content {
    width: 100%;
}
.el-select .el-input {
    width: 150px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
</style>
