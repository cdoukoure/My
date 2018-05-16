import find from 'lodash/find'

const	productSet = state => state.entities.products // would need action/mutation if data fetched async

const getNumberOfProducts = state => (state.entities.products) ? state.entities.products.length : 0

const cartProducts = (state) => {

    return state.added.map(({ id, quantity }) => {
    
        const product = state.entities.products.find(p => p.id === id)

        return {
            name: product.name,
            price: product.price,
            quantity
        }
    })
    
}

export default {
  productSet,
  getNumberOfProducts,
  cartProducts,
}
