<!--
 <template>
 <div class="wrapper">
 <side-bar type="sidebar" :sidebar-links="$sidebar.sidebarLinks">
 
 </side-bar>
 <notifications>
 
 </notifications>
 <div class="main-panel">
 <top-navbar></top-navbar>
 
 <dashboard-content @click.native="toggleSidebar">
 
 </dashboard-content>
 
 <content-footer></content-footer>
 </div>
 </div>
 </template>
 -->
<template>
    <div class="wrapper">
        <el-container>
            <el-aside :width="asideWidth">
                <div class="logo-slot"><i class="el-icon-message"></i>MySCHOOL</div>
                <el-menu active-text-color="#f96332" :collapse="isCollapse">
                    <el-menu-item index="1">
                        <i class="el-icon-setting"></i>
                        <span>Tableau de bord</span>
                    </el-menu-item>
                    <el-menu-item index="1">
                        <i class="el-icon-setting"></i>
                        <span>Mes informations</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-message"></i>Etudes</template>
                        <el-submenu index="2-1">
                            <template slot="title">Programmes</template>
                            <el-menu-item index="2-1"><i class="el-icon-message"></i>Admissions</el-menu-item>
                            <el-menu-item index="2-1"><i class="el-icon-message"></i>Matières et Cours</el-menu-item>
                            <el-menu-item index="2-1"><i class="el-icon-message"></i>Emploi du temps</el-menu-item>
                            <el-menu-item index="2-1"><i class="el-icon-message"></i>Documents</el-menu-item>
                            <el-menu-item index="2-1"><i class="el-icon-message"></i>Evaluations</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2-2">
                            <template slot="title">Examens</template>
                            <el-menu-item index="2-16">Session d'examens</el-menu-item>
                            <el-menu-item index="2-17">Resultats</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2-3">
                            <template slot="title">Extras</template>
                            <!-- For student -->
                            <el-menu-item index="2-1"><i class="el-icon-message"></i>Renforcement en ligne</el-menu-item>
                            <el-menu-item index="2-1"><i class="el-icon-message"></i>Mes profs</el-menu-item>
                            <!-- End For student -->
                            <el-menu-item index="2-1"><i class="el-icon-message"></i>Mes videos</el-menu-item> <!-- For profs -->
                            <el-menu-item index="2-1"><i class="el-icon-message"></i>Mes étudiants/élèves</el-menu-item> <!-- For profs -->
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span>Activités</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span>Scolarité et facturation</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <i class="el-icon-setting"></i>
                        <span>Service et abonnement</span>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <i class="el-icon-setting"></i>
                        <span>Parténariat</span>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <i class="el-icon-setting"></i>
                        <span>Comptabilité et Finances</span>
                    </el-menu-item>
                    <el-submenu index="7">
                        <template slot="title"><i class="el-icon-message"></i>Configuration</template>
                        <el-menu-item index="7-1">
                            <i class="el-icon-setting"></i>
                            <span>Périodes académiques</span>
                        </el-menu-item>
                        <el-submenu index="7-2">
                            <template slot="title">Facultés et départements</template>
                            <el-menu-item index="2-1"><i class="el-icon-message"></i>Unités d'organisations</el-menu-item>
                            <el-menu-item index="2-1"><i class="el-icon-message"></i>Titre et rôles du personnel</el-menu-item>
                            <el-menu-item index="2-1"><i class="el-icon-message"></i>Type de personnels</el-menu-item>
                        </el-submenu>
                        <el-submenu index="7-2">
                            <template slot="title">Pédagogies</template>
                            <el-menu-item index="2-1"><i class="el-icon-message"></i>Programmes</el-menu-item>
                            <el-menu-item index="2-1"><i class="el-icon-message"></i>Discipline, matières et cours</el-menu-item>
                            <el-menu-item index="2-1"><i class="el-icon-message"></i>Cycles et Niveau</el-menu-item>
                            <el-menu-item index="2-1"><i class="el-icon-message"></i>Documents officiels</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="7-3">
                            <i class="el-icon-setting"></i>
                            <span>Droits de scolarité</span>
                        </el-menu-item>
                        <el-menu-item index="7-4">
                            <i class="el-icon-setting"></i>
                            <span>Amphithéatres et Salles de classe</span>
                        </el-menu-item>
                        <el-submenu index="7-5">
                            <template slot="title">Transports</template>
                            <el-menu-item index="7-2"><i class="el-icon-message"></i>Véhicules</el-menu-item>
                            <el-menu-item index="7-3"><i class="el-icon-message"></i>Itinéraires</el-menu-item>
                            <el-menu-item index="7-4"><i class="el-icon-message"></i>Inscription</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container class="main-panel" :style="mainPanelPaddginLeft">
                <el-header>
                    <el-row :gutter="20" style="margin-bottom: 20px;margin-top:-80px;">
                        <el-col :span="2" style="padding: 20px;">
                            <el-checkbox-group v-model="isCollapse" size="small">
                                <el-checkbox-button ><i class="el-icon-message"></i></el-checkbox-button>
                            </el-checkbox-group>
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
                            <el-menu :default-active="activeIndex" class="el-menu-header" mode="horizontal">
                                <el-submenu index="1">
                                    <template slot="title">Workspace</template>
                                    <el-menu-item index="2-1">item one</el-menu-item>
                                    <el-menu-item index="2-2">item two</el-menu-item>
                                    <el-menu-item index="2-3">item three</el-menu-item>
                                </el-submenu>
                            </el-menu>
                        </el-col>
                    </el-row>
                    
                </el-header>
                <div class="content" style="">
                    <el-main>
                        <dashboard-content @click.native="toggleSidebar">
                        </dashboard-content>
                    </el-main>
                </div>
                <el-footer></el-footer>
            </el-container>
        </el-container>
    </div>
    
