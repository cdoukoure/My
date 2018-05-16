<template>
    <el-card>
        <div class="image">
            <img :src="profile.backgroundImage" alt="...">
        </div>
        <div class="card-body">
            <div class="author">
                <a href="#">
                    <img class="avatar border-gray" :src="profile.avatar" alt="...">
                    <h5 class="title">{{ profile.firstName }} {{ profile.lastName }}</h5>
                </a>
                <p class="description">
                    {{ username }}
                </p>
            </div>
            <p class="description text-center">
            {{ profile.aboutMe }}
            </p>
        </div>
        <hr>
        <div class="button-container">
            <el-button type="text" v-for="(socialLink ,index) in profile.socialLinks" :key="id"><i class="fab fa-twitter"></i></el-button>
        </div>
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
.image {
    overflow: hidden;
    height: 120px;
    position: relative;
}
.card-body {
    min-height: 240px;
    padding: 15px 15px 10px 15px;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
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
    margin-bottom: 6px;
    text-align: center;
}
.el-card hr {
    margin: 5px 15px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top-width: 0px;
    border-top-style: none;
    border-top-color: currentcolor;
    border-top: 1px solid rgba(0,0,0,.1);
    box-sizing: content-box;
    height: 0;
    overflow: visible;
}
</style>
