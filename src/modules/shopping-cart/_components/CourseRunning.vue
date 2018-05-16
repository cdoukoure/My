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

import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            products: 'cartProducts'
        }),
        total () {
            return this.products.reduce((total, p) => {
                return total + p.price * p.quantity
            }, 0)
        }
    },
    methods: {
        checkout(){
            alert('Pay us $' + this.total)
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
