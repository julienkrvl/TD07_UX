<template>
  <div class="hello">
    <b-alert show v-if="success" dismissible variant="success">{{ msg }}</b-alert>
    <p v-if="connected">Hi {{ username }} !</p>
    <b-button v-if="connected" variant="primary" @click="logout">Logout</b-button>
    <h1>{{ messesge }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      messesge: 'Welcome to Your Vue.js App',
      success: false,
      connected: false
    }
  },
  mounted () {
    this.getStatus()
    this.getLocalStorage()
  },
  methods: {
    async getStatus () {
      this.msg = this.$route.params.msg
      this.success = this.$route.params.success
    },
    async getLocalStorage () {
      if (localStorage.getItem('t')) {
        this.username = localStorage.getItem('username')
        this.connected = true
      }
    },
    async logout () {
      localStorage.removeItem('username')
      localStorage.removeItem('t')
      localStorage.removeItem('role')
      this.$router.go({name: 'Hello', params: {success: true, msg: 'Logout successfuly'}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
