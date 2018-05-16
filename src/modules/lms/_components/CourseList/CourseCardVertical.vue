<template>
    <a v-on:click="selectCourseView(course.id)">
    <el-card>
        <el-row>
            <el-col :span="24" class="image">
                <img :src="course.image" :alt="course.title" width="100%"/>
            </el-col>
            <el-col :span="24" class="card-body">
                <el-row>
                    <el-col :span="24" style="margin: 0;">
                        <p class="author">
                            Jean-Carles Doukouré
                        </p>
                    </el-col>
                    <el-col :span="24" style="margin: 0;" class="description-container">
                        <h3>{{ course.title }}</h3>
                        <p class="description">
                        {{ course.description }}
                        </p>
                    </el-col>
                    <el-col :span="15" :offset="5">
                        <el-rate v-model="course.rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" size="mini"></el-rate>
                    </el-col>
                    <!-- <el-col :span="12" class="button-container">
                        <el-button type="info" @click="selectCourseView(course.id)" size="small">Voir</el-button>
                        <!-- <el-button type="primary" @click="selectCourseSetup(course.id)" size="small">Modifier</el-button>
                    </el-col>-->
                </el-row>
            </el-col>
        </el-row>
    </el-card>
    </a>
</template>

<style lang="scss" scoped>
.el-card {
    width: 224px;
    height: 266px;
    -webkit-box-shadow: none;
    border: 1px solid #DCDFE6;
    border-radius: 0px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.2);
    transition: box-shadow 83ms;
    cursor: pointer;
    
    /deep/ .el-row{
        margin: -20px 0px -20px -20px !important;
    }
    
    /deep/ .el-col {
        margin-bottom: 5px;
    }

    /deep/ .card-body {
        padding: 20px 10px 10px 30px;
        width: 224px;
        position: relative;
    }

    /deep/ .image {
        overflow: hidden;
        width: 224px;
        height: 122px;
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
    }
    
    /deep/ .description-container {
        height: 80px;
        /*overflow: hidden;
        margin-top:0px;*/
        font-size: 12px;
        line-height: 19px;
        margin: 0;
        margin-bottom: 5px;
        overflow: hidden;
        word-wrap: break-word;
        
        p {
            margin:0;
        }
    }
    
    /deep/ .button-container {
        /* margin-bottom: 5px; */
        padding-top: 5px;
        text-align: right;
    }
    
    /deep/ h3 {
        margin: 0;
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
