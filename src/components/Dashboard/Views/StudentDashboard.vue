<template>
    <el-container>
        <!-- <el-header>
            <h1 class="h1">TABLEAU DE BORD</h1>
            <!--
            <el-menu :default-active="1" mode="horizontal">
                <el-menu-item index="1">Mes informations</el-menu-item>
                <el-menu-item index="2">Paiement et facturation</el-menu-item>
                <el-menu-item index="3">Services et abonnements</el-menu-item>
                <el-menu-item index="4">Sécurité</el-menu-item>
                <el-menu-item index="5">Famille</el-menu-item>
            </el-menu>
            --
        </el-header> -->
        <el-main>
            <el-row :gutter="20" class="header">
                    <el-col :span="24">
                        <h1>Graph des performances par matière et par mois</h1>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </el-col>
                    <el-col :span="6">
                        <el-card>
                            <h3 class="card-title">Examens à venir</h3>
                            <p class="category">Suivez la progression de vos cours</p>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card>
                            <h3 class="card-title">Frais de scolarité</h3>
                            <p class="category">Suivez la progression de vos cours</p>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card>
                            <h3 class="card-title">Evènements</h3>
                            <p class="category">Suivez la progression de vos cours</p>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card>
                            <h3 class="card-title">Documents</h3>
                            <p class="category">Suivez la progression de vos cours</p>
                        </el-card>
                    </el-col>
            </el-row>
            
                <el-row :gutter="40">
                    <el-col :span="11" :offset="1">
                        <el-card>
                            <div class="card-header">
                                <h3 class="card-title">Progression des cours</h3>
                                <p class="category">Suivez la progression de vos cours</p>
                            </div>
                            <div class="card-body">
                                <el-progress v-for="cour in cours" :key="code" :percentage="percentage" :status="status"></el-progress>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="11">
                        <el-card>
                            <div class="card-header">
                                <h3 class="card-title">Annonces</h3>
                                <p class="category">Suivez la progression de vos cours</p>
                            </div>
                            <div class="card-body">
                                <el-progress v-for="cour in cours" :key="code" :percentage="percentage" :status="status"></el-progress>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                
                <el-row :gutter="40">
                    <el-col :span="22" :offset="1">
                        <el-card>
                            <div class="card-header">
                                <h3 class="card-title">Resultats des examens</h3>
                                <p class="category">{{ subTitle }}</p>
                            </div>
                            <data-tables-server :data="data" :total="total" :loading="loading" @query-change="queryChange" :action-col-def="actionColDef" :actions-def="actionsDef" :table-props="tableProps">
                                <el-table-column v-for="column in columns" :prop="column.prop" :label="column.label" :key="column.prop" :width="column.width" ortable="custom">
                                </el-table-column>
                            </data-tables-server>
                        </el-card>
                    </el-col>
                </el-row>
                
                <el-row :gutter="40">
                    <el-col :span="22" :offset="1">                        <el-card>
                            <div class="card-header">
                                <h3 class="card-title">Renforcement en ligne</h3>
                                <p class="category">{{ subTitle }}</p>
                            </div>
                            <el-carousel :interval="4000" type="card" height="200px">
                                <el-carousel-item v-for="item in 6" :key="item">
                                    <h3>{{ item }}</h3>
                                </el-carousel-item>
                            </el-carousel>
                        </el-card>
                    </el-col>
                </el-row>
                
        </el-main>
    </el-container>
</template>

<script>
  import EditProfileForm from './User/EditProfileForm.vue'
  import UserCard from './User/UserCard.vue'
  import MembersCard from './User/MembersCard.vue'
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
            email: '',
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
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
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
    
    h1, .h1 {
        color: #0067B8;
        margin: 0;
        font-size: 24px;
        font-weight: 500;
    }
}
.el-main {
    padding: 0px;
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
    min-height: 400px;
    padding: 20px;
}
.el-row {
    margin-bottom: 60px;
}
.el-card {
    -webkit-box-shadow: none;
    box-shadow: none;
}
/*
h4 + .category, h4.title + .category, .h4 + .category, .h4.title + .category {
    margin-top: -10px;
}
.card-title {
    margin-top: 0px;
    margin-bottom: 0px;
}
.category, .card-category {
    text-transform: capitalize;
    font-weight: 400;
    color: #9A9A9A;
    font-size: 0.7142em;
}
*/
p {
    margin-bottom: 1rem;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>
