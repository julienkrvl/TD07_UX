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
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button v-if="row.item.stage === '1_approval'" variant="success" size="sm" @click.stop="acceptReview(row.item)" class="mr-1">
          Accept
        </b-button>
        <b-button v-if="row.item.stage === '1_approval'" variant="danger" size="sm" @click.stop="declineReview(row.item)" class="mr-1">
          Decline
        </b-button>
        <b-btn @click="openTestterProfileModal(row.item)" variant="primary" size="sm">
          Show User
        </b-btn>
        <b-btn v-if="row.item.stage === '4_reviewed'" @click="openPayTesterModal(row.item)" variant="success" size="sm">
          Pay Tester
        </b-btn>
      </template>
    </b-table>
    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>
    <b-modal ref="TesterProfileModal" id="TesterProfileModal" title="User's profile" hide-footer>
      <TesterProfile v-if="tester && review" v-on:accepted="acceptedChild" v-on:declined="declinedChild" :tester="tester" :review="review"></TesterProfile>
    </b-modal>
    <b-modal ref="PayTesterModal" id="PayTesterModal" title="Pay the tester" hide-footer>
      <PayTester v-if="tester && review" v-on:payed="payedChild" :tester="tester" :review="review" :product="product"></PayTester>
    </b-modal>
  </b-container>
</template>

<script>
import TesterProfile from './modals/TesterProfile.vue'
import PayTester from './modals/PayTester.vue'
import ReviewsService from '@/services/ReviewsService'
import AuthService from '@/services/AuthService'
let items = []
export default {
  name: 'TableTesterProduct',
  components: {
    TesterProfile,
    PayTester
  },
  props: {
    product: {}
  },
  data () {
    return {
      fields: [
        { key: 'testerId', label: 'Tester', sortable: true, sortDirection: 'desc' },
        { key: 'stage', label: 'Stage', sortable: true, sortDirection: 'desc' },
        { key: 'actions', label: 'Actions' }
      ],
      items: this.product.reviews,
      currentPage: 1,
      perPage: 5,
      totalRows: items.length,
      pageOptions: [ 5, 10, 15 ],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { title: '', content: '' },
      review: null,
      tester: null
    }
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
    async acceptReview (item) {
      if (this.product.quantity > 0) {
        await ReviewsService.acceptReview({
          reviewId: item._id,
          productId: this.product._id
        })
        this.findAndModify(this.items, '_id', item._id, 'stage', '2_approved')
        this.$emit('decrementQuantity', this.product)
      } else {
        alert('There is no product anymore (quantity = 0), add some before accept reviews')
      }
    },
    async declineReview (item) {
      await ReviewsService.declineReview({
        reviewId: item._id,
        productId: this.product._id
      })
      this.findAndModify(this.items, '_id', item._id, 'stage', '0_cancel')
    },
    async findAndModify (array, property, value, propertyToChange, NewValue) {
      array.forEach(function (result, index) {
        if (result[property] === value) {
          // Remove from array
          result[propertyToChange] = NewValue
        }
      })
    },
    async getUser () {
      let response = await AuthService.getUser({
        id: this.review.testerId
      })
      console.log(response)
      this.tester = response.data
    },
    openTestterProfileModal (item) {
      this.review = item
      this.getUser()
      this.$refs.TesterProfileModal.show()
    },
    openPayTesterModal (item) {
      this.review = item
      this.getUser()
      this.$refs.PayTesterModal.show()
    },
    acceptedChild (item) {
      this.acceptReview(item)
      this.$refs.TesterProfileModal.hide()
    },
    declinedChild (item) {
      this.declineReview(item)
      this.$refs.TesterProfileModal.hide()
    },
    payedChild (item) {
      console.log('test')
      this.findAndModify(this.items, '_id', item._id, 'stage', '5_closed')
      this.$refs.PayTesterModal.hide()
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
