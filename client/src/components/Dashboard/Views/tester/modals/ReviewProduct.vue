<template>
    <div class="container">
      <p>Link to the product :
        <b-button :href="item.marketplaceLink" onclick="window.open(this.href); return false;" variant="success">
          Product
        </b-button>
      </p>
      <p>One you have tested the product, review on the product link and fill the review url in the input below</p>
      <b-form>
        <b-input-group size="md" prepend="URL:">
          <b-form-input v-model="reviewLink" required placeholder="ex : https://www.amazon.fr/gp/customer-reviews/..."></b-form-input>
        </b-input-group>
        <b-form-group id="exampleGroup4">
          <b-form-checkbox-group id="exampleChecks">
            <b-form-checkbox value="me">I accept conditions</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button @click="productReviewed" variant="primary">Submit</b-button>
      </b-form>
    </div>
</template>

<script>
import ReviewsService from '@/services/ReviewsService'
export default {
  name: 'ReviewProduct',
  props: {
    item: {}
  },
  data () {
    return {
      reviewLink: ''
    }
  },
  methods: {
    async productReviewed () {
      await ReviewsService.productReviewed({
        productId: this.item._id,
        reviewId: this.item.reviews[0]._id,
        reviewLink: this.reviewLink
      })
      this.reviewLink = ''
      this.$emit('reviewed', this.item)
    }
  }
}
</script>

<style lang="css">
</style>
