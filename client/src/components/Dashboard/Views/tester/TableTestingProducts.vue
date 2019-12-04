<template>
  <b-container fluid>
    <!-- Main table element -->
    <b-table show-empty
             stacked="md"
             :items="items"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :sort-direction="sortDirection"
             @filtered="onFiltered">
      <template slot="newPrice" slot-scope="row">{{ row.value }} €</template>
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-btn v-if="row.item.reviews[0].stage === '2_approved'" @click="openPurchaseProductModal(row.item)" variant="success" size="sm" class="mr-1">
          Test it !
        </b-btn>
        <b-btn v-if="row.item.reviews[0].stage === '3_testing'" @click="openReviewProductModal(row.item)" variant="primary" size="sm" class="mr-1">
          Review it !
        </b-btn>
        <b-btn v-if="row.item.reviews[0].stage === '1_approval' || row.item.reviews[0].stage === '2_approved'" @click="deleteReview(row.item)" variant="danger" size="sm" class="mr-1">
          Cancel
        </b-btn>
      </template>
      <template slot="stage" slot-scope="row">
        {{ row.item.reviews[0].stage }}
      </template>
    </b-table>
    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>
    <b-modal ref="PurchaseProductModal" id="PurchaseProductModal" title="Purchase the product" hide-footer>
      <PurchaseProduct v-if="item" v-on:purchased="purchasedChild" :item="item"></PurchaseProduct>
    </b-modal>
    <b-modal ref="ReviewProductModal" id="ReviewProductModal" title="Review the product" hide-footer>
      <ReviewProduct v-if="item2" v-on:reviewed="reviewedChild" :item="item2"></ReviewProduct>
    </b-modal>
  </b-container>
</template>

<script>
import ReviewsService from '@/services/ReviewsService'
import PurchaseProduct from './modals/PurchaseProduct.vue'
import ReviewProduct from './modals/ReviewProduct.vue'
export default {
  name: 'TableTestingProducts',
  components: {
    PurchaseProduct,
    ReviewProduct
  },
  data () {
    return {
      items: [],
      fields: [
        { key: 'productName', label: 'Name', sortable: true, sortDirection: 'desc' },
        { key: 'newPrice', label: 'Price', sortable: true, 'class': 'text-center' },
        { key: 'categorie', label: 'Category', sortable: true, 'class': 'text-center' },
        { key: 'stage', label: 'Stage', sortable: true, 'class': 'text-center' },
        { key: 'actions', label: 'Actions', sortable: false, 'class': 'text-center' }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: this.items,
      pageOptions: [ 5, 10, 15 ],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { title: '', content: '' },
      item: null,
      item2: null
    }
  },
  created () {
    if (!(localStorage.getItem('t')) || localStorage.getItem('role') !== 'tester') {
      this.$router.push({name: 'Hello'})
    }
  },
  mounted () {
    this.getReviews()
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },
  methods: {
    async getReviews () {
      let response = await ReviewsService.fetchReviews()
      console.log(response)
      this.items = response.data.products
    },
    async deleteReview (item) {
      await ReviewsService.deleteReview({
        reviewId: item.reviews[0]._id,
        productId: item._id
      })
      this.findAndRemove(this.items, '_id', item._id)
    },
    async findAndRemove (array, property, value) {
      array.forEach(function (result, index) {
        if (result[property] === value) {
          // Remove from array
          array.splice(index, 1)
        }
      })
    },
    async findAndModify (array, property, value, propertyToChange, NewValue) {
      array.forEach(function (result, index) {
        if (result[property] === value) {
          // Remove from array
          result[propertyToChange] = NewValue
        }
      })
    },
    openPurchaseProductModal (item) {
      this.item = item
      this.$refs.PurchaseProductModal.show()
    },
    openReviewProductModal (item) {
      this.item2 = item
      this.$refs.ReviewProductModal.show()
    },
    purchasedChild (item) {
      this.findAndModify(item.reviews, '_id', item.reviews[0]._id, 'stage', '3_testing')
      this.$refs.PurchaseProductModal.hide()
    },
    reviewedChild (item) {
      this.findAndModify(item.reviews, '_id', item.reviews[0]._id, 'stage', '4_reviewed')
      this.$refs.ReviewProductModal.hide()
    },
    info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
