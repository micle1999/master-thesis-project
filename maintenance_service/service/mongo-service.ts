import { MaintenanceLog } from "../model/assets/maintenance-log-asset";
import { SensorLog } from "../model/assets/sensor-log-asset";
import {MongoUtils} from "../utils/mongo-utils"
import * as mongoDB from "mongodb";

export class MongoService{

    sensorCollection!: mongoDB.Collection;

    constructor(collection:mongoDB.Collection){
        this.sensorCollection = collection;
    }

    //filter mod -> add filtering based on type? (asset type)
    async getSensorLogs(sensorId: string) : Promise<SensorLog[]>{
        return this.sensorCollection.find({"data.type": "SensorData","data.sensorId": sensorId})
                .project({ data: 1, _id: 0 })
                .toArray() as Promise<SensorLog[]>;
    }

    //filter mod -> add filtering based on type? (asset type)
    async getSensorTimestampLogs(sensorId: string, timestamp: number) : Promise<SensorLog[]>{
        return this.sensorCollection.find({"data.type": "SensorData","data.sensorId": sensorId, "data.timestamp":{$gte: timestamp}})
                .project({ data: 1, _id: 0 })
                .toArray() as Promise<SensorLog[]>;
    }

    //filter mod -> add filtering based on type? (asset type)
    async getSensorLogsFromLocation(locationId: string) : Promise<SensorLog[]>{
        return this.sensorCollection.find({"data.type": "SensorData","data.locationId": locationId})
                .project({ data: 1, _id: 0 })
                .toArray() as Promise<SensorLog[]>;
    }

    //filter mod -> add filtering based on type? (asset type)
    async getSensorLogsFromTimestampLocation(locationId: string, timestamp: number)  : Promise<SensorLog[]>{
        return this.sensorCollection.find({"data.type": "SensorData", "data.sensorId": locationId, "data.timestamp":{$gte: timestamp}})
                .project({ data: 1, _id: 0 })
                .toArray() as Promise<SensorLog[]>;
    }

    //filter mod -> add filtering based on type? (asset type)
    async getSensorMaintenanceRecords(sensorId: string) : Promise<MaintenanceLog[]>{
        
        return this.sensorCollection.find({"data.type": "maintenance_log", "data.sensorId": sensorId})
                .project({ data: 1, _id: 0 })
                .toArray() as Promise<MaintenanceLog[]>;
    }
}
