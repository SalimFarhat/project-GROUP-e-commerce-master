const express = require('express');
let router = express.Router();

const {
    handleGetItems, handleGetItem, 
    handleGetItemsCategories, handleGetItemsBodyLocations,
    handleGetCompanies, handleGetCompany, 
    handleUpdateItemsQuantity
} = require("../Handlers/handlers")

router.get('/getItems', handleGetItems);

router.get('/getItem/:itemId', handleGetItem);

router.get('/getItemsCategories', handleGetItemsCategories);

router.get('/getItemsBodyLocations', handleGetItemsBodyLocations);

router.get('/getCompanies', handleGetCompanies);

router.get('/getCompany', handleGetCompany);

router.post('/updateItems', handleUpdateItemsQuantity)

//Default Route to catch them all
router.get('*', (req,res) => {
    res.status(404).json({
        status: 404,
        message: "there is nothing here"
    })
})

module.exports = router ;