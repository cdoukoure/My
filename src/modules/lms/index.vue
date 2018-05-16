<template>
    <el-container>
                <el-header>
        <el-row :gutter="10">
                    <el-col :span="20">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item><b>E-leaning Center</b></el-breadcrumb-item>
            </el-breadcrumb>
            </el-col>
            <el-col :span="4">
            <cart-status></cart-status>
            </el-col>
            </el-row>
        </el-header>

        <el-main>
            <CourseList :courses="courses" />
        </el-main>
    </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import store from './_store'
import CartStatus from './_components/Cart/CartStatus.vue'
import CourseList from './_components/CourseList'

export default {
  name: 'LmsModule',
  components: {
    CourseList,
    CartStatus
  },
  computed: {
    ...mapGetters({
      courses: '$_lms/courseSet'
    })
  },
  created () {
    // alert(typeof this.$store.dispatch('$_lms/getCourses'))
    if (typeof this.$store.dispatch('$_lms/getCourses') === 'undefined') {
      this.$store.registerModule('$_lms', store)
    }
  },
  mounted () {
    // if (this.courses.length > 0) {
    this.$store.dispatch('$_lms/getCourses')
    // }
    this.$store.dispatch('$_lms/selectCurrentCourse', null)
    this.$store.dispatch('$_lms/selectSessionOrQuiz', null)
  }
}
</script>

<style lang="scss" scoped>
.el-card {
    padding: 20px;
    -webkit-box-shadow: none;
    box-shadow: none;
}
.el-breadcrumb {
    font-size: 1.5rem;
}
h1 {
    font-size: 1.3rem;
    margin-top: 10px;
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
    
    .el-row {
        width: 100%;
    }
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
</style>


