<template>
    <div class="wrapper">
        <el-container>
            <el-header>
                <el-row style="width:100%">
                    <el-col :span="6">
                        <i class="el-icon-menu"></i>
                        My SMART SCHOOL
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="Please input" size="small">
                            <i
                                class="el-icon-search el-input__icon"
                                slot="suffix">
                            </i>
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        &nbsp;
                    </el-col>
                    <el-col :span="6" class="header-button-container">
                        <el-button type="text">
                            <i class="el-icon-menu"></i>
                        </el-button>
                        <el-button type="text">
                            <i class="el-icon-question"></i>
                        </el-button>
                        <el-button type="text">
                            <i class="el-icon-setting"></i>
                        </el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside :width="$store.state.ui.asideWidth">
                    <el-row>
                    <el-col :span="$store.state.ui.menuVerticalButton" class="menu-v-button">
                        <el-button class="menu-button" @click="isCollapse = !isCollapse">
                            <i class="el-icon-menu"></i>
                        </el-button>
                    </el-col>
                    <el-col :span="20" class="menu-v" v-if="!isCollapse">
                        <div class="menu-v-header"></div>
                        <el-menu default-active="2" :router="true">
                            <el-submenu index="1">
                                <template slot="title">
                                  <i class="el-icon-location"></i>
                                  <span slot="title">Academic</span>
                                </template>
                                <el-menu-item-group>
                                  <span slot="title">Academic</span>
                                  <el-menu-item index="/student">Students</el-menu-item>
                                  <el-menu-item index="/student/me">About me</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group title="Administration">
                                  <el-menu-item index="/admin/overview">Admin</el-menu-item>
                                </el-menu-item-group>
                                <el-submenu index="1-4">
                                  <span slot="title">item four</span>
                                  <el-menu-item index="1-4-1">item one</el-menu-item>
                                </el-submenu>
                            </el-submenu>
                            <el-menu-item index="/lms">
                                <i class="el-icon-menu"></i>
                                <span slot="title">Online Course</span>
                            </el-menu-item>
                            <el-menu-item index="3" disabled>
                                <i class="el-icon-document"></i>
                                <span slot="title">Navigator Three</span>
                            </el-menu-item>
                            <el-menu-item index="4">
                                <i class="el-icon-setting"></i>
                                <span slot="title">Navigator Four</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                    </el-row>
                </el-aside>
                <el-main v-loading="$store.state.ui.loading">
                
                    <dashboard-content @click.native="toggleSidebar">
                    </dashboard-content>
                    
                    <!--
                    <el-row>
                        <el-col :span="24" class="menu-h-container">
                            <div class="menu-level-1">
                                <el-button type="success" icon="el-icon-plus" size="small" plain>Ajouter</el-button>
                                <el-button type="primary" icon="el-icon-edit" size="small" plain></el-button>
                                <el-button type="danger" icon="el-icon-delete" size="small" plain></el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" class="menu-v-container">
                            <div class="menu-v-header">
                               menu-level-1-header
                            </div>
                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <!--<el-col :span="2">
                                    <el-checkbox style="margin:10px;"></el-checkbox>
                                </el-col>--
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row style="border-bottom: 1px solid #F4F4F4;">
                                <el-col :span="24" class="menu-level-1-item">
                                    <div style="border-left:4px solid #f56c6c;">
                                    <div style="padding:5px; 10px;">
                                        <span class="h3" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-regular" style="display:block;margin-bottom:0px;font-weight:700"> Item title</span>
                                        <span class="text-small"> Item title</span>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>


                        </el-col>
                        <el-col :span="16">
                            Main
                        </el-col>
                    </el-row>
                    
                    <!--<el-container>
                        <el-header>Header</el-header>
                        <el-container>
                            <el-aside width="200px">Aside</el-aside>
                            <el-main>Main</el-main>
                        </el-container>
                    </el-container>-->

                </el-main>
            </el-container>
        </el-container>
    </div>
    
</template>

