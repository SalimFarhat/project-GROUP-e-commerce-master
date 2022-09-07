/**
 * @author Frederic Brockow
 * 
 * module for all the configurations and constante values
 * associated with connecting to the database
 */

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const DB_NAME = "WearAbleTech";
const COMPANIES_COLLECTION = "companies";
const ITEMS_COLLECTION = "items";

const DEFAULT_MAX_NUMBER_ITEMS_PER_PAGE = 25;

const getNewClient = () => {
    return new MongoClient(MONGO_URI, options);
}

module.exports = {
    DB_NAME, COMPANIES_COLLECTION, ITEMS_COLLECTION,
    DEFAULT_MAX_NUMBER_ITEMS_PER_PAGE,
    getNewClient
}