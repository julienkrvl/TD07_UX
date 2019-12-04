<template>
  <div class="container">
    <h1>Register:</h1>
    <b-form>
      <b-alert show v-if="error" variant="danger">{{ msg }}</b-alert>
      <b-form-radio-group class="pt-2 pb-2" v-model="form.civility" :options="foods" required />
      <b-form-group id="exampleInputGroup1"
                    label="Email address:"
                    label-for="exampleInput1"
                    description="We'll never share your email with anyone else.">
        <b-form-input id="exampleInput1"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Your Username:"
                    label-for="exampleInput2"
                    description="This Username will be viewable by others Users">
        <b-form-input id="exampleInput2"
                      type="text"
                      v-model="form.username"
                      required
                      placeholder="Enter Username">
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
      <b-form-group id="exampleInputGroup3"
                    label="You are :"
                    label-for="exampleInput3">
        <b-form-select id="exampleInput3"
                      :options="foods_role"
                      required
                      v-model="form.role">
        </b-form-select>
      </b-form-group>
      <b-form-group id="exampleGroup4">
        <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
          <b-form-checkbox value="me">I accept CGU</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button variant="primary" @click="register">Submit</b-button>
      <b-button type="reset" variant="danger" @click="onReset">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
  name: 'Register',
  data () {
    return {
      form: {
        civility: null,
        email: '',
        username: '',
        password: '',
        role: null,
        checked: []
      },
      foods_role: [
        { text: 'Select One', value: null, disabled: true },
        { text: 'Tester', value: 'tester' },
        { text: 'Seller', value: 'seller' }
      ],
      foods: [
        { text: 'Mr', value: 'mr' },
        { text: 'Ms', value: 'ms' }
      ],
      show: true,
      error: false,
      msg: ''
    }
  },
  created () {
    if (localStorage.getItem('t')) {
      this.$router.push({name: 'Hello'})
    }
  },
  methods: {
    async register () {
      const response = await AuthService.register({
        civility: this.form.civility,
        email: this.form.email,
        username: this.form.username,
        password: this.form.password,
        role: this.form.role
      })
      if (response.data.success === false) {
        this.msg = response.data.msg
        this.error = true
      } else {
        this.$router.push({name: 'Login', params: {success: response.data.success, msg: response.data.msg}})
      }
    },
    onsubmit (evt) {
      evt.preventDefault()
      this.register()
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.civility = null
      this.form.email = ''
      this.form.username = ''
      this.form.password = ''
      this.form.role = null
      this.form.checked = []
      this.error = false
      this.msg = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    }
  }
}
</script>
