<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6" v-for="badge in badges">
                <el-row>
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
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
  export default {
    data () {
      return {
        profile: {},
        badges: []
      }
    }
  }
</script>

<style scoped>
</style>
