<template>
    <router-view></router-view>
</template>

    <!--<div id="app">
        <br/>
        <img class="logo" src="./assets/logo.png"/>
        <!-- <h1>Table Designer</h1> --
        <h1> Time Estimator </h1>
        <br/>
        <el-menu :default-active=1 class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1"><router-link to="/">Hello</router-link></el-menu-item>
            <el-menu-item index="2"><router-link to="/table">Tables</router-link></el-menu-item>
        </el-menu>
        <br/> <br/>
        <div id="content"> --
            <router-view/>
        <!--</div>
        <p>
            Welcome to your Django - Vue.js app!
        </p>
    </div>--
</template>
-->
<script>
export default {
  name: 'app',
  created () {
    /*
    axios.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
            if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                // if you ever get an unauthorized, logout the user
                this.$store.dispatch(AuthLogout)
                // you can also redirect to /login if needed !
            }
            throw err
        })
    })
    */
  }
}
</script>

<style>

body {
    margin: 0;
    color: #2c2c2c;
    font-size: 14px;
    font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;
    -moz-osx-font-smoothing: grayscale;
    /*background-color: #E3E3E3;
    background-color: #ebecf1;*/
    background-color: #F8F8F8;
}


/* @import url("//unpkg.com/element-ui/lib/theme-chalk/index.css") *

html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 100%; *
}

#app {
  color: #2c3e50;
  margin-top: -10px;
  width: 1200px;
  font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
  /* text-align: center; *
}

#app a {
  color: #42b983;
  text-decoration: none;
}

#content {
      background-color:#eee;
      padding:20px 40px;
}

.logo {
  width: 100px;
}
*/
</style>
