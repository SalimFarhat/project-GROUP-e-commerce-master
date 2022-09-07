/**
 * @author Frederic Brockow
 *  function that take the cart and the item to add to cart 
 *  or to update its quantity in the cart
 *  returns an object with 
 *  @return {{inCart}, {available}}
 *  inCart : quantity for that item already in th eCart
 *  available : quantity still available for purchase( numInStock - inCart)
 */
export const getItemQuantityAvailable =  (cartArr, itemToAdd) => {
    const result = {
        inCart:0, 
        available:0
    };
    const targetItem = cartArr.find(element => 
        element.item._id === itemToAdd._id
    );
    
    if(targetItem === undefined){
        result.available = itemToAdd.numInStock;
    }
    else {
        result.inCart = targetItem.quantity;
        result.available = targetItem.item.numInStock - targetItem.quantity
    }
    return result;

}

