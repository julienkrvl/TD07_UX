<template>
  <div class="container">
    <h1>Login:</h1>
    <b-alert show v-if="success" dismissible variant="success">{{ msg }}</b-alert>
    <b-alert show v-if="error" variant="danger">{{ msg }}</b-alert>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="exampleInputGroup1"
                    label="Email address:"
                    label-for="exampleInput1">
        <b-form-input id="exampleInput1"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>
      <b-form-group id="passwordGroup"
                    label="Password:"
                    label-for="password">
        <b-form-input id="password"
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Enter password">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleGroup4">
        <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
          <b-form-checkbox value="me">Keep connected</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: '',
        checked: []
      },
      show: true,
      success: false,
      error: false
    }
  },
  created () {
    if (localStorage.getItem('t')) {
      this.$router.push({name: 'Hello'})
    }
  },
  mounted () {
    this.getStatus()
  },
  methods: {
    async getStatus () {
      this.msg = this.$route.params.msg
      this.success = this.$route.params.success
    },
    async login () {
      const response = await AuthService.login({
        email: this.form.email,
        password: this.form.password
      })
      if (response.data.success === false) {
        this.msg = response.data.msg
        this.error = true
      } else {
        console.log(response) // store jwt
        localStorage.setItem('t', response.data.token)
        localStorage.setItem('username', response.data.user.username)
        localStorage.setItem('role', response.data.user.role)
        this.$router.push({name: 'Hello', params: {success: response.data.success, msg: response.data.msg}})
      }
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.login()
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.email = ''
      this.form.password = ''
      this.form.checked = []
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    }
  }
}
</script>
