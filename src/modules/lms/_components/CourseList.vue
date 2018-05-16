<template>
    <el-row :gutter="20">
        <el-col :span="12" v-if="listType === 'vertical'" v-for="course in courses" :key="course.id">
            <course-card-vertical :course="course" v-on:selectCourseView="selectCourseView"></course-card-vertical>
        </el-col>
        <el-col :span="12" v-else v-for="course in courses" :key="course.id">
            <course-card-horizontal :course="course"
                v-on:selectCourseView="selectCourseView"
                 v-on:selectCourseSetup="selectCourseSetup">
            </course-card-horizontal>
        </el-col>
    </el-row>
</template>

<script>
import CourseCardHorizontal from './CourseList/CourseCardHorizontal.vue'
import CourseCardVertical from './CourseList/CourseCardVertical.vue'

  export default {
    components: {
        CourseCardHorizontal,
        CourseCardVertical,
    },
    props: {
      courses: { default () { return {} } },// body data
      listType: { type: String, default() { return 'horizontal' } },
    },
    methods: {
      selectCourseSetup (courseId) {
        // alert(courseId)
        this.$store.dispatch('$_lms/selectCurrentCourse', courseId)
            // alert(JSON.stringify(this.$store.state.currentCourseId))
        this.$router.push({ name: 'courseSetup'})
      },
      selectCourseView (courseId) {
        // alert(courseId)
        this.$store.dispatch('$_lms/selectCurrentCourse', courseId)
            // alert(JSON.stringify(this.$store.state.$_lms.currentCourseId))
        this.$router.push({ name: 'courseView'})
      }
    }
  }
</script>

<style scoped>
.el-col {
    margin-bottom: 20px;
}
.image {
    overflow: hidden;
    height: 200px;
    position: relative;
    background-color: #EFEFEF;
}
.el-card {
    height: 200px;
    -webkit-box-shadow: none;
    border: 1px solid #DCDFE6;
    border-radius: 0px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.2);
    transition: box-shadow 83ms;
}
.el-card .el-row{
    margin: -20px 0px -20px -20px !important;
}
.card-body {
    padding:30px 0px 30px 40px;
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
    /* margin-bottom: 5px; */
    text-align: right;
}
.el-card hr {
    margin: 5px 15px;
    /*margin-top: 1rem;
    margin-bottom: 1rem;*/
    border: 0;
    border-top-width: 0px;
    border-top-style: none;
    border-top-color: currentcolor;
    border-top: 1px solid rgba(0,0,0,.1);
    box-sizing: content-box;
    height: 0;
    overflow: visible;
}
h3 {
    margin: 5px 0 5px 0;
    font-size: 1.2rem;
}
.description {
    height: 60px;
    overflow: hidden;
    margin-top:10px;
}
</style>
