<template>
    <div v-loading="loading">
        <div v-if="cartTotal == 0" class="cart-empty">
            <i class="el-icon-goods"></i>
            <br/>
            <span>Your Cart is empty</span>
        </div>
        <div v-else>
            <el-card class="cart-line" v-for="course in coursesInCart" :key="id" :course="course">
                <el-row>
                    <el-col :span="5" class="image">
                        <img :src="course.image" :alt="course.title"/>
                    </el-col>
                    <el-col :span="12" class="card-body">
                        <el-row>
                            <el-col :span="24" style="margin: 0;">
                                <h3>{{ course.title }}</h3>
                            </el-col>
                            <el-col :span="24" style="margin: 0;">
                                <p class="description">
                                {{ course.description }}
                                </p>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="7">
                        <el-row class="functionnal" :gutter="20">
                            <el-col class="amount" :span="16" style="margin: 0;">
                                <span> {{ course.total }}  <small>{{ course.currency }}</small>  </span>
                            </el-col>
                            <el-col :span="8" style="margin: 0;">
                                <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="removeCourse(course.id)"></el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-card>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cart-empty {
    font-size: 3rem;
    text-align: center;
    color: #C0C4CC;
    height: 10rem;
    padding: 3.5rem;
}
.cart-line {
    margin-bottom: 10px;
    height: 60px;
    -webkit-box-shadow: none;
    border: 1px solid #DCDFE6;
    border-radius: 0px;
    box-shadow: none;
    
    .el-row{
        margin: -20px !important;
        
        /deep/ .image {
            overflow: hidden;
            height: 80px;
            position: relative;
            background-color: #EFEFEF;

            img {
                width:100%;
                height:100%;
            }
        }
        
        /deep/ .card-body {
            padding:10px 30px;
            overflow: hidden;
        }
        /deep/ .functionnal {
            padding: 37px 10px 0px 0px;
            
            .amount {
                text-align: center;
                margin: 10px 0;
                border: 1px solid #CCC;
                border-bottom: 0;
                border-top: none;
                font-weight: 500;
                font-size: 20px;
                color: #67C23A;
            }
        
        }

    }
}

</style>

<script>
  export default {
    data() {
        return {
        }
    },
    props: {
      // course: { default () { return {} } }// body data
    },
    computed: {
        coursesInCart() {
            return this.$store.getters['$_lms/cartCourses']
            // return this.$store.state.$_lms.cart.map(Id => this.$store.state.$_lms.entities.courses[Id])
        },
        cartTotal() {
            return this.$store.getters['$_lms/cartTotal']
        },
        loading() {
            return this.$store.state.ui.loading
        }
    },
    methods: {
      removeCourse (courseId) {
        this.$confirm('Voulez-vous réellement supprimer cette formation?', 'Attention', {
          confirmButtonText: 'Oui, je veux la supprimer',
          cancelButtonText: 'Annuler',
          type: 'warning'
        }).then(() => {
          this.$emit('removeCourse', courseId)
        }).catch(() => {
  
        })
      }
    }
  }
</script>
