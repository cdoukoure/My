<template>
    <el-row v-loading="loading">
        <el-col :span="24">
            <img src="badge.link" :alt="profile.lastName + '-' +badge.title"/>
        </el-col>
        <el-col :span="24">
            <h5>{{ badge.title }}</h5>
        </el-col>
        <el-col :span="24">
            <el-rate
                v-model="badge.value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{badge.value} points">
            </el-rate>
        </el-col>
    </el-row>
</template>

<script>
  export default {
    /*
    props: {
        profile: { default() { return '' } },
        badges: { default() { return {} } }, // Les plus petits apparaissent en premier
    },
    */
    data () {
      return {
        profile: {},
        badges: [],
        loading: true
      }
    },
    created () {},
    mounted () {
      this.loading = false
    }
  }
</script>

<style scoped>
</style>
