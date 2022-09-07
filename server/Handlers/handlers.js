
const {formatQueryForItems, formatSuccessObject, validatePurchaseItem } = require("./handlerHelpers");

const {DATA_NOT_FOUND, SUCCESS, DATABASE_GENERIC_ERROR} = require("../DbCallFunctions/errorMessages");

const {
    dbFunctionGetItems, dbFunctionGetItem, dbFunctionGetItemsCategories, dbFunctionGetItemsBodyLocations,
    dbFunctionGetCompanies, dbFunctionGetCompany, dbFunctionUpdateItemsQuantity
}= require("../DbCallFunctions/dbCallFunctions");

const handleGetItems = async (req, res) => {

    // const page = req.query.page || 0;
    // const nbPerPage = req.query.nbPerPage || 0;
    // console.log(page, nbPerPage);
    const query = req.query;
    const formatedQuery = formatQueryForItems(query);

    try{
        const response = await dbFunctionGetItems(formatedQuery);
        res.status(200).json(
            {
                status: 200,
                data: response,
                message: {sucess : SUCCESS}
            }
        )
    }
    catch (err){
        if(err === DATA_NOT_FOUND){
            res.status(404).json(
                {
                    status: 404,
                    data: {},
                    message: {error : err}
                }
            )
        }else{
            res.status(500).json(
                {
                    status: 500,
                    data: {},
                    message: {error : err}
                }
            )
        }
    }
};

const handleGetItem = async (req, res) => {
    const itemId = req.params.itemId;
    
    try{
        if(!(/^[0-9]+$/.test(itemId))){
            res.status(404).json(
                {
                    status: 404,
                    data: {itemId},
                    message: {error : DATA_NOT_FOUND}
                }
            )
            return;
        }
        const response = await dbFunctionGetItem(parseInt(itemId));
        res.status(200).json(
            {
                status: 200,
                data: response,
                message: {sucess : SUCCESS}
            }
        )
    }
    catch (err){
        if(err === DATA_NOT_FOUND){
            res.status(404).json(
                {
                    status: 404,
                    data: {itemId},
                    message: {error : err}
                }
            )
        }else{
            res.status(500).json(
                {
                    status: 500,
                    data: {itemId},
                    message: {error : err}
                }
            )
        }
    }
}

const handleGetItemsCategories = async (req, res) => {
    try{
        const response = await dbFunctionGetItemsCategories();
        res.status(200).json(
            {
                status: 200,
                data: response,
                message: {sucess : SUCCESS}
            }
        )
    }
    catch (err){
        if(err === DATA_NOT_FOUND){
            res.status(404).json(
                {
                    status: 404,
                    data: {},
                    message: {error : err}
                }
            )
        }else{
            res.status(500).json(
                {
                    status: 500,
                    data: {},
                    message: {error : err}
                }
            )
        }
    } 
}

const handleGetItemsBodyLocations = async (req, res) => {
    try{
        const response = await dbFunctionGetItemsBodyLocations();
        res.status(200).json(
            {
                status: 200,
                data: response,
                message: {sucess : SUCCESS}
            }
        )
    }
    catch (err){
        if(err === DATA_NOT_FOUND){
            res.status(404).json(
                {
                    status: 404,
                    data: {},
                    message: {error : err}
                }
            )
        }else{
            res.status(500).json(
                {
                    status: 500,
                    data: {},
                    message: {error : err}
                }
            )
        }
    }
}

const handleGetCompanies = async (req, res) => {

    try{
        const response = await dbFunctionGetCompanies();
        res.status(200).json(
            {
                status: 200,
                data: response,
                message: {sucess : SUCCESS}
            }
        )
    }
    catch (err){
        if(err === DATA_NOT_FOUND){
            res.status(404).json(
                {
                    status: 404,
                    data: {},
                    message: {error : err}
                }
            )
        }else{
            res.status(500).json(
                {
                    status: 500,
                    data: {},
                    message: {error : err}
                }
            )
        }
    }
};

const handleGetCompany = async (req, res) => {
    const companyId = req.query.companyId;
   
    try{
        if(!(/^[0-9]+$/.test(companyId))){
            res.status(404).json(
                {
                    status: 404,
                    data: {companyId},
                    message: {error : DATA_NOT_FOUND}
                }
            )
            return;
        }
        const response = await dbFunctionGetCompany(parseInt(companyId));
        res.status(200).json(
            {
                status: 200,
                data: response,
                message: {sucess : SUCCESS}
            }
        )
    }
    catch (err){
        if(err === DATA_NOT_FOUND){
            res.status(404).json(
                {
                    status: 404,
                    data: {companyId},
                    message: {error : err}
                }
            )
        }else{
            res.status(500).json(
                {
                    status: 500,
                    data: {companyId},
                    message: {error : err}
                }
            )
        }
    }
}

const handleUpdateItemsQuantity = async (req, res) => {

    const arrItemsObj = req.body;
    //check if there is actually datas to update + validation
    
    if ( arrItemsObj.length === 0) {
        res.status(400).json(
            {
                status: 400,
                data: [],
                message: {error: "not items found"}
            }
        )
    }

    const arrSuccessPurchase = [];
    const arrFailPurchase = [];

    const response = {
    statusCode: 0,
    data: {}
    }
    
    try{
        
        for (const itemObject of arrItemsObj){
        
            //validate object before sending anything to db
            if (!validatePurchaseItem(itemObject)){
                throw "invalid data";
            }

            const response = await dbFunctionUpdateItemsQuantity(itemObject);
            
            if(response.lastErrorObject.updatedExisting){
                console.log(response);
                const sucessPurchaseObj = formatSuccessObject(response.value, itemObject.quantity);
                arrSuccessPurchase.push(sucessPurchaseObj);
            }
            else{
                arrFailPurchase.push(itemObject.item)
            }
        }

        res.status(200).json(
            {
                status: 200,
                successPurchase: arrSuccessPurchase,
                failPurchase: arrFailPurchase,
                message: {success: "db updated where possible"}
            }
        )

    }
    catch(err){
        if(err === "invalid data"){
            res.status(400).json(
                {
                    status: 400,
                    data: req.body,
                    message: {error: err}
                }
            )
        }else{
            res.status(500).json(
                {
                    status: 500,
                    data: req.body,
                    message: {error: `internal server ${err}`}
                }
            )
        }
    }
};


module.exports = {
    handleGetItems,
    handleGetItem,
    handleGetItemsCategories,
    handleGetItemsBodyLocations,
    handleGetCompanies,
    handleGetCompany,
    handleUpdateItemsQuantity
}