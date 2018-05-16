<template>
    <el-card>
        <el-row>
            <el-col :span="6" v-for="badge in profile.badges">
                <
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
  export default {
    // props: ['username','profile'],
    // name: 'user-card',
    props: {
      username: { default () { return '' } },
      profile: { default () { return {} } }// body data
    }
  }
</script>

<style scoped>
</style>