</template>

<style>
.wrapper {
    height: 100%;
}
.el-container {
    height: 100vh;
}
.el-aside {
    /* 
    background-color: #F2F6FC;
    border-right: 1px solid #EBEEF5;
    font-size: 11px;
    */
    background-color: #F96332;
    webkit-box-shadow: 0px 2px 22px 0 rgba(0, 0, 0, 0.2), 0px 2px 30px 0 rgba(0, 0, 0, 0.35);
    box-shadow: 0px 2px 22px 0 rgba(0, 0, 0, 0.2), 0px 2px 30px 0 rgba(0, 0, 0, 0.35);
    position: fixed;
    top: 0;
    height: 100%;
    bottom: 0;
    width: auto;
    display: inline-block;
    left: 0;
    z-index: 1030;
    -webkit-transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
    transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
}
el-aside < .el-menu.el-menu--collapse, el-aside .el-menu.el-menu--collapse:parent {
    max-width: 64px;
    border:1px solid #fff;
}
.el-header {
    padding-top: 80px;
    padding-bottom: 45px;
    background: #141E30;
    background: -webkit-gradient(linear, left top, right top, from(#0c2646), color-stop(60%, #204065), to(#2a5788));
    background: linear-gradient(to right, #0c2646 0%, #204065 60%, #2a5788 100%);
    position: relative;
    overflow: hidden;

}
.el-main {
    padding: 0 30px 30px;
    min-height: calc(100vh - 123px);
    position: relative;
    float: right;
    width: 100%;
    /* width: calc(100% - 260px); */
    -webkit-transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
    transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
}
.el-container.main-panel {
    position: relative;
    float: right;
    width: calc(100% - 260px);
    -webkit-transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
    transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
}
.main-panel > .content {

    padding: 0 5px 5px;
    min-height: calc(100vh - 123px);
    margin-top: -30px;
    background-color: transparent;

}
.el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
}
.el-menu {
    border-right: 0;
    color: #FFFFFF;
    background-color: transparent;
}
.el-menu-header {
    float: right;
    border-bottom: none;
}
.el-submenu {
    background-color: rgba(255, 255, 255, 0.1);
    margin-top:8px;
}
.el-submenu__title {
    color: #FFFFFF;
color: #FFFFFF;
display: block;
text-decoration: none;
position: relative;
text-transform: uppercase;
cursor: pointer;
font-size: 0.7142em;
-webkit-transition: all 300ms ease 0s;
transition: all 300ms ease 0s;
}
.logo-slot {
    text-align: center;
    color: #FFFFFF;
    font-weight:700;
    position: relative;
padding: 20px;
}
.logo-slot::after {
content: '';
position: absolute;
bottom: 0;
right: 15px;
height: 1px;
width: calc(100% - 30px);
background-color: rgba(255, 255, 255, 0.5);
}
.el-menu .el-menu-item, .el-menu .el-menu-item i, .el-submenu__title i, .el-menu .el-menu-item:not(:focus), .el-menu .el-menu-item:not(:focus) i, .el-submenu__title:not(:focus) i {
    color: #ffffff!important;
}
.el-menu .el-menu-item:focus, .el-menu .el-menu-item:focus i, .el-submenu__title:focus i {
    color: #f96332!important;
-webkit-transition: all 300ms ease 0s;
transition: all 300ms ease 0s;
}
.el-menu-item-group__title {
    color: #FFFFFF;
    padding-left: 27px!important;
    text-transform: uppercase;
    margin-top: 29px;
    font-size: 10px;
    background-color: rgba(255, 255, 255, 0.1);
}
.el-menu .el-menu-item, .el-menu-item-group .el-menu-item {
margin: 10px 15px 0;
border-radius: 30px;
color: #FFFFFF;
display: block;
text-decoration: none;
position: relative;
text-transform: uppercase;
cursor: pointer;
font-size: 0.7142em;
padding: 10px 8px!important;
line-height: 1.625rem;
-webkit-transition: all 300ms ease 0s;
transition: all 300ms ease 0s;
}
.el-menu > .el-menu-item{
line-height: 1.925rem;
}
.el-menu .el-menu-item:hover, .el-submenu__title:hover, .el-menu-item-group .el-menu-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
.el-menu-item .el-submenu__title {
    height: 35px;
    line-height: 35px;
    padding-top: 10px
}
.el-submenu__title {
    height: 36px;
    line-height: 36px;
}
.el-form-item__content {
    line-height: 20px;
}
.el-form-item__icon {
font-size: 20px;
float: left;
margin-right: 12px;
line-height: 30px;
width: 34px;
text-align: center;
color: rgba(255, 255, 255, 0.5);
position: relative;

display: inline-block;
font: normal normal normal 14px/1 'Nucleo Outline';
}


/*** TYPOGRAPHY ***/
h1, .h1 {
  font-size: 3.5em;
  line-height: 1.15;
  margin-bottom: 30px; }
  h1 small, .h1 small {
    font-weight: 700;
    text-transform: uppercase;
    opacity: .8; }

h2, .h2 {
  font-size: 2.5em;
  margin-bottom: 30px; }

h3, .h3 {
  font-size: 2em;
  margin-bottom: 30px;
  line-height: 1.4em; }

h4, .h4 {
  font-size: 1.714em;
  line-height: 1.45em;
  margin-top: 30px;
  margin-bottom: 15px; }
  h4 + .category,
  h4.title + .category, .h4 + .category,
  .h4.title + .category {
    margin-top: -10px; }

h5, .h5 {
  font-size: 1.57em;
  line-height: 1.4em;
  margin-bottom: 15px; }

h6, .h6 {
  font-size: 1em;
  font-weight: 700;
  text-transform: uppercase; }

p.description {
  font-size: 1.14em; }

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent
    },
    data () {
      return {
        isCollapse: false,
        asideWidth: '300px',
        mainPanelPaddginLeft: 'padding-left:300px'
      }
    },
    watch: {
    	 isCollapse: function (val) {
      	 if (!val) {
         this.asideWidth = '300px'
         this.mainPanelPaddginLeft = 'padding-left:300px'
       } else {
         this.asideWidth = '64px'
         this.mainPanelPaddginLeft = 'padding-left:64px'
       }
    	 }
  	 }
  }
</script>
