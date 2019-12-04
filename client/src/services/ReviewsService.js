import Api from '@/services/Api'

export default {
  addReview (params) {
    return Api().post('reviews', params)
  },

  fetchReviews () {
    return Api().get('reviews')
  },

  deleteReview (params) {
    return Api().put('reviews/delete', params)
  },

  acceptReview (params) {
    return Api().put('reviews/accept', params)
  },

  declineReview (params) {
    return Api().put('reviews/decline', params)
  },

  purchaseReview (params) {
    return Api().put('reviews/purchase', params)
  },

  productReviewed (params) {
    return Api().put('reviews/reviewed', params)
  },

  payTeser (params) {
    return Api().put('reviews/pay', params)
  }
}
