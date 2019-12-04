<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-sm-6" v-for="list in lists" :key="list.id" >
        <b-card :title="list.productName.split('',charLimit2).join('')"
                :img-src="'http://localhost:8081/' + list.imagePath"
                :img-alt="list.productName"
                img-top
                tag="article"
                style="max-width: 30rem;"
                class="mb-5">
          <p class="card-text">
            <del class="text-danger">{{ list.oldPrice }} €</del> - <span class="text-success font-weight-bold">{{ list.newPrice }} €</span>
          </p>
          <p class="card-text">
            {{ list.description.split('',charLimit).join('') + '...' }}
          </p>
          <div v-if="verify(list._id)">
            <b-button v-if="role == 'tester'" @click="openProductModal(list)" class="col-md-10 offset-md-1" block variant="success">Get for <span class="font-weight-bold">{{ list.newPrice }} €</span></b-button>
          </div>
          <div v-else>
            <b-button disabled v-if="role == 'tester'" @click="openProductModal(list)" class="col-md-10 offset-md-1" block variant="secondary">Get for <span class="font-weight-bold">{{ list.newPrice }} €</span></b-button>
          </div>
        </b-card>
      </div>
    </div>
    <b-modal ref="GetProductModal" id="GetProductModal" title="I want to test this product !" hide-footer>
    <GetProduct v-on:childToParent="onChildClick" :product="product" ></GetProduct>
    </b-modal>
  </div>
</template>

<script>
import GetProduct from './modals/GetProduct.vue'
import AuthService from '@/services/AuthService'
import ProductsService from '@/services/ProductsService'
export default {
  name: 'Products',
  components: {
    GetProduct
  },
  data: function () {
    return {
      lists: [],
      reviews: [],
      charLimit: 100,
      charLimit2: 50,
      product: {},
      role: ''
    }
  },
  created () {
    if (!(localStorage.getItem('t'))) {
      this.$router.push({name: 'Login'})
    } else {
      this.role = localStorage.getItem('role')
    }
  },
  mounted () {
    this.getProducts()
    this.getProfile()
  },
  methods: {
    async getProducts () {
      let response = await ProductsService.getProducts({
        categorie: this.$route.params.categorie
      })
      this.lists = response.data.products
    },
    async getProfile () {
      let response = await AuthService.fetchProfile()
      this.reviews = response.data.reviews
    },
    openProductModal: function (product) {
      this.product = Object.assign({}, product, {
        id: product._id,
        categorie: product.categorie,
        description: product.description,
        imagePath: product.imagePath,
        newPrice: product.newPrice,
        oldPrice: product.oldPrice,
        productName: product.productName
      })
      this.$refs.GetProductModal.show()
    },
    onChildClick (value) {
      this.reviews.push(value)
      this.$refs.GetProductModal.hide()
    },
    verify (id) {
      let bool = true
      for (var i = 0; i < this.reviews.length; i++) {
        if (this.reviews[i].productId === id) {
          bool = false
        }
      }
      return bool
    }
  }
}
</script>

<style lang="css">
</style>
