import Vue from 'vue'

const UPDATE_ENTITIES = (state, entities) => {
    // Loop over all kinds of entities we received
    // alert(JSON.stringify(entities))
  for (let type in entities) {
        // alert(type)
    for (let entity in entities[type]) {
            // alert(JSON.stringify(entity))
      var oldObj = state.entities[type][entity] || {}
            // Merge the new data in the old object
      var newObj = Object.assign(oldObj, entities[type][entity])
            // Make sure new entities are also reactive
      Vue.set(state.entities[type], entity, newObj)
            // ex Vue.set(state.entities['courses'], courseObt, newCourseObj)
    }
  }

    // alert(JSON.stringify(entities))
    // Vue.set(state, 'entities', entities)
}

const CART_CLEAR = (state) => {
    state.cart = {}
    state.cartTotal = 0
}

const CART_ITEM_REMOVE = (state, item) => {
    state.cartTotal -= item.count
    Vue.delete(state.cart, item.id)
}

const CART_ITEM_ADD = (state, item) => {
    state.cartTotal++
    if (item.id in state.cart) {
      state.cart[item.id].count++
    } else {
      let stateItem = Object.assign({}, item)
      stateItem.count = 1
      state.cart[item.id] = stateItem
    }
}

const ADD_TO_CART = (state, { id }) {
    
     const record = state.added.find(p => p.id === id)

	    if (!record) {
        state.added.push({
            id,
            quantity: 1
        })
	    } else {
	      record.quantity++
	    }

}

export default {
  ADD_TO_CART,
}
