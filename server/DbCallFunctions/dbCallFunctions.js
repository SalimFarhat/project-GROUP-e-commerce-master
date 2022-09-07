/**
 * @author Frederic Brockow
 * 
 * module for all the functions that calls the database
 * The names are self explaining , and matches each endpoints
 * See SPECIFICATIONS.md for more details
 */


const {DATA_NOT_FOUND, SUCCESS, DATABASE_GENERIC_ERROR} = require("./errorMessages");

const {
    DB_NAME, 
    COMPANIES_COLLECTION, 
    ITEMS_COLLECTION,
    getNewClient } = require("./dbInfos");

const dbFunctionGetItems = async (query) => {
    const { queryParam, pagination} = query;

    // creates a new client
    const client = getNewClient();

    try{  
        // connect to the client
        await client.connect();
    
        // connect to the database (db name is provided as an argument to the function)
        const db = client.db(DB_NAME);
        console.log("connected!");
        
        const count = await await db.collection(ITEMS_COLLECTION)
        .countDocuments({...queryParam });
          
        const response = await db.collection(ITEMS_COLLECTION)
        .find({...queryParam }).limit(pagination.limit).skip(pagination.skip).toArray();

        if (response.length < 1 ){
            throw DATA_NOT_FOUND;
        }
        return {items :response, count};
    }
    catch (err){
        throw err;
    }
    finally{
        // close the connection to the database server
        client.close();
        console.log("disconnected!");
    }
};

const dbFunctionGetItem = async (itemId) =>{
    const client = getNewClient();

    try{  
        // connect to the client
        await client.connect();
    
        // connect to the database (db name is provided as an argument to the function)
        const db = client.db(DB_NAME);
        console.log("connected!");
        
        const response = await db.collection(ITEMS_COLLECTION).findOne({_id:itemId});

        if (response === null ){
            throw DATA_NOT_FOUND;
        }
        return response;
    }
    catch (err){
        throw err;
    }
    finally{
        // close the connection to the database server
        client.close();
        console.log("disconnected!");
    }
}

const dbFunctionGetItemsCategories = async () => {
        // creates a new client
        const client = getNewClient();

        try{  
            // connect to the client
            await client.connect();
        
            // connect to the database (db name is provided as an argument to the function)
            const db = client.db(DB_NAME);
            console.log("connected!");
            
            const response = await db.collection(ITEMS_COLLECTION).distinct("category");
    
            if (response.length < 1 ){
                throw DATA_NOT_FOUND;
            }
            return response;
        }
        catch (err){
            throw err;
        }
        finally{
            // close the connection to the database server
            client.close();
            console.log("disconnected!");
        }
}
const dbFunctionGetItemsBodyLocations = async () => {
    const client = getNewClient();

    try{  
        // connect to the client
        await client.connect();
    
        // connect to the database (db name is provided as an argument to the function)
        const db = client.db(DB_NAME);
        console.log("connected!");
        
        const response = await db.collection(ITEMS_COLLECTION).distinct("body_location");

        if (response.length < 1 ){
            throw DATA_NOT_FOUND;
        }
        return response;
    }
    catch (err){
        throw err;
    }
    finally{
        // close the connection to the database server
        client.close();
        console.log("disconnected!");
    }
}

const dbFunctionGetCompanies = async () => {
    // creates a new client
    const client = getNewClient();

    try{  
        // connect to the client
        await client.connect();
    
        // connect to the database (db name is provided as an argument to the function)
        const db = client.db(DB_NAME);
        console.log("connected!");
        
        const response = await db.collection(COMPANIES_COLLECTION).find().toArray();

        if (response.length < 1 ){
            throw DATA_NOT_FOUND;
        }

        return response;
    }
    catch (err){
        throw err;
    }
    finally{
        // close the connection to the database server
        client.close();
        console.log("disconnected!");
    }
};

const dbFunctionGetCompany = async (companyId) =>{
    const client = getNewClient();

    try{  
        // connect to the client
        await client.connect();
    
        // connect to the database (db name is provided as an argument to the function)
        const db = client.db(DB_NAME);
        console.log("connected!");
        
        const response = await db.collection(COMPANIES_COLLECTION).findOne({_id:companyId});

        if (response === null ){
            throw DATA_NOT_FOUND;
        }
        return response;
    }
    catch (err){
        throw err;
    }
    finally{
        // close the connection to the database server
        client.close();
        console.log("disconnected!");
    }
}

const dbFunctionUpdateItemsQuantity = async (itemObject) => {
    
    const client = getNewClient();

        try{  
            // connect to the client
            await client.connect();
            
            // connect to the database (db name is provided as an argument to the function)
            const db = client.db(DB_NAME);
            console.log("connected!");
            
            const response = await db.collection(ITEMS_COLLECTION)
            .findOneAndUpdate(
                {
                    $and:[
                        {_id: itemObject.item._id},
                        {numInStock:{$gt:itemObject.quantity}}
                    ]
                },
                {$inc: { numInStock:-itemObject.quantity}}
            )

            return response
        }
        catch (err){
           throw err;
        }
        finally{
            // close the connection to the database server
            client.close();
            console.log("disconnected!");
        }

};

module.exports = {
    dbFunctionGetItems, dbFunctionGetItem, 
    dbFunctionGetItemsCategories, dbFunctionGetItemsBodyLocations,
    dbFunctionGetCompanies, dbFunctionGetCompany, 
    dbFunctionUpdateItemsQuantity
};