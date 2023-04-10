export const ADD_TO_CART = (item) => {
    return {
        type: 'ADD_TO_CART',
        payload: item
    }
}

export const REMOVE_FROM_CART = (id) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: id
    }
}

export const QUANTITY_DECREMENT = (item) => {
    return {
        type: 'QUANTITY_DECREMENT',
        payload: item
    }
}

export const CLEAR_CART = () => {
    return {
        type: 'CLEAR_CART',
    }
}

export default ADD_TO_CART