<style lang="scss" scoped>
.wrapper {
    height: 100%;
}
.el-container {
    height: 100vh;
}
.menu-v {
    border:1px solid rgb(235, 238, 245);
    border-top:none;
    border-bottom:none;
    height:calc(100vh);
    background-color:#FFFFFF;
    .menu-v-header {
        width:100%;
        height: 48px;
        background-color:#F8F8F8;
        border-bottom:1px solid rgb(235, 238, 245);
    }
}
.menu-v-button {
    text-align:center;
    height:calc(100vh);
    border-right:4px solid #f56c6c;
    .menu-button {
         border:none;
         background-color:transparent;
         color:#F56C6C;
    }
}
.menu-h-container {
    .menu-level-1-header {
    }
    
    .menu-level-1 {
        min-height:28px;
        padding:8px 15px;
        background-color:#FFFFFF;
        border-bottom:1px solid rgb(235, 238, 245);
    }
}
.menu-v-container {
    border-right: 1px solid rgb(235, 238, 245);
    min-height:calc(100vh - 100px);
    background-color:#FFFFFF;

    .menu-v-header {
        width:100%;
        height: 48px;
        border-bottom:8px solid #F4F4F4;
    }
    
    .menu-level-1 {
        min-height:28px;
        padding:8px 15px;
        background-color:#FFFFFF;
        border-bottom:1px solid rgb(235, 238, 245);
    }
}
.el-menu {
    border-right: none;
}
.el-menu-item:focus {
    /* background-color: #A7BCDA !important; */
    color: #1A4382;
    font-weight: 500;
}
.el-header {
    /*
    padding-top: 80px;
    padding-bottom: 45px;
    background: #141E30;
    background: -webkit-gradient(linear, left top, right top, from(#0c2646), color-stop(60%, #204065), to(#2a5788));
    background: linear-gradient(to right, #0c2646 0%, #204065 60%, #2a5788 100%);
    position: relative;
    overflow: hidden;
    */
    width: 100%;
    padding: 9px;
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
    /*background: -webkit-gradient(linear, left top, right top, from(#0c2646), color-stop(60%, #204065), to(#2a5788));
    background: linear-gradient(to right, #0c2646 0%, #204065 60%, #2a5788 100%);
    background: -webkit-linear-gradient(153deg, #61c6ea 0%, #0087e0 100%);
    background: linear-gradient(-63deg, #61c6ea 0%, #0087e0 100%);
    background: -webkit-linear-gradient(153deg,#d5b133 0%,#d37878 100%);
    background: linear-gradient(-63deg,#d5b133 0%,#d37878 100%);
    background: -webkit-linear-gradient(153deg,#90d5b3 0%,#0087e0 100%);
    background: linear-gradient(-63deg,#90d5b3 0%,#0087e0 100%);*/
    background-color: #0067B8;
    
    .el-row .el-col.header-button-container {
        text-align:right;
        color:#FFFFFF;
        
        .el-button {
            color: #FFF;
            font-size: 18px;
            padding: 0;
            margin: 0px 5px;
        }
        .el-button:hover {
            color: #D8E0E9;
        }
    }
}
.el-main {
    padding: 0;
    min-height: calc(100vh - 48px);
    position: relative;
    float: right;
    width: 100%;
    /* width: calc(100% - 260px); */
    -webkit-transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
    transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);
}
.el-row {
    margin-bottom: 0;
    
    /*&:last-child {
      margin-bottom: 0;
    }*/
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
/*** TYPOGRAPHY ***
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
*/
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
        isCollapse: false
      }
    },
    watch: {
    	 isCollapse: function (val) {
      	 this.$store.dispatch('uiCollapseMenu', val)
        /*
        if (!val){
            this.asideWidth = '420px'
            this.menuVerticalButton = 4
            // this.mainPanelPaddginLeft= 'padding-left:300px'
            this.$store.dispatch('collapseUi', true)
        } else {
            this.asideWidth = '54px'
            this.menuVButton = 24
            // this.mainPanelPaddginLeft= 'padding-left:64px'
        }
        */
    	 }
  	 }
  }
</script>
