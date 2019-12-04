import Api from '@/services/Api'

export default {
  addMarketplace (params) {
    return Api().post('/marketplaces', params)
  },

  deleteMarketplace (id) {
    return Api().delete('/marketplaces/' + id)
  }
}
