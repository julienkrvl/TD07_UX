<template>
    <div class="container">
      <b-form>
        <p>Name : {{ product.productName }} | Category : {{ product.categorie }}</p>
        <p></p>
        <p>Description :</p>
        <p> {{ product.description }} </p>
        <p>Price : {{ product.newPrice }} €</p>
        <p>
          <b-button @click="comment == false ? comment = true : comment = false">Say somethink to the seller</b-button>
        </p>
        <b-form-textarea v-show="comment" id="textarea1"
                         class="mb-3"
                         v-model="text"
                         placeholder="Comment if you have somethink to say to the seller ..."
                         :rows="3"
                         :max-rows="6">
        </b-form-textarea>
        <b-form-group id="exampleGroup4">
          <b-form-checkbox-group id="exampleChecks">
            <b-form-checkbox value="me">I accept conditions</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button @click="addReview" variant="primary">I want review it !</b-button>
      </b-form>
    </div>
</template>

<script>
import ReviewsService from '@/services/ReviewsService'
export default {
  name: 'GetProduct',
  props: {
    product: {
      type: Object,
      default: function () {
        return {
          id: -1,
          categorie: '',
          description: '',
          imagePath: '',
          newPrice: '',
          oldPrice: '',
          productName: ''
        }
      }
    }
  },
  data () {
    return {
      text: '',
      comment: false
    }
  },
  methods: {
    async addReview () {
      let response = await ReviewsService.addReview({
        productId: this.product.id,
        comment: this.text
      })
      if (response.data.success === true) {
        let value = { _id: response.data.id, productId: this.product.id }
        this.text = ''
        this.comment = false
        this.$emit('childToParent', value)
      } else {
        alert('Fill your paypal before')
      }
    }
  }
}
</script>

<style lang="css">
</style>
