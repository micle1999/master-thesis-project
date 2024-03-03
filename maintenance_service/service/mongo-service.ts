import {MongoUtils} from "../utils/mongo-utils"
import * as mongoDB from "mongodb";

export class MongoService{

    client: mongoDB.MongoClient;
    db: mongoDB.Db;
    sensorCollection: mongoDB.Collection;

    constructor(){
        this.client = new mongoDB.MongoClient(MongoUtils.DB_CONN_STRING)
    }

    async run(){
        await this.client.connect();
        this.db = this.client.db(MongoUtils.DB_NAME);
        this.sensorCollection = this.db.collection(MongoUtils.SENSOR_COLLECTION_NAME)
    }

    //db logic

}
