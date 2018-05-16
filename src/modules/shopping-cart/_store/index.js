import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  entities: {
    products: {},
  },
  added: [],
  cartTotal: 0,
  cart: {},
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
