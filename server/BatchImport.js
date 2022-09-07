const items = require("./data/items.json");
const companies = require("./data/companies.json");

const {MongoClient} = require("mongodb")

require("dotenv").config();
const { MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect();
        console.log("connected")
        const db = client.db("WearAbleTech");
        const result1 = await db.collection("items").insertMany(items);
        const result2 = await db.collection("companies").insertMany(companies);
        console.log(result1);
        console.log(result2);

    }catch(err){
        console.log(err);
    }
    client.close();
    console.log("disconnected!")
}

batchImport();