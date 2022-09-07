
/**
 * @author Frederic Brockow
 * remove the $ from the string, and 
 * parses what remains as a number
 */
const priceParser = (string) => {
      let subString = string.substring(1);

      return parseFloat(subString);
}


/**
 * @author Frederic Brockow
 * Takes the cart as an argument. Iterates through it, and returns the sum
 *  of item.price * quantity
 * */
const calculateTotalFromCart = (cart) => {
      let total = 0;
      const initialValue = 0;
      
      if(cart?.length === 0 || !Array.isArray(cart)) {
            return 0;
      }

      total = cart.reduce(
            function(acc, cartItem) {
                  return acc + (priceParser(cartItem.item.price)*cartItem.quantity);
            }
            , initialValue);
      
            return total.toFixed(2);
}

export {priceParser, calculateTotalFromCart};