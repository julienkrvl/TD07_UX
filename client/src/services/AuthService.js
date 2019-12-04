import Api from '@/services/Api'

export default {
  register (params) {
    return Api().post('users/register', params)
  },

  login (params) {
    return Api().post('users/authenticate', params)
  },

  fetchProfile () {
    return Api().post('users/profile')
  },

  saveProfile (params) {
    return Api().put('users/profile/save', params)
  },

  getUser (params) {
    return Api().get('users/' + params.id)
  }
}
