<template>
    <el-container>
        <el-header>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <!-- <el-breadcrumb-item :to="{ path: '/' }">Cours à distance</el-breadcrumb-item> -->
                <el-breadcrumb-item><b>E-leaning Center</b></el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <CourseList :courses="courses" />
        </el-main>
    </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import store from './_store'
import CourseList from './_components/CourseList'

export default {
  name: 'LmsModule',
  components: {
    CourseList
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

<style scoped>
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
    padding: 10px 18px;
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
</style>


