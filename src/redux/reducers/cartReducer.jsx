const INIT_STATE = {
    cart: []
}

export const cartReducer = (state=INIT_STATE, action) => {

    switch (action.type) {

        case 'ADD_TO_CART' : 
            const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id)
            if (itemIndex >= 0) {
                state.cart[itemIndex].stock +=1
                return {
                    ...state,
                    cart: [...state.cart]
                }
            } else {
                const temp = {...action.payload, stock: 1}
                return {
                    ...state,
                    cart: [...state.cart, temp]
                }
            }
        
        case 'REMOVE_FROM_CART' :
            const data = state.cart.filter((e)=> e.id !== action.payload)
            return {
                ...state,
                cart: data
            }
        
        case 'QUANTITY_DECREMENT' :
            const itemIndex_Dec = state.cart.findIndex((item) => item.id === action.payload.id)
            if (state.cart[itemIndex_Dec].stock > 1) {
                const deleteItem = state.cart[itemIndex_Dec].stock -= 1

                return {
                    ...state,
                    cart: [...state.cart]
                }
            }
        
        case 'CLEAR_CART' :
            return {
                cart: []
            }
        
        default : return state
    }

}