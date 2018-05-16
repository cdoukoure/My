<template>
    <el-card>
        <div class="video-search"  style="">
            <el-input placeholder="Please input" v-model="search" @change="remoteMethod($event)">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <br/>
            <br/>
            <h3 v-if="videos.length === 0" style="float:middle;">Ce cours ne contient aucun media</h3>
        </div>
        <div class="video-list">
            <div v-for="video in videos" :key="video.id" v-on:click="clickHandler(video)">
            <el-row class="video-card">
                <el-col :span="8">
                    <div class="leftside">
                        <!-- <img :src="video.imagePreview" width="100%" height="100px"/> -->
                        <video width="100%" height="100" :poster="video.imagePreview" controls>
                            <source :src="video.url" :type="video.type">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </el-col>
                <el-col :span="16" class="rightside">
                        <el-row>
                            <el-col :span="24">
                                <span class="h3 title">{{ video.name }}</span>
                            </el-col>
                            <el-col :span="24">
                                <span class="text-small">{{ video.date }}</span>
                            </el-col>
                        </el-row>
                </el-col>
            </el-row>
            </div>
        </div>
    </el-card>
</template>

<script>
  export default {
    /* name: 'video-widget', */
    data () {
      return {
        search: ''
            // videos: [],
      }
    },
    beforeCreate () {
    },
    created () {
    },
    mounted () {
        // this.videos = this.$store.getters['$_lms/getCourseVideoFiles']
    },
    beforeDestroy () {
    },
    computed: {
      videos () {
        let videoFormat = ['video/mp4', 'video/ogg', 'video/webm', 'video/x-flv']
        var videoFiles = []
            // alert(videoFormat)
        this.$store.getters['$_lms/currentCourse'].files.forEach(fil => {
                // alert(fil.format)
          if (videoFormat.indexOf(fil.format) > -1) {
            videoFiles.push(fil)
          }
        })
            // alert(JSON.stringify(videoFiles))
        return videoFiles
            // .filter(function (file) { return videoFormat.indexOf(file.type) > -1 })
  
            // return this.$store.getters['$_lms/getCourseVideoFiles']
      }
    },
    methods: {
      clickHandler (video) {
            // alert("TESTER")
        console.log('Video Selected')
        this.$emit('videoClicked', video)
      },
      remoteMethod (query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.videos = this.$store.getters['$_lms/currentCourse'].files.filter(item => {
              return item.name.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1
            })
          }, 200)
        } else {
          this.videos = this.$store.getters['$_lms/getCourseVideoFiles']
        }
      }
    }

  }
</script>

<style scoped>
.el-card__body {
    padding: 5px!important;
}

.el-form-item {
    margin-bottom: 0px;
}
h3 {
    margin: 0;
}
.video-search {
    /* margin: 0px auto 10px; */
    margin: -10px -10px 10px -10px;
}
.leftside {
    border-left:4px solid #f56c6c!important;
}
.rightside {
    padding: 10px;
}
video {
  pointer-events: none;
}
video::-webkit-media-controls {
  display: none;
}
.video-list {
    max-height: 450px;
    overflow:scroll;
    margin: 0px -20px 20px -20px;
}
.video-card {
    border: 1px solid #DCDFE6;
    cursor:pointer;
    background-color: #FFFFFF;
    
}
.title {
    height:55px;
    display:block;
    margin-bottom:10px;
    font-weight:700;
    text-transform:uppercase;
    overflow:auto;
}
</style>
