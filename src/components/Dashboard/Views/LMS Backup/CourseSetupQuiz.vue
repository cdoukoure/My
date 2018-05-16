<template>
<!--
    <el-dialog :title="selectedTable.name" :visible.sync="dialogFormVisible">
        <el-container>
            <el-aside :width="asideWidth">
                <el-steps v-for="section" :key="" direction="vertical" :active="stepCounter" finish-status="success" class="step-menu">
                    <el-step title="Généralités" icon="el-icon-setting"></el-step>
                    <el-step title="INFRASTRUCTURES" icon="el-icon-location"></el-step>
                    <el-step v-show="stepCounter >= 2 && stepCounter <=3" title="Fondation"></el-step>
                    <el-step v-show="stepCounter >= 2 && stepCounter <=3" title="Construction de sous-sol"></el-step>
                    <el-step title="SUPERSTRUCTURE ET ENVELOPPE" icon="el-icon-location"></el-step>
                </el-steps>
            
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
    </el-dialog>
-->
</template>

<script>
  export default {
    // props: ['username','profile'],
    // name: 'user-card',
    props: {
      username: { default () { return '' } },
      profile: { default () { return {} } }// body data
    }
  }
</script>

<style scoped>
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
