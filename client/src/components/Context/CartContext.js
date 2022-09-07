/***
 * @author Frederic Brockow
 *  Component context fo rthe cart the Cart with dispatcher /reducer
 */

import { createContext, useState, useReducer } from 'react';

export const CartContext = createContext();

const cartReducer = (cartState, action) => {
switch(action.type){
    /* adds an Item to the cart
    *   1  - check if the item is already in the cart, if no -> /2, yes -> / 4
    *   2  - check if the item is in stock -> if no , doesn t add to the cart if yes -> 3
    *   3  - Add a this item to the cart with the passed quantity
    *   4  - update the item already in cart with the new quantity 
    */
    case "add-to-cart":
        const targetItem = cartState.cart.find(element => 
            element.item._id === action.data.item._id
        )
        if(targetItem === undefined) {
            if (action.data.item.numInStock === 0){
                return { ...cartState};
            }else{
                return { ...cartState, cart: [...cartState.cart, { ...action.data, quantity: action.data.quantity }] };
            }
        }
        else if(targetItem){
            targetItem.quantity =  targetItem.quantity + action.data?.quantity;
            return {...cartState}
        }
        break;
    case "remove-from-cart":
        return{
            ...cartState, 
            cart : cartState.cart
                    .filter((c) => {
                        return c.item._id !== action.data.item._id;
                    })
        };
    case "change-item-quantity":
        const targetToUpdate = cartState.cart.find(element => 
            element.item._id === action.data.item._id
        )
        if(targetToUpdate){
            targetToUpdate.quantity = action.data.quantity;

            return {...cartState};
        }
        break;

        default :
        throw new Error ("case not supported");
    }
}

export const CartProvider = ({children}) => {

    /*** OLD NEED TO DELETE */
    // const [cartStatus, setCartStatus] = useState({
    //     "isEmpty": true,
    //     "items": 0
    // });
    
    // const [addedToCart, setAddedToCart] = useState([]);
    
    /** NEW */
    const [ cartState, cartDispatch] = useReducer(cartReducer, {cart:[]});

    return(
        <CartContext.Provider value={{
            // cartStatus, setCartStatus,
            // addedToCart, setAddedToCart,

            cartState, cartDispatch
        }}>
            {children}
        </CartContext.Provider>
    )
}
