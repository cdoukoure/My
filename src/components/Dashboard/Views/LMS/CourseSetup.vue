<template>
    <el-card>
        <el-row :gutter="40">
            <el-col :span="24">
                <h1>Edition de cours</h1>
            </el-col>
            <el-col :span="12">
                <el-form ref="courseForm">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item>
                                <!-- :on-preview="handlePreview" :on-remove="handleRemove" -->
                                <el-upload
                                    class="image-uploader"
                                    drag
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-success="courseImageSuccess"
                                    :before-upload="beforeImageUpload">
                                    <img v-if="image" :src="image" class="avatar"/>
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">Placez votre image ici ou <em>cliquer pour uploader</em></div>
                                    <div class="el-upload__tip" slot="tip">Fichier jpg/png de taille inférieure ou égale à 500kb</div>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
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
                            <el-form-item label="Titre">
                                <el-input v-model="title" autofocus placeholder="Saisissez le titre ici" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="Sous-titre">
                                <el-input v-model="subtitle" type="textarea" autosize placeholder="Saisissez un sous-titre ici" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="Description">
                                <el-input v-model="description" type="textarea" autosize placeholder="Saisissez une description ici" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item>
                                <label style="display:block;line-height: 40px;font-size: 14px;color: #606266;">Ce cours est gratuit ?</label>
                                <el-switch v-model="isFree" inactive-text="Non" active-text="Oui"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item label="Prix">
                                <el-input v-model="price" placeholder="Saisissez le prix. ex: 20.000" :disabled="isFree == 1" size="small"></el-input>
                            </el-form-item>
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
                        <el-col :span="24">
                            <hr/>
                        </el-col>
                        <el-col :span="24">
                            <el-button @click="deactivateCourse()"> Retour </el-button>
                            <el-button type="primary" @click="saveCourse()"> Enregistrer </el-button>
                        </el-col>
                        
                    </el-row>
                </el-form>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>PROGRAMME DU COURS</span>
                    </div>
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
                                    <el-button type="warning" plain icon="el-icon-upload2" size="mini" @click="addSection()">Ajouter une nouvelle section</el-button>
                                        </el-tooltip>
                                </el-form-item>
                            </el-form>
                    </div>
                    <el-collapse accordion @change="clearLocalState()">
                        <el-collapse-item v-for="(section, index) in sections" :key="section.id" :name="index" style="border:1px solid #ebeef5;padding:0px 10px;">
                            <template slot="title">
                                <i class="header-icon el-icon-plus"></i>
                                &nbsp; {{ section.title }}
                                <span style="float:right">{{ section.duration }}</span>
                            </template>
                            <div>
                                <el-form :inline="true" class="form-inline">
                                    <el-form-item class="input">
                                        <!-- <el-input v-model="actualSection" placeholder="Saississez ici le nouveau titre de la section et cliquer sur le bouton à droite." size="mini" style="display:block;" type="textarea" autosize></el-input>-->
                                        <el-input :value="section.title" style="display:block;" type="textarea" autosize @change="updateSection(section.id, index, $event)"></el-input>
                                    </el-form-item>
                                    <!-- <el-form-item>
                                        <el-tooltip class="item" effect="dark" content="Modifier le titre de la section" placement="top">
                                            <el-button type="warning" plain icon="el-icon-upload2" size="mini"></el-button>
                                        </el-tooltip>
                                    </el-form-item> -->
                                </el-form>
                            </div>
                            <div style="margin:0px 15px 10px 0px;">
                            
                                <el-button type="primary" icon="el-icon-plus" size="mini" plain @click="addSession0rQuiz(section.id, 'session')">Session</el-button>
                                
                                <el-button type="primary" icon="el-icon-plus" size="mini" plain @click="addSession0rQuiz(section.id, 'quiz')">Quiz</el-button>
                                
                                <el-tooltip class="item" effect="dark" content="Cliquez pour supprimer cette section et toutes les sessions et quiz qu'elle contient." placement="right">
                                    <el-button type="danger" icon="el-icon-delete" size="mini" plain style="float:right" @click="delSection(section.id)"></el-button>
                                </el-tooltip>
                                
                            </div>
                            <div v-if="section.session_or_quizs.length > 0">
                                <el-collapse accordion style="margin-left:10px;border:1px solid #ebeef5;padding:0px 10px;" @change="clearLocalState()">
                                    <el-collapse-item v-for="(sesQuiz, index) in $store.getters.sectionByIdSessionOrQuizSet(section.id)" :key="sesQuiz.id" :name="index">
                                        <template slot="title">
                                            <i class="header-icon el-icon-view"></i> &nbsp; {{ sesQuiz.title }}
                                            <span style="float:right">{{ sesQuiz.duration }}</span>
                                        </template>
                                        <div> {{ sesQuiz.description }}
                                            <el-button type="primary" icon="el-icon-edit" size="mini" circle style="float:right;" @click="selectSessionOrQuiz(sesQuiz.id)"></el-button>
                                        </div>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
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
  export default {
    /*
    props: {
        courseIndex: { type: Number, default: 0 }
    },
    */
    components: {
    },
    created () {
    },
    mounted () {
        // alert(JSON.stringify(this.sections))
    },
    data () {
      return {
        newSection: '',
        actualSection: ''
      }
    },
    methods: {
      // sectionSet: () => this.$store.state.entities.sections,
      lockedReturn () {
        this.$router.go(-1) // retour en arriere
      },
      clearLocalState () {
        this.newSection = ''
        this.actualSection = ''
      },
      // Course Management
      courseImageSuccess (res, file) { // Set sessionOrQuiz Content after submitting in saveSessionOrQuiz()
        this.$store.commit('COURSE_SET_IMAGE', URL.createObjectURL(file.raw))
      },
      courseBadgeSuccess (res, file) { // Set sessionOrQuiz Content after submitting in saveSessionOrQuiz()
        this.$store.commit('COURSE_SET_BADGE', URL.createObjectURL(file.raw))
      },
      deactivateCourse () {
        this.$router.push({ name: 'courses' })
        this.$store.dispatch('deselectCourse')
      },
      saveCourse () {
        this.$store.dispatch('saveCourse').then(response => {
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
        this.$store.dispatch('deleteCourse').then(response => {
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
      },
      // Section Management
      addSection () {
        alert(this.newSection)
        this.$store.dispatch('addSection', this.newSection)
      },
      updateSection (sectionId, sectionIndex, value) {
        // alert(sectionIndex)
        this.$store.dispatch('updateSection', {'sectionId': sectionId, 'sectionIndex': sectionIndex, 'title': value})
      },
      delSection (sectionId) {
        this.$store.dispatch('deleteSection', sectionId)
      },
      // SessionOrQuiz Management
      addSession0rQuiz (sectionId, itemType) {
            // alert(itemType)
        this.$store.dispatch('newSessionOrQuiz', {'sectionId': sectionId, 'type': itemType})
            // alert(this.$store.state.currentSessionOrQuiz.type)
        this.$router.push({ name: 'courseSetupSessionOrQuiz'})
      },
      selectSessionOrQuiz (sessionsOrQuizId) {
        this.$store.dispatch('selectSessionOrQuiz', sessionsOrQuizId)
            // alert(this.$store.state.currentSessionOrQuiz.type)
        this.$router.push({ name: 'courseSetupSessionOrQuiz'})
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
          return this.$store.getters.currentCourse.title
        },
        set (value) {
          this.$store.commit('COURSE_SET_TITLE', value)
        }
      },
      subtitle: {
        get () {
          return this.$store.getters.currentCourse.subtitle
        },
        set (value) {
          this.$store.commit('COURSE_SET_SUBTITLE', value)
        }
      },
      description: {
        get () {
          return this.$store.getters.currentCourse.description
        },
        set (value) {
          this.$store.commit('COURSE_SET_DESCRIPTION', value)
        }
      },
      isFree: {
        get () {
          return this.$store.getters.currentCourse.is_free
        },
        set (value) {
          this.$store.commit('COURSE_SET_ISFREE', value)
        }
      },
      price: {
        get () {
          return this.$store.getters.currentCourse.price
        },
        set (value) {
          this.$store.commit('COURSE_SET_PRICE', value)
        }
      },
      status: {
        get () {
          return this.$store.getters.currentCourse.status
        },
        set (value) {
          this.$store.commit('COURSE_SET_STATUS', value)
        }
      },
      image () {
        return this.$store.getters.currentCourse.image
      },
      badge () {
        return this.$store.getters.currentCourse.badge
      },
        // Pour le menu step vfor section -> sessionOrQuiz
        // sectionSet: () => this.$store.state.entities.sections,
        /*
        sectionSet() {
            return this.$store.getters.sectionSet
        },
        */
      sections () {
        return this.$store.getters.currentCourse.sections
      }
  
    }
}
</script>

<style slot-scope>
h1 {
    font-size: 2rem;
    margin-top: 10px;
}
h4 {
    margin-top: 0px;
}
  .image-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
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
.form-inline .input {
    width:95%;
}
.form-inline .input .el-form-item__content {
    width: 100%;
}
</style>
