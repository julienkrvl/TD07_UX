<template>
  <div class="container">
    <p>Link to your product review:
      <b-button :href="review.reviewLink" onclick="window.open(this.href); return false;" variant="success">
        Review
      </b-button>
    </p>
    <p>Purchase Order : {{ review.purchaseOrder }}</p>
    <p>One you have verify the review and the purchase order, pay the tester on his Paypal with his email below</p>
    <b-form>
      <b-form-group horizontal
                    label="Email:"
                    label-class="text-sm-right"
                    label-for="nestedStreet">
        <b-form-input type="email" id="nestedStreet" v-model="tester.paypal" disabled></b-form-input>
      </b-form-group>
      <b-form-group horizontal
                    label="Ammount (€):"
                    label-class="text-sm-right"
                    label-for="nestedStreet">
        <b-form-input type="number" id="nestedStreet" v-model="ammount" disabled></b-form-input>
      </b-form-group>
      <b-input-group size="md" prepend="N° Payment Order:">
        <b-form-input v-model="paypalTransactionNumber" required placeholder="ex : 11V937376F192826P"></b-form-input>
      </b-input-group>
      <b-form-group id="exampleGroup4">
        <b-form-checkbox-group id="exampleChecks">
          <b-form-checkbox value="me">I accept conditions</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button @click="payTeser" variant="primary">I payed the tester</b-button>
    </b-form>
  </div>
</template>

<script>
import ReviewsService from '@/services/ReviewsService'
export default {
  name: 'PayTester',
  props: {
    review: {},
    tester: {},
    product: {}
  },
  data () {
    return {
      paypalTransactionNumber: ''
    }
  },
  computed: {
    ammount: function () {
      return this.product.oldPrice - this.product.newPrice
    }
  },
  methods: {
    async payTeser () {
      await ReviewsService.payTeser({
        productId: this.product._id,
        reviewId: this.review._id,
        paypalTransactionNumber: this.paypalTransactionNumber
      })
      this.paypalTransactionNumber = ''
      this.$emit('payed', this.review)
    }
  }
}
</script>

<style lang="css">
</style>
