<template>
 <div>
   <form class="login" @submit.prevent="login()">
     <h1>Sign in</h1>
     <label>User name</label>
     <input required v-model="username" type="text" placeholder="Snoopy"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <button type="submit">Login</button>
   </form>
 </div>
</template>

<script>
  export default {
    components: {
    },
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login () {
        const { username, password } = this
        this.$store.dispatch('AuthRequest', { username, password })
            .then(() => {
              this.$router.push('/')
            })
      }
    }
  }
</script>

<style>

</style>
