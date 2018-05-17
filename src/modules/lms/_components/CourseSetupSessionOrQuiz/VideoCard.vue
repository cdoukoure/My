<template>
    <el-card>
        <div class="file-search" >
            Activer la recherche <el-switch v-model="showSearch" style="margin-bottom:10px;"></el-switch>
            <el-input v-show="showSearch" placeholder="Please input" v-model="search" size="small" @change="filterMethod($event)">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <div class="file-list">
            <h3 v-show="localFiles.length === 0">
                    <i class="el-icon-picture"></i>
                Ce cours ne contient
                <span v-if="imageFormat"> aucune image </span>
                <span v-else> aucune video </span>
            </h3>
            <div v-show="localFiles.length > 0" v-for="localFile in localFiles" :key="localFile.id" v-on:click="clickHandler(localFile)">
            <el-row class="file-card">
                <el-col :span="10">
                    <div class="leftside">
                        <img v-if="imageFormat" :src="localFile.url" width="100%" height="100px"/>
                        <video v-else width="100%" height="100" :poster="localFile.imagePreview">
                            <source :src="localFile.url" :type="localFile.type">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </el-col>
                <el-col :span="14" class="rightside">
                        <el-row>
                            <el-col :span="24">
                                <span class="h3 title">{{ localFile.name }}</span>
                            </el-col>
                            <el-col :span="24">
                                <span class="text-small">{{ localFile.date }}</span>
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
    /* name: 'file-widget', */
    props: {
        /* showSearch: { default() { return false } }, */
        imageFormat: { default() { return false } },
    },
    data () {
      return {
        search: '',
        showSearch: false,
        remoteFiles: [],
        tmpFiles: [],
        imageFiles: [],
        videoFiles: [],
        localFiles: [],
      }
    },
    beforeCreate () {
    },
    created () {
        this.remoteFiles = this.$store.getters['$_lms/currentCourse'].files
        this.getRemoteMedia(this.imageFormat)
    },
    mounted () {
        this.filterMethod('')
    },
    beforeDestroy () {
    },
    computed: {
    },
    methods: {
      clickHandler (localFile) {
            // alert("TESTER")
        console.log('Media selected')
        this.$emit('mediaClicked', localFile)
      },
      getRemoteMedia(isImageFormat) {
        let videoFormat = ['video/mp4', 'video/ogg', 'video/webm', 'video/x-flv']
        let imageFormat = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
        this.tmpFiles = []
        this.localFiles = []
        if(isImageFormat) {
            // alert("IS IMAGE")
            this.remoteFiles.forEach(fil => {
                // alert(imageFormat.indexOf(fil.format))
                if (imageFormat.indexOf(fil.format) > -1) {
                    alert(JSON.stringify(fil))
                    this.tmpFiles.push(fil)
                }
            })
            // alert("IS IMAGE")
        } else {
            // alert("IS VIDEO")
            this.remoteFiles.forEach(fil => {
                // alert(videoFormat.indexOf(fil.format))
                if (videoFormat.indexOf(fil.format) > -1) {
                    this.tmpFiles.push(fil)
                }
            })
        }
        this.localFiles = this.tmpFiles
      },
      filterMethod (query) {
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.localFiles = this.tmpFiles.filter(item => {
              return item.name.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1
            })
          }, 200)
        } else {
          this.localFiles = this.tmpFiles
        }
      }
    },
    watch: {
        imageFormat: function (val) {
            this.getRemoteMedia(val)
            // alert(JSON.stringify(this.localFiles))
        },
    }
  }
</script>

<style scoped>
.el-card {
    background-color: #EBEEF5;
    margin: 0px;
    /*margin-top: 37px;*/
    border: 1px solid #EBEEF5;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
}
.el-card >>> .el-card__body {
    padding: 0 20px!important;
}
.el-form-item {
    margin-bottom: 0px;
}
h3 {
    margin: 0;
    position: relative;
    top: 40%;
    transform: translateY(-40%);
    color:#C0C4CC;
    text-align:center;
}
h3 i {
    font-size:70px;
    font-weight:thin;
    display:block;
    margin-bottom:20px;
}
.file-search {
    margin: 10px auto 10px;
    text-align: right;
}
.leftside {
    border-left:4px solid #f56c6c!important;
}
.rightside {
    padding: 10px;
}
video {
  pointer-events: none;
    object-fit: cover;
    width:100%;
    height:100px;
}
video::-webkit-media-controls {
  display: none;
}
.file-list {
    height: 415px;
    overflow:scroll;
    margin: 0px -20px 0px -20px;
}
.file-card {
    border-bottom: 1px solid #DCDFE6;
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
