import { MaintenanceLog } from "../model/assets/maintenance-log-asset";
import { SensorLog } from "../model/assets/sensor-log-asset";
import {MongoUtils} from "../utils/mongo-utils"
import * as mongoDB from "mongodb";

export class MongoService{

    client: mongoDB.MongoClient;
    db: mongoDB.Db;
    sensorCollection: mongoDB.Collection;
    maintenanceCollection: mongoDB.Collection;

    constructor(){
        this.client = new mongoDB.MongoClient(MongoUtils.DB_CONN_STRING)
    }

    async run(){
        await this.client.connect();
        this.db = this.client.db(MongoUtils.DB_NAME);
        this.sensorCollection = this.db.collection(MongoUtils.SENSOR_COLLECTION_NAME)
        this.maintenanceCollection = this.db.collection(MongoUtils.MAINTENANCE_COLLECTION_NAME)
    }

    //filter mod -> add filtering based on type? (asset type)
    async getSensorLogs(sensorId: string) : Promise<SensorLog[]>{
        return this.sensorCollection.find({"data.type": "sensor_log","data.sensorId": sensorId})
                .project({ data: 1, _id: 0 })
                .toArray() as Promise<SensorLog[]>;
    }

    //filter mod -> add filtering based on type? (asset type)
    async getSensorTimestampLogs(sensorId: string, timestamp: number) : Promise<SensorLog[]>{
        return this.sensorCollection.find({"data.type": "sensor_log","data.sensorId": sensorId, "data.timestamp":{$gte: timestamp}})
                .project({ data: 1, _id: 0 })
                .toArray() as Promise<SensorLog[]>;
    }

    //filter mod -> add filtering based on type? (asset type)
    async getSensorLogsFromLocation(locationId: string) : Promise<SensorLog[]>{
        return this.sensorCollection.find({"data.type": "sensor_log","data.locationId": locationId})
                .project({ data: 1, _id: 0 })
                .toArray() as Promise<SensorLog[]>;
    }

    //filter mod -> add filtering based on type? (asset type)
    async getSensorLogsFromTimestampLocation(locationId: string, timestamp: number)  : Promise<SensorLog[]>{
        return this.sensorCollection.find({"data.type": "sensor_log", "data.sensorId": locationId, "data.timestamp":{$gte: timestamp}})
                .project({ data: 1, _id: 0 })
                .toArray() as Promise<SensorLog[]>;
    }

    //filter mod -> add filtering based on type? (asset type)
    async getSensorMaintenanceRecords(sensorId: string) : Promise<MaintenanceLog[]>{
        return this.maintenanceCollection.find({"data.type": "maintenance_log", "data.sensorId": sensorId})
                .project({ data: 1, _id: 0 })
                .toArray() as Promise<MaintenanceLog[]>;
    }
}
