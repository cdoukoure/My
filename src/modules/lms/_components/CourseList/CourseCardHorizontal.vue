<template>
    <el-card>
        <el-row>
            <el-col :span="8" class="image">
                <img :src="course.image" :alt="course.title" width="100%"/>
            </el-col>
            <el-col :span="16" class="card-body">
                <el-row>
                    <el-col :span="24" style="margin: 0;">
                        <h3>{{ course.title }}</h3>
                    </el-col>
                    <el-col :span="24" style="margin: 0;">
                        <p class="description">
                        {{ course.description }}
                        </p>
                    </el-col>
                    <el-col :span="24" style="margin: 0;">
                        <p class="author">
                            Jean-Carles Doukouré
                        </p>
                    </el-col>
                    <el-col :span="12">
                        <el-rate v-model="course.rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
                        {{ course.number_of_subscribers }} 25000 inscrits
                    </el-col>
                    <el-col :span="12" class="button-container">
                        <el-button type="warning" @click="selectCourseSetup(course.id)" size="small">Modifier</el-button>
                        <el-button type="success" @click="selectCourseView(course.id)" size="small">Voir</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
</template>

<style lang="scss" scoped>
.el-card {
    height: 180px;
    -webkit-box-shadow: none;
    border: 1px solid #DCDFE6;
    border-radius: 0px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.2);
    transition: box-shadow 83ms;
    
    /deep/ .el-row{
        margin: -20px 0px -20px -20px !important;
    }
    
    /deep/ .el-col {
        margin-bottom: 20px;
    }

    /deep/ .card-body {
        padding:15px 0px 30px 40px;
    }

    /deep/ .image {
        overflow: hidden;
        height: 180px;
        position: relative;
        background-color: #EFEFEF;
    }
    
    /deep/ .author {
        color: #737373;
        font-size: 12px;
        overflow: hidden;
        padding-bottom: 10px;
        margin: 0;
        text-overflow: ellipsis;
        text-transform: uppercase;
        text-align:left!important;
    }
    
    /deep/ .description {
        height: 50px;
        /*overflow: hidden;
        margin-top:0px;*/
        font-size: 12px;
        line-height: 19px;
        margin: 0;
        overflow: hidden;
        word-wrap: break-word;
    }
    
    /deep/ .button-container {
        /* margin-bottom: 5px; */
        padding-top: 5px;
        text-align: right;
    }
    
    /deep/ h3 {
        margin-bottom: 5px;
    }

}
</style>

<script>
  export default {
    props: {
      course: { default () { return {} } }// body data
    },
    methods: {
        selectCourseView(CourseId) {
            this.$emit('selectCourseView',CourseId)
        },
        selectCourseSetup(CourseId) {
            this.$emit('selectCourseSetup',CourseId)
        },
    }
  }
</script>
