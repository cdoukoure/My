import api from '../_api'

import { normalize, schema } from 'normalizr'

// Define a schema
const productEntity = new schema.Entity('products')

const getProducts = (context) => {

    const myData = [
        {
            id: 1,
            name: 'COBOL 101 vintage',
            description: 'Learn COBOL with this vintage programming book',
            price: 399
        },
        {
            id: 2,
            name: 'Sharp C2719 curved TV',
            description: 'Watch TV like never before with the brand new curved screen technology',
            price: 1995
        },
        {
            id: 3,
            name: 'Remmington X mechanical keyboard',
            description: 'Excellent for gaming and typing, this Remmington X keyboard features tactile, clicky switches for speed and accuracy',
            price: 595
        }
    ] // end myData
  
    var normalizedEntity = normalize(myData, [productEntity])
    context.commit('UPDATE_ENTITIES', normalizedEntity.entities)
}


const addToCart = (context, productId) => {
    context.commit('ADD_TO_CART', {id: productId})
}

export default {
    getProducts,
    addToCart,
}
