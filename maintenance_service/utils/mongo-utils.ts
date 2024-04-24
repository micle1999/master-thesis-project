import * as mongoDB from "mongodb";

export class MongoUtils{
    
    
    static DB_CONN_STRING=process.env.DOCKER? process.env.MONGO_URI : "mongodb://localhost:27017/"
    static DB_NAME="bigchain"
    static COLLECTION_NAME="assets"
}


export class MongoInitializer{
    
    static async initializeMongo() : Promise<mongoDB.Collection>{
        const client = new mongoDB.MongoClient(MongoUtils.DB_CONN_STRING)
        await client.connect();
        const db = client.db(MongoUtils.DB_NAME);
        return db.collection(MongoUtils.COLLECTION_NAME);
    }
    
}