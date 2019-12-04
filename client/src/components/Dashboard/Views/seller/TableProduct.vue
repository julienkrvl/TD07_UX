<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Filter:" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Per page:" class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>
    </b-row>
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
      <template slot="quantity" slot-scope="row">
        <span v-if="inputQuantity !== row.item._id" >
          {{ row.value }}
          <a href="#" @click="displayInput(row.item._id)">
            <font-awesome-icon class="ml-3" icon="pen" />
          </a>
        </span>
        <span v-if="inputQuantity === row.item._id" >
          <input type="number" name="" v-model="row.item.quantity">
          <a href="#" @click="updateQuantity(row.item)">
            <font-awesome-icon class="ml-3" icon="check" />
          </a>
        </span>
      </template>
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button variant="primary" size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Testers
        </b-button>
        <a v-if="row.item.quantity !== 0" href="#" @click="deleteQuantity(row.item)" style="color: red;">
          <font-awesome-icon class="ml-3" icon="trash" />
        </a>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          <TableTesterProduct v-on:decrementQuantity="decrementQuantity" :product="row.item"></TableTesterProduct>
        </b-card>
      </template>
    </b-table>
    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TableTesterProduct from './TableTesterProduct.vue'
import ProductsService from '@/services/ProductsService'
export default {
  name: 'TableProduct',
  components: {
    TableTesterProduct
  },
  data () {
    return {
      fields: [
        { key: 'productName', label: 'Product', sortable: true, sortDirection: 'desc' },
        { key: 'categorie', label: 'Category', sortable: true, 'class': 'text-center' },
        { key: 'quantity', label: 'Quantity', sortable: true, 'class': 'text-center' },
        { key: 'newPrice', label: 'Price', sortable: true, 'class': 'text-center' },
        { key: 'actions', label: 'Actions', sortable: false, 'class': 'text-center' }
      ],
      items: [],
      currentPage: 1,
      perPage: 5,
      totalRows: this.items,
      pageOptions: [ 5, 10, 15 ],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { title: '', content: '' },
      inputQuantity: ''
    }
  },
  created () {
    if (!(localStorage.getItem('t')) || localStorage.getItem('role') !== 'seller') {
      this.$router.push({name: 'Hello'})
    }
  },
  mounted () {
    this.getProducts()
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
    async getProducts () {
      const response = await ProductsService.fetchProducts()
      this.items = response.data.products
    },
    async updateQuantity (item) {
      await ProductsService.updateQuantity({
        id: item._id,
        quantity: item.quantity
      })
      this.inputQuantity = ''
    },
    async deleteQuantity (item) {
      item.quantity = 0
      await ProductsService.updateQuantity({
        id: item._id,
        quantity: 0
      })
    },
    decrementQuantity (value) {
      this.findAndModify(this.items, '_id', value._id, 'quantity', value.quantity - 1)
    },
    async findAndModify (array, property, value, propertyToChange, NewValue) {
      array.forEach(function (result, index) {
        if (result[property] === value) {
          // Remove from array
          result[propertyToChange] = NewValue
        }
      })
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
    },
    displayInput (id) {
      this.inputQuantity = id
    }
  }
}
</script>
