<template>
    <div class="container">
      <p>Link to Purchase the product :
        <b-button :href="item.marketplaceLink" onclick="window.open(this.href); return false;" variant="success">
          Puchase
        </b-button>
      </p>
      <p>One you have purchase the product, fill the Purchase Order input below to get your money back.</p>
      <b-form>
        <b-input-group size="md" prepend="N° Purchase Order:">
          <b-form-input v-model="purchaseOrder" required placeholder="ex : 403-6427762-2282740"></b-form-input>
        </b-input-group>
        <b-form-group id="exampleGroup4">
          <b-form-checkbox-group id="exampleChecks">
            <b-form-checkbox value="me">I accept conditions</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button @click="purchaseReview" variant="success">Submit</b-button>
      </b-form>
    </div>
</template>

<script>
import ReviewsService from '@/services/ReviewsService'
export default {
  name: 'PurchaseProduct',
  props: {
    item: {}
  },
  data () {
    return {
      purchaseOrder: ''
    }
  },
  methods: {
    async purchaseReview () {
      await ReviewsService.purchaseReview({
        productId: this.item._id,
        reviewId: this.item.reviews[0]._id,
        purchaseOrder: this.purchaseOrder
      })
      this.purchaseOrder = ''
      this.$emit('purchased', this.item)
    }
  }
}
</script>

<style lang="css">
</style>
