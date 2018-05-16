<template>
    <el-card>
    <el-row>
        <el-col>
            <h1>Tableau de board</h1>
        </el-col>
    </el-row>
  <CourseList :courses="courses" />
  </el-card>
</template>

<style scoped>
.el-card {
    padding: 20px;
}
h1 {
    font-size: 2rem;
    margin-top: 10px;
}
</style>

<script>
import { mapGetters } from 'vuex'
import CourseList from './CourseList.vue'

export default {
  name: 'CourseBoard',
  components: {
    CourseList
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      courses: 'courseSet'
    })
    // courses: [],
  },
  created () {
    this.$store.dispatch('getCourses')
  },
  mounted () {
  }
}
</script>
