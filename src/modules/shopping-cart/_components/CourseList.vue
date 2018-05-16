<template>
    <el-row :gutter="20">
        <el-col :span="12" v-for="course in courses" :key="course.id">
            <el-card>
                <el-row>
                    <el-col :span="8" class="image">
                        <img :src="course.image" :alt="course.title"/>
                    </el-col>
                    <el-col :span="16" class="card-body">
                        <el-row>
                            <el-col :span="24" style="margin: 0;">
                                <h3>{{ course.title }}</h3>
                            </el-col>
                            <el-col :span="24" style="margin: 0;">
                                <p class="description text-center">
                                {{ course.description }}
                                </p>
                            </el-col>
                            <el-col :span="12">
                                <el-rate v-model="course.rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
                                {{ course.number_of_subscribers }} 25000 inscrits
                            </el-col>
                            <el-col :span="12" class="button-container">
                                <el-button type="info" @click="selectCourseView(course.id)" size="small">Voir</el-button>
                                <el-button type="primary" @click="selectCourseSetup(course.id)" size="small">Modifier</el-button>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
  export default {
    props: {
      courses: { default () { return {} } }// body data
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
