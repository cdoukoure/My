<template>
    <el-container>
        <el-header>
            <el-menu :default-active="1" mode="horizontal">
                <el-menu-item index="1">Mes informations</el-menu-item>
                <el-menu-item index="2">Paiement et facturation</el-menu-item>
                <el-menu-item index="3">Services et abonnements</el-menu-item>
                <el-menu-item index="4">Sécurité</el-menu-item>
                <el-menu-item index="5">Famille</el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <el-row :gutter="20" class="header">
                <el-col :span="1">
                    &nbsp;
                </el-col>
                <el-col :span="4">
                    <img src="" class="avatar"/>
                </el-col>
                <el-col :span="10">
                    <h1>{{userMe.profile.firstName}} {{userMe.profile.lastName}}</h1>
                    <span style="display:block;">{{userMe.profile.aboutMe}}</span>
                </el-col>
                <el-col :span="9">
                    <el-button @click="updateMode = !updateMode" type="danger" style="margin:70px auto;">Modifier mes informations</el-button>
                </el-col>
            </el-row>
            <div style="padding: 40px 20px;">
            <el-row :gutter="80" v-if="!updateMode">
                <el-col :span="2">
                    &nbsp;
                </el-col>
                <el-col :span="10">
                    <h2>Paiement et facturation</h2>
                    <user-card :username="userMe.username" :profile="userMe.profile">
                    </user-card>
                </el-col>
                <el-col :span="10">
                    <h2>Services et abonnements</h2>
                    <user-card :username="userMe.username" :profile="userMe.profile">
                    </user-card>
                </el-col>
            </el-row>
            <el-row :gutter="80" v-if="updateMode">
                <el-col :span="20" :offset="2">
                    <edit-profile-form :username="userMe.username" :profile="userMe.profile">
                    </edit-profile-form>
                </el-col>
            </el-row>
            </div>
        </el-main>
    </el-container>
    
    <!--
     <el-row :gutter="20">
     <el-col :span="8">
     <user-card :username="userMe.username" :profile="userMe.profile">
     </user-card>
     </el-col>
     <el-col :span="16">
     <edit-profile-form :username="userMe.username" :profile="userMe.profile">
     
     </edit-profile-form>
     </el-col>
     </el-row>
     -->
</template>

<script>
  import EditProfileForm from './EditProfileForm.vue'
  import UserCard from './UserCard.vue'
  import MembersCard from './MembersCard.vue'
  export default {
    components: {
      EditProfileForm,
      UserCard,
      MembersCard
    },
    data () {
      return {
        userMe: {
          username: 'michael23',
          profile: {
            company: 'Paper Dashboard',
            email: 'faker@gmail.com',
            backgroundImage: '',
            avatar: '',
            firstName: 'Michael',
            lastName: 'Faker',
            address: 'Melbourne, Australia',
            city: 'melbourne',
            postalCode: '',
            aboutMe: "Oh so, your weak rhyme. You doubt I'll bother, reading into it.I'll probably won't, left to my own devicesBut that's the difference in our opinions.",
            socialLinks: []
          }
        },
        updateMode: false
      }
    }
  }
</script>
<style lang="scss" scoped>
h1 {
    font-size: 2rem;
    /* color: #2A5687; */
    margin-bottom: 10px;
}
.el-header {
    width: 100%;
    padding: 9px;
    padding-bottom: 0;
    height: 48px!important;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    color: #fff;
    position: relative;
    z-index: 0;
    font-weight: 400;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    background-color: #FFFFFF;
    
    .el-menu-item,
    .el-submenu__title,
    .el-submenu .el-menu-item,
    .el-menu--horizontal > .el-submenu .el-submenu__title {
        height: 39px!important;
        line-height: 39px!important;
        font-weight: bold;
    }
    .el-menu--horizontal {
        border-bottom: none;
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
.header {
    /*background: -webkit-linear-gradient(153deg,#d5b133 0%,#d37878 100%);
    background: linear-gradient(-63deg,#d5b133 0%,#d37878 100%);*/
    background: linear-gradient(to bottom,#0078d7 0%,#09a2ce);
    /*background: -webkit-linear-gradient(153deg,#90d5b3 0%,#0087e0 100%);
    background: linear-gradient(-63deg,#90d5b3 0%,#0087e0 100%);*/
    box-shadow: 0 12px 45px -8px rgba(0,120,215,.35);
    color: #FFFFFF;
}
.avatar {
    width: 124px;
    height: 124px;
    border: 1px solid #FFFFFF;
    background-color: #CCC;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    margin: 25px;
    vertical-align: middle;
}
</style>
