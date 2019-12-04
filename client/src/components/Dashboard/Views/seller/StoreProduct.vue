<template>
  <div class="container">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <div class="row mb-4">
      <b-input-group id="exampleInputGroup2"
                    class="col-md-4"
                    label="Product:"
                    prepend="Product:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text"
                      v-model="form.productName"
                      required
                      placeholder="Name of the product">
        </b-form-input>
      </b-input-group>
      <b-input-group id="exampleInputGroup2"
                    class="col-md-3"
                    append="€"
                    label="Old Price:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="number"
                      v-model="form.oldPrice"
                      required
                      placeholder="Old price without review">
        </b-form-input>
      </b-input-group>
      <b-input-group id="exampleInputGroup2"
                    class="col-md-3"
                    append="€"
                    label="New Price:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="number"
                      v-model="form.newPrice"
                      required
                      placeholder="New price with review">
        </b-form-input>
      </b-input-group>
      <b-input-group id="exampleInputGroup3"
                    class="col-md-2"
                    prepend="Quantity:"
                    label="Quantity:"
                    label-for="exampleInput3">
        <b-form-input id="exampleInput2"
                      type="number"
                      v-model="form.quantity"
                      required
                      placeholder="">
        </b-form-input>
      </b-input-group>
      </div>
      <div class="row">
        <b-form-group id="exampleInputGroup3"
                      class="col-md-4"
                      label="Marketplace Link:"
                      label-for="exampleInput3">
        <b-form-input id="exampleInput2"
                      type="text"
                      v-model="form.marketplaceLink"
                      required
                      placeholder="Link to your product (to purchase it)">
        </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup3"
                      class="col-md-4"
                      label="Category:"
                      label-for="exampleInput3">
        <b-form-select v-model="form.categorie"
                       :options="categories"
                       required
                       class="mb-3">
        </b-form-select>
        </b-form-group>
        <b-form-group id="exampleInputGroup3"
                      class="col-md-4"
                      label="Picture:"
                      label-for="exampleInput3">
        <b-form-file v-model="form.file"
                     @change="processFile($event)"
                     accept="image/*"
                     placeholder="Picture of your product...">
        </b-form-file>
        </b-form-group>
      </div>
      <b-form-group id="exampleInputGroup2"
                    label="Description:"
                    label-for="exampleInput2">
      <b-form-textarea id="textarea1"
                   v-model="form.description"
                   placeholder="Description of the product"
                   :rows="3"
                   :max-rows="6"
                   required>
      </b-form-textarea>
      </b-form-group>
      <b-form-group id="exampleGroup4">
        <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
          <b-form-checkbox value="me">I accept the conditions</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button  type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'StoreProduct',
  data () {
    return {
      form: {
        productName: '',
        oldPrice: '',
        newPrice: '',
        quantity: '',
        marketplaceLink: '',
        categorie: null,
        file: null,
        description: '',
        checked: []
      },
      categories: [
        { value: null, text: '-- Please select an category --', disabled: true },
        { value: 'high-tech', text: 'High-Tech & Electronics' },
        { value: 'phones', text: 'Phones & Accessories' },
        { value: 'camera-photo', text: 'Camera & Photo' },
        { value: 'video-games', text: 'Video Games' },
        { value: 'beauty-products', text: 'Beauty & Accessories' },
        { value: 'health', text: 'Health & Personal Care' },
        { value: 'home-garden', text: 'Home & Garden' },
        { value: 'books', text: 'Books' },
        { value: 'clothing', text: 'Clothing & Accessories' },
        { value: 'travel-accessories', text: 'Travel Accessories' },
        { value: 'music', text: 'Music & Accessories' },
        { value: 'art', text: 'Art' },
        { value: 'jewelry', text: 'Jewelry' },
        { value: 'baby-products', text: 'Baby Products' },
        { value: 'toys-games', text: 'Toys & Games' },
        { value: 'sport', text: 'Sport & Accessories' },
        { value: 'automotive', text: 'Automotive & Powersports' }
      ],
      show: true
    }
  },
  created () {
    if (!(localStorage.getItem('t')) || localStorage.getItem('role') !== 'seller') {
      this.$router.push({name: 'Hello'})
    }
  },
  methods: {
    async addProduct () {
      var bodyFormData = new FormData()
      bodyFormData.append('image', this.form.file)
      bodyFormData.set('productName', this.form.productName)
      bodyFormData.set('oldPrice', this.form.oldPrice)
      bodyFormData.set('newPrice', this.form.newPrice)
      bodyFormData.set('quantity', this.form.quantity)
      bodyFormData.set('marketplaceLink', this.form.marketplaceLink)
      bodyFormData.set('categorie', this.form.categorie)
      bodyFormData.set('description', this.form.description)
      let config = {
        headers: {
          'Authorization': localStorage.getItem('t'),
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post('http://localhost:8081/products', bodyFormData, config)
        .then(function (response) {
          // handle success
          console.log(response)
        })
        .catch(function (response) {
          // handle error
          console.log(response)
        })
      this.$router.push({ name: 'Hello' })
    },
    processFile (event) {
      this.form.file = event.target.files[0]
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.addProduct()
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.productName = ''
      this.form.oldPrice = ''
      this.form.newPrice = ''
      this.form.quantity = ''
      this.form.marketplaceLink = ''
      this.form.selected = ''
      this.form.file = null
      this.form.description = ''
      this.form.checked = []
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    }
  }
}
</script>
