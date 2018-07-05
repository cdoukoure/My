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
                <el-row style="margin-bottom:20px;">
                    <el-col :span="2" :offset="22" style="text-align:right;">
                        <el-tooltip class="item" effect="light" content="Back to course list" placement="top">
                            <el-button type="danger" icon="el-icon-circle-close" :round="true" size="mini" @click="back()"></el-button>
                        </el-tooltip>
                        <!-- <el-tooltip class="item" effect="light" content="Edit course" placement="bottom">
                         <el-button style="margin-top:10px;" type="warning" icon="el-icon-edit" :round="true" size="mini" @click="edit()"></el-button>
                         </el-tooltip> -->
                    </el-col>
                </el-row>
                
                
                
                <el-tabs type="card" v-model="activeMainTab" class="main-tabs">
                    
                    <el-tab-pane label="Configuration" name="config">
                        
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <section id="course-header">
                                    <el-row>
                                        <el-col :span="24">
                                            <el-form-item>
                                                <label style="font-size:14px; font-weight:500;">Titre</label>
                                                <el-input v-model="title" type="textarea" :autosize="{ minRows: 1, maxRows: 2}" autofocus placeholder="Saisissez le titre ici"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-card>
                                        <el-row :gutter="10">
                                            <el-col :span="16">
                                                <el-tabs class="media-tab" type="border-card" v-model="activeMediaTab" @tab-click="mediaTabClick">
                                                    <el-tab-pane label="Video de présentation" name="video" class="video-tab">
                                                        <div style="height:450px;">
                                                            <span v-show="!video">
                                                                Veuillez selection une video dans la galerie
                                                            </span>
                                                            <h3 v-show="!video" class="h3">
                                                                <i class="el-icon-more-outline"></i>
                                                                Veuillez selection une video dans la galerie
                                                            </h3>
                                                            <video v-show="video" :poster="video.imagePreview" controls>
                                                                <source :src="video.url" :type="video.type">
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        </div>
                                                    </el-tab-pane>
                                                    <el-tab-pane label="Image de préseantion" name="image">
                                                        <h3 v-if="!image" class="h3">
                                                            <i class="el-icon-more-outline"></i>
                                                            Veuillez selection une image dans la galerie
                                                        </h3>
                                                        <img v-else :src="image" alt=""/>
                                                    </el-tab-pane>
                                                    <el-tab-pane label="Badge" name="badge">
                                                        <h3 v-if="!image" class="h3">
                                                            <i class="el-icon-more-outline"></i>
                                                            Veuillez selection une image dans la galerie
                                                        </h3>
                                                        <img v-else :src="image" alt=""/>
                                                    </el-tab-pane>
                                                </el-tabs>
                                            </el-col>
                                            <el-col :span="8">
                                                <media-widget v-on:mediaClicked="changeMediaContent" :imageFormat="activeMediaTab !== 'video'"></media-widget>
                                                <!-- <el-row :gutter="20">
                                                 <el-col :span="14">
                                                 <h3>Prix</h3>
                                                 <el-form-item>
                                                 <el-input v-model="price" placeholder="Saisissez le prix. ex: 20000" :disabled="isFree == 1" size="small">
                                                 <el-select v-model="currency" slot="append" placeholder="Select">
                                                 <el-option label="Dollars ($)" value="$"></el-option>
                                                 <el-option label="Livre (£)" value="£"></el-option>
                                                 <el-option label="Euro (€)" value="€"></el-option>
                                                 <el-option label="XOF" value="XOF"></el-option>
                                                 </el-select>
                                                 </el-input>
                                                 </el-form-item>
                                                 <el-form-item>
                                                 <el-input v-model="discount" placeholder="ex: 20" :disabled="isFree == 1" size="small">
                                                 <template slot="append"> % de réduction</template>
                                                 </el-input>
                                                 </el-form-item>
                                                 </el-col>
                                                 <el-col :span="10" style="text-align:center;">
                                                 <h3>&nbsp;</h3>
                                                 <span style="font-size:3.5rem;padding:10px;"> {{ price - (price * discount / 100) }} </span> <span> {{ currency }} </span>
                                                 </el-col>
                                                 <el-col :span="24">
                                                 <h3>Ce cours est gratuit-il ?</h3>
                                                 <el-form-item>
                                                 <el-switch v-model="isFree" inactive-text="Non" active-text="Oui"></el-switch>
                                                 </el-form-item>
                                                 </el-col>
                                                 <el-col :span="24">
                                                 <h3>Extra</h3>
                                                 <el-form-item>
                                                 <el-checkbox-group v-model="checkboxGroup6" size="small">
                                                 <el-checkbox label="Option1" border></el-checkbox>
                                                 <el-checkbox label="Option2" border></el-checkbox>
                                                 <el-checkbox label="Option3" border></el-checkbox>
                                                 <el-checkbox label="Option4" border></el-checkbox>
                                                 <el-checkbox label="Option5" border></el-checkbox>
                                                 </el-checkbox-group>
                                                 </el-form-item>
                                                 </el-col>
                                                 </el-row> -->
                                            </el-col>
                                        </el-row>
                                    </el-card>
                                    
                                </section>
                            </el-col>
                            <el-col :span="20" :offset="2">
                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item>
                                            <h3>Sous-titre</h3>
                                            <el-input v-model="subtitle" type="textarea" autosize placeholder="Saisissez un sous-titre ici" size="small"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <h3>Description</h3>
                                            <vue-editor id="editor"
                                                useCustomImageHandler
                                                v-model="description">
                                            </vue-editor>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <h3>Que vais-je apprendre ?</h3>
                                        <el-row :gutter="20">
                                            
                                            <el-form :inline="true" class="form-inline">
                                                <el-col :span="20">
                                                    <el-form-item class="input">
                                                        <el-input v-model="newSkillOrReq" placeholder="Saississez ici le nouveau titre de la section et cliquer sur le bouton à droite." size="mini" type="textarea" autosize></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="4">
                                                    <el-form-item>
                                                        <el-tooltip class="item" effect="dark" content="Ajouter une nouvelle section" placement="bottom">
                                                            <el-button type="warning" plain icon="el-icon-upload2" size="mini" @click="addSkillOrReq('Skill')">Ajouter
                                                            </el-button>
                                                        </el-tooltip>
                                                    </el-form-item>
                                                </el-col>
                                            </el-form>
                                        </el-row>
                                        <el-table
                                            ref="skillTables"
                                            :data="skills"
                                            @expand-change="handleExpandChange"
                                            style="width: 100%">
                                            <el-table-column
                                                label="Description"
                                                align="left"
                                                prop="description">
                                            </el-table-column>
                                            <el-table-column type="expand">
                                                <template slot-scope="props">
                                                    <el-form>
                                                        <el-form-item prop="props.row">
                                                            <el-row :gutter="20">
                                                                <el-col :span="20" :offset="1">
                                                                    <el-form-item label="Description" >
                                                                        <el-input :value="props.row.description" @change="localUpdate(props.row.id, props.$index, $event)" autosize></el-input>
                                                                    </el-form-item>
                                                                </el-col>
                                                                <el-col :span="2">
                                                                    <el-form-item>
                                                                        <el-button style="margin-top:30px;" type="warning" icon="el-icon-edit" round plain size="mini" @click="updateSkillOrReq('Skill')"></el-button>
                                                                        <el-button style="margin-left:0px;" type="danger" icon="el-icon-delete" round plain size="mini" @click="delSkillOrReq('Skill', props.$index)"></el-button>
                                                                    </el-form-item>
                                                                </el-col>
                                                            </el-row>
                                                        </el-form-item>
                                                    </el-form>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </el-col>
                                    <el-col :span="24">
                                        <h3>Pré-requis</h3>
                                        <el-row :gutter="20">
                                            
                                            <el-form :inline="true" class="form-inline">
                                                <el-col :span="20">
                                                    <el-form-item class="input">
                                                        <el-input v-model="newSkillOrReq" placeholder="Saississez ici les pré-requis" size="mini" type="textarea" autosize></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :span="4">
                                                    <el-form-item>
                                                        <el-tooltip class="item" effect="dark" content="Ajouter une nouvelle section" placement="bottom">
                                                            <el-button type="warning" plain icon="el-icon-upload2" size="mini" @click="addSkillOrReq('Requirement')">Ajouter
                                                            </el-button>
                                                        </el-tooltip>
                                                    </el-form-item>
                                                </el-col>
                                            </el-form>
                                        </el-row>
                                        <el-table
                                            ref="skillTables"
                                            :data="skills"
                                            @expand-change="handleExpandChange"
                                            style="width: 100%">
                                            <el-table-column
                                                label="Description"
                                                align="left"
                                                prop="description">
                                            </el-table-column>
                                            <el-table-column type="expand">
                                                <template slot-scope="props">
                                                    <el-form>
                                                        <el-form-item prop="props.row">
                                                            <el-row :gutter="20">
                                                                <el-col :span="20" :offset="1">
                                                                    <el-form-item label="Description" >
                                                                        <el-input :value="props.row.description" @change="localUpdate(props.row.id, props.$index, $event)" autosize></el-input>
                                                                    </el-form-item>
                                                                </el-col>
                                                                <el-col :span="2">
                                                                    <el-form-item>
                                                                        <el-button style="margin-top:30px;" type="warning" icon="el-icon-edit" round plain size="mini" @click="updateSkillOrReq('Requirement')"></el-button>
                                                                        <el-button style="margin-left:0px;" type="danger" icon="el-icon-delete" round plain size="mini" @click="delSkillOrReq('Requirement', props.$index)"></el-button>
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
                            
                            <!--<el-col :span="24">--
                             <section id="course-description">
                             <h3>Description</h3>
                             <p v-html="description"></p>
                             </section>
                             </el-col>-->
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
                                    <h3>Ajouter section</h3>
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
                                <h3>Les sections de ce cours</h3>
                                <el-collapse accordion @change="clearLocalState()">
                                    <el-collapse-item v-for="(section, index) in sections" :key="section.id" :name="index" style="border:1px solid #ebeef5;padding:0px 10px;">
                                        <template slot="title">
                                            <i class="header-icon el-icon-plus"></i>
                                            &nbsp; {{ section.title }}
                                            <span style="float:right;margin-right: 20px;">{{ section.duration }}</span>
                                        </template>
                                        <div style="width: 90%; margin: 10px auto;">
                                            <el-form :inline="true" class="form-inline">
                                                <el-row :gutter="10">
                                                    <el-col :span="21">
                                                        <el-form-item class="input">
                                                            <!-- <el-input v-model="actualSection" placeholder="Saississez ici le nouveau titre de la section et cliquer sur le bouton à droite." size="mini" style="display:block;" type="textarea" autosize></el-input>-->
                                                            <el-input :value="section.title" style="display:block;" type="textarea" autosize @change="localSectionUpdate(section.id, index, $event)">
                                                            </el-input>
                                                        </el-form-item>
                                                        <el-form-item>
                                                            <el-button type="primary" icon="el-icon-plus" size="mini" plain @click="addSession0rQuiz(section.id, 'session')">Session</el-button>
                                                            <el-button type="primary" icon="el-icon-plus" size="mini" plain @click="addSession0rQuiz(section.id, 'quiz')">Quiz</el-button>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="3">
                                                        <el-form-item>
                                                            <el-tooltip class="item" effect="dark" content="Modifier le titre de la section" placement="top">
                                                                <el-button type="warning" :round="true" plain icon="el-icon-upload2" size="mini" @click="updateSection()">Modifier</el-button>
                                                            </el-tooltip>
                                                        </el-form-item>
                                                        <el-form-item>
                                                            <el-tooltip class="item" effect="dark" content="Cliquez pour supprimer cette section et toutes les sessions et quiz qu'elle contient." placement="right">
                                                                <el-button type="danger" icon="el-icon-delete" :round="true" size="mini" plain  @click="delSection(section.id)">Supprimer</el-button>
                                                            </el-tooltip>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </el-form>
                                        </div>
                                        
                                        <div v-if="section.session_or_quizs.length > 0" style="width: 90%; margin: 10px auto;">
                                            
                                            
                                            <h3>Les sessions et Quiz de cette section</h3>
                                            <el-table
                                                :data="$store.getters['$_lms/sectionByIdSessionOrQuizSet'](section.id)"
                                                :show-header="false"
                                                style="width: 100%; border-top: 1px solid rgba(0,0,0,.1);">
                                                <el-table-column
                                                    label="Title"
                                                    width="600px">
                                                    <template slot-scope="scope">
                                                        <span style="margin-left: 10px">{{ scope.row.title }}</span>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column
                                                    label="Duration"
                                                    width="200px">
                                                    <template slot-scope="scope">
                                                        <i class="el-icon-time"></i>
                                                        <span style="margin-left: 10px">{{ Math.floor(scope.row.duration/60) }} min {{ Math.ceil(scope.row.duration % 60) }} sec</span>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column
                                                    label="Operations">
                                                    <template slot-scope="scope">
                                                        <el-button
                                                            size="mini"
                                                            round
                                                            icon="el-icon-edit"
                                                            @click="selectSessionOrQuiz(scope.row.id)">Edit</el-button>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                            
                                            
                                            
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
  import { VueEditor } from 'vue2-editor'
  import CourseFileManagement from './CourseSetup/CourseFileManagement.vue'
  import MediaWidget from './CourseSetupSessionOrQuiz/VideoCard.vue'
  
  export default {
    /*
    props: {
        courseIndex: { type: Number, default: 0 }
    },
    */
    components: {
      CourseFileManagement,
      MediaWidget,
      VueEditor
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
        localSection: {'sectionId': null, 'sectionIndex': null, 'title': null},
        newSkillOrReq: '',
        actualSkillOrReq: '',
        localSkillOrReq: {'Id': null, 'Index': null, 'description': null},
        activeMediaTab: 'video',
      }
    },
    methods: {
      // sectionSet: () => this.$store.state.$_lms.entities.sections,
      lockedReturn () {
        this.$router.go(-1) // retour en arriere
      },
      // UI
      mediaTabClick(tab, event) {
        console.log(tab, event);
      },
      //
      handleExpandChange (row, expandedRows) {
          if (expandedRows && expandedRows.length > 1) {
                    // alert(expandedRows.length)
                    // expandedRowser = expandedRows
    
            var expandedRowser = expandedRows.splice(0, 1)
    
          }
          this.clearLocalState()
                // this.$refs.columnTable.toggleRowExpansion(row);
      },
      clearLocalState () {
        this.newSection = ''
        this.actualSection = ''
        this.localSection = {'sectionId': null, 'sectionIndex': null, 'title': null}
        this.newSkillOrReq = ''
        this.actualSkillOrReq = ''
        this.localSkillOrReq = {'Id': null, 'Index': null, 'description': null}
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
      addSkillOrReq (objType) {
        // alert(objType)
        this.$store.dispatch('$_lms/add' + objType, this.newSkillOrReq)
        .then(response => {
          this.$message({
            type: 'success',
            message: 'Création réussie'
          })
          this.clearLocalState()
          console.log('Got some data, now lets show something in this component')
        }, error => {
          console.error('Got nothing from server. Prompt user to check internet connection and try again')
          this.$notify.error({
            title: 'Error',
            message: 'Ajout impossible. Veuillez vérifier votre connexion internet'
          })
        })
      },
      localUpdate (Id, Index, value) {
        // alert(value)
        this.localSkillOrReq = {'id': Id, 'index': Index, 'description': value}
        // newSkillOrReq: '',
        // actualSkillOrReq: '',
        // localSkillOrReq: {'Id': null, 'Index': null, 'description': null},
      },
      updateSkillOrReq (objType) {
        // alert(value)
        this.$store.dispatch('$_lms/update' + objType, this.localSkillOrReq)
        .then(response => {
          this.clearLocalState()
          this.$message({
            type: 'success',
            message: 'Modification réussie'
          })
          this.clearLocalState()
          console.log('Got some data, now lets show something in this component')
        }, error => {
          console.error('Got nothing from server. Prompt user to check internet connection and try again')
          this.$notify.error({
            title: 'Error',
            message: 'La modification à échoué. Veuillez vérifier votre connexion internet'
          })
        })
      },
      delSkillOrReq (objType, index) {
        // alert(index)
        this.$confirm('Cela supprimera de manière permanente. Voulez-vous continuer?', 'Warning', {
          confirmButtonText: 'Supprimer',
          cancelButtonText: 'Annuler',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('$_lms/delete' + objType, index)
            .then(response => {
              this.$message({
                type: 'success',
                message: 'Suppression réussie'
              })
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Suppression impossible. Veuillez vérifier votre connexion internet'
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
      updateSection () {
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
      },
      changeMediaContent (payload) {
        // alert(JSON.stringify(payload) + " " + this.activeMediaTab)
        if (this.activeMediaTab === 'video') {
            this.$store.commit('$_lms/COURSE_SET_VIDEO', payload)
            var myVideo = document.getElementsByTagName('video')[0]
            myVideo.load()
            myVideo.play()
        }
      },
      back() {
        this.$router.push({ name: 'courses'})
      }
    },
    computed: {
      loadingCourse () {
        return this.$store.getters.loading
      },
      // UI
      activeMainTab: {
        get () {
          return this.$store.getters.courseSetupMainTab !== '' ? this.$store.getters.courseSetupMainTab : 'config'
        },
        set (value) {
          this.$store.commit('UI_COURSE_SETUP_MAINTAB', value)
        }
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
      },
      skills () {
        return this.$store.getters['$_lms/currentCourse'].skills
      },
      requirements () {
        return this.$store.getters['$_lms/currentCourse'].requirements
      }
  
    }
}
</script>

<style lang="scss" scoped>
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
.main-tabs {
    
    .el-tab-pane {
        min-height: 20rem;
    }

    /deep/ .el-tabs__content {
        background-color: #ffffff;
        padding: 1rem 2rem;
        border: 1px solid #e4e7ed;
        border-top: 0;
        margin-top: -15px;
        
        /deep/ .media-tab {
        
            /deep/ .el-tabs__content {
                padding-bottom:0!important;
                background-color: #EBEEF5!important;
            }
            
            /deep/ .el-tabs__nav {
                background-color: #ffffff!important;
        
                .el-tabs__item {
            
                }
            }
        }
    }
    
    /deep/ .el-tabs__nav {
        background-color: #ffffff!important;
        
        .el-tabs__item {
            
            border-bottom: 1px solid #e4e7ed;
                
            &.is-active {
                border-bottom: 0;
            }
            
        }
    }

}
.media-tab {
    
    /deep/ .el-tabs__header {
        background-color: #ffffff;
    }
        
    /deep/ .el-tabs__content {
        padding:0;
        /*background-color: #F2F6FC!important;*/
        margin-top: 0px;
        /*border: 1px solid #EBEEF5;*/
        border-top: 0;
    }
            
    /deep/ .el-tabs__nav {
        background-color: #ffffff!important;
        
        .el-tabs__item {
            
        }
    }
    
    /deep/ .h3 {
        top: 50%;
        transform: translateY(50%);
        color:#C0C4CC;
        text-align:center;
        
        i {
            font-size:70px;
            font-weight:thin;
            display:block;
            margin-bottom:20px;
        }
    }

}

video {
/*object-fit: contain;*/
/*       object-fit: fill; */
    object-fit: cover;
    width:100%;
    height:450px;
}
.el-card {
    -webkit-box-shadow: none;
    box-shadow: none;
    /* border: 1px solid #DCDFE6;*/
    border-radius: 0px;
    border: none;
    /* background-color: #EBEEF5;*/
    
    margin: 20px 0;
    /* padding: 5px 20px 10px 5px; */
    
    .el-card__body {
        min-height: 240px;
        padding: 15px 15px 10px 15px;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        border: none;
    }
}
.el-checkbox {
    background-color: #ffffff!important;
}
#course-title {
    font-size: 2rem;
    /* margin-top: 10px; */
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
    
    &.input {
                
        width: 100%;
                    
        /deep/ .el-form-item__content {
            width: 100%;
        }
    }
}
.image {
    overflow: hidden;
    height: 120px;
    position: relative;
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
hr {
    margin:3rem 2.5rem;
    border: 0;
    border-top-width: 0px;
    border-top-style: none;
    border-top-color: currentcolor;
    border-top: 1px solid rgba(0,0,0,.1);
    box-sizing: content-box;
    height: 0;
    overflow: visible;
}

.el-input__inner {
    min-width:70px;
}
.el-select .el-input, el-input-group__append {
    width: 120px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
</style>
