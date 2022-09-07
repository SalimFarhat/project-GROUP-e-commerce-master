const {DEFAULT_MAX_NUMBER_ITEMS_PER_PAGE} = require ("../DbCallFunctions/dbInfos.js");

/* Test if the string contains only numbers
*/
const containsOnlyNumbers = (string) => {
    return /^[0-9]+$/.test(string);
}

/**
 * @author Frederic Brockow
 * @param {*} query query that is pass with the api/getItems route 
 * @returns {{pagination}, {queryParam}} 
 * 
 * @queryParam are the search parameters for the find() function 
 * @pagination are the calculated values for skip and limit in order to matach the 
 * the page number and the number of item per pages
 */
const formatQueryForItems = (query) => {
    
    const page = (containsOnlyNumbers(query.page) && parseInt(query.page)) || 1;
    const numberPerPage = (containsOnlyNumbers(query.nbPerPage) && parseInt(query.nbPerPage)) || DEFAULT_MAX_NUMBER_ITEMS_PER_PAGE;

    const category = query.hasOwnProperty("category")&&query.category || "";
    const body_location = query.hasOwnProperty("bodyLocation")&&query.bodyLocation || "";

    queryParam = {}
    if(category !== '') queryParam.category = category;
    if(body_location !== '')queryParam.body_location = body_location;

    return {
        pagination : {
            limit: numberPerPage, 
            skip: (numberPerPage*(page-1))
        },
        queryParam
    }
}

/**
 * @author Frederic Brockow
 * @param {*} item object that has been purchased with the database updated
 * @param {*} quantity quantity bought for that item
 * @returns the updated object with the numInStock updated to mirror the new stock in db after purchase
 */
const formatSuccessObject = (item , quantity) => {
    const resultObject = {...item};
    resultObject.numInStock -= quantity;
    return resultObject;
}

/**
 * @author Frederic Brockow
 *  yeah validation!
 * simple validation :
 *          it has to have a field "quantity" with a value  > 0
 * for item
 *          It has to have a field _id
 *          It has to have a field numInStock
 *          numInStock has to be > 0
 *          
 */
const validatePurchaseItem = (itemObj) => {
    let isValid = true;

    if (!itemObj.hasOwnProperty('quantity')){
        isValid = false;
        return isValid;
    }

    else if (itemObj.quantity <= 0 || typeof itemObj.quantity !== 'number'){
        isValid = false;
        return isValid;
    }

    if (!itemObj.item.hasOwnProperty('_id')){
        isValid = false;
        return isValid;
    
    }else if(typeof itemObj.item._id !== 'number'){
        isValid = false;
        return isValid;
    }

    if (!itemObj.item.hasOwnProperty('numInStock')){
        isValid = false;
        return isValid;
    
    } else if (itemObj.item.numInStock <= 0 || typeof itemObj.item.numInStock !== 'number'  ){
        isValid = false;
        return isValid;
    }

    return isValid;
}


module.exports = {
    formatQueryForItems, formatSuccessObject, validatePurchaseItem
}

