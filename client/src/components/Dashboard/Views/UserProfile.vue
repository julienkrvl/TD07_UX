<template lang="html">
  <div class="container">
    <b-card bg-variant="light">
    <b-form-group breakpoint="lg"
                  label="User's Profile"
                  label-size="lg"
                  label-class="font-weight-bold pt-0"
                  class="mb-0">
      <div class="row mt-3">
        <div class="col-md-6">
          <b-form-group horizontal
                        label="Civility:"
                        label-class="text-sm-right"
                        class="mb-0">
            <b-form-radio-group disabled class="pt-2" v-model="user.civility" :options="foods" />
          </b-form-group>
        <b-form-group horizontal
                      label="Username:"
                      label-class="text-sm-right"
                      label-for="nestedStreet">
          <b-form-input id="nestedStreet" v-model="user.username" disabled></b-form-input>
        </b-form-group>
        <b-form-group horizontal
                      label="Email:"
                      label-class="text-sm-right"
                      label-for="nestedStreet">
          <b-form-input type="email" id="nestedStreet" v-model="user.email" disabled></b-form-input>
        </b-form-group>
        <b-form-group horizontal
                      label="Date of bird:"
                      label-class="text-sm-right"
                      label-for="nestedCity">
          <b-form-input type="date" id="nestedCity" v-model="user.bird"></b-form-input>
        </b-form-group>
        <b-form-group horizontal
                      label="Facebook:"
                      label-class="text-sm-right"
                      label-for="nestedState">
          <b-form-input id="nestedState"
                        placeholder="https://www.facebook.com/YourFacebook" v-model="user.facebook"></b-form-input>
        </b-form-group>
        <b-form-group horizontal
                      label="Paypal email :"
                      label-class="text-sm-right"
                      label-for="nestedState2">
          <b-form-input id="nestedState2"
                        placeholder="YourPaypalEmail@mail.fr" v-model="user.paypal"></b-form-input>
        </b-form-group>
        <b-form-group horizontal
                      label="Country:"
                      label-class="text-sm-right"
                      label-for="nestedCountry">
          <b-form-input id="nestedCountry"
                        placeholder="Your Country" v-model="user.country"></b-form-input>
        </b-form-group>
      </div>
      <div class="col-md-6">
      <h3>Marketplace:</h3>
      <div v-for="marketplace in user.marketplaces" :key="marketplace.id" class="col-md-12 mb-2">
        {{marketplace.marketplaceName}} account : <a href="#">{{ marketplace.marketplaceUrl }}</a> <b-badge @click="deleteMarketplace(marketplace._id)" href="#" variant="danger">Delete</b-badge>
      </div>
      <a class="text-success" v-b-modal.AddMarketplace href="#">Add Marketplace</a>
      </div>
      </div>
      <b-button @click="save" variant="success">Save</b-button>
    </b-form-group>
  </b-card>
  <b-modal ref="AddMarketplace" id="AddMarketplace" title="Add Marketplace" hide-footer>
    <AddMarketplace v-on:childToParent="onChildClick"></AddMarketplace>
  </b-modal>
</div>
</template>

<script>
import MarketplaceService from '@/services/MarketplaceService'
import AddMarketplace from './modals/AddMarketplace.vue'
import AuthService from '@/services/AuthService'
export default {
  name: 'UserProfile',
  components: {
    AddMarketplace
  },
  data () {
    return {
      user: {
        civility: null,
        username: '',
        email: '',
        bird: '',
        facebook: '',
        paypal: '',
        country: '',
        marketplaces: []
      },
      foods: [
        { text: 'Mr', value: 'mr' },
        { text: 'Ms', value: 'ms' }
      ]
    }
  },
  created () {
    if (!(localStorage.getItem('t'))) {
      this.$router.push({name: 'Login'})
    }
  },
  mounted () {
    this.getProfile()
  },
  methods: {
    async getProfile () {
      const response = await AuthService.fetchProfile()
      this.user.civility = response.data.civility
      this.user.username = response.data.username
      this.user.email = response.data.email
      this.user.bird = response.data.bird
      this.user.facebook = response.data.facebook
      this.user.paypal = response.data.paypal
      this.user.country = response.data.country
      this.user.marketplaces = response.data.marketplaces
    },
    async findAndRemove (array, property, value) {
      array.forEach(function (result, index) {
        if (result[property] === value) {
          // Remove from array
          array.splice(index, 1)
        }
      })
    },
    async save () {
      await AuthService.saveProfile({
        bird: this.user.bird,
        facebook: this.user.facebook,
        paypal: this.user.paypal,
        country: this.user.country
      })
    },
    async deleteMarketplace (id) {
      await MarketplaceService.deleteMarketplace(id)
      this.findAndRemove(this.user.marketplaces, '_id', id)
    },
    onChildClick (value) {
      this.user.marketplaces.push(value)
      this.$refs.AddMarketplace.hide()
    }
  }
}
</script>

<style lang="css">
</style>
