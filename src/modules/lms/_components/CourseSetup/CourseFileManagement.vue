<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-input placeholder="Please input" v-model="search" v-on:input="remoteMethod">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-upload
                    class="video-uploader"
                    drag
                    :action="action"
                    :before-upload="beforeUpload"
                    :on-success="fileSuccess"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture-card"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                    <div class="el-upload__tip" slot="tip">Picture files with a size less than 2Mb. Video files with a size less than 200Mb</div>
                </el-upload>
            </el-col>
        </el-row>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogFile.url" alt="" style="max-height:450px;">
            <span>Nom :</span><span>{{ dialogFile.name }}</span>
            <span>Date: </span><span>{{ dialogFile.date }}</span>
        </el-dialog>
    </div>
</template>

<script>

import * as moment from 'moment'

export default {
  props: {
  },
  data () {
    return {
      dialogFile: {},
      dialogVisible: false,
      search: '',
      action: this.$store.getters['$_lms/currentCourse'].files_dir,
      fileList: []
    }
  },
  mounted () {
    this.fileList = this.$store.getters['$_lms/currentCourse'].files
  },
  methods: {
    beforeUpload (file) {
            // Video
      const isMP4 = file.type === 'video/mp4'
      const isOGG = file.type === 'video/ogg'
      const isFLV = file.type === 'video/x-flv'
      const isWEBM = file.type === 'video/webm'
            // Image
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
            // Size
      const isLt2M = file.size / 1024 / 1024 < 2 // 2MB
      const isLt200M = file.size / 1024 / 1024 < 200 // 200MB

      if (!isJPG && !isPNG && !isMP4 && !isOGG && !isFLV && !isWEBM) {
        this.$message.error('File must be JPG, PNG, MP4, OGG, FLV or WEBM format!')
        return false
      }

      if ((isJPG || isPNG) && !isLt2M) {
        this.$message.error('Picture size can not exceed 2MB!')
        return false
      }
      if ((isMP4 || isOGG || isFLV || isWEBM) && !isLt200M) {
        this.$message.error('Video size can not exceed 200MB!')
        return false
      }

      return true
    },
    handlePreview (file) {
      this.dialogFile = file
      this.dialogVisible = true
    },
    handleRemove (file) {
      this.$store.dispatch('$_lms/courseFileDelete', file)
    },
    fileSuccess (res, file) { // Set sessionOrQuiz Content after submitting in saveSessionOrQuiz()
      let now = moment().format('lll')

      let fil = {'name': file.name, 'url': URL.createObjectURL(file.raw), 'size': file.size, 'type': file.type, 'date': now}

      this.$store.dispatch('$_lms/courseSetupFileAdd', fil)

      this.$message({
        type: 'success',
        message: 'Contenu uploader avec succès'
      })
    },
    remoteMethod (query) {
            // alert(query)
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.fileList = this.$store.getters['$_lms/currentCourse'].files.filter(item => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.fileList = this.$store.getters['$_lms/currentCourse'].files
      }
    }
  },
  computed: {
  }
}
</script>

<style scoped>
.el-input {
    margin-bottom: 20px;
}
.image-uploader .el-upload, .video-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    width: 99.5%;
    overflow: hidden;
}
.el-upload {
    display: block;
    width: 100%;
}
.el-upload-dragger {
    width:100%;
    min-height: 280px;
}
</style>
