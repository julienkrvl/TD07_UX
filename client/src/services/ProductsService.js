import Api from '@/services/Api'

export default {
  fetchProducts () {
    return Api().get('products')
  },

  getProducts (params) {
    return Api().get('products/available/' + params.categorie)
  },

  getOneProduct (params) {
    return Api().get('products/get/' + params.id)
  },

  updateQuantity (params) {
    return Api().put('products/quantity/' + params.id, params)
  }
}
