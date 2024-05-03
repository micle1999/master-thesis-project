import { MaintenanceLog } from "../model/assets/maintenance-log-asset";
import { SensorLog } from "../model/assets/sensor-log-asset";
import {MongoUtils} from "../utils/mongo-utils"
import * as mongoDB from "mongodb";

export class MongoService{

    sensorCollection!: mongoDB.Collection;

    constructor(collection:mongoDB.Collection){
        this.sensorCollection = collection;
    }

    
    async getSensorLogs(sensorId: string) : Promise<SensorLog[]>{
        return this.sensorCollection.find({"data.type": "SensorData","data.sensorId": sensorId})
                .project({ data: 1, _id: 0 })
                .toArray() as Promise<SensorLog[]>;
    }

    
    async getSensorTimestampLogs(sensorId: string, timestamp: number) : Promise<SensorLog[]>{
        return this.sensorCollection.find({"data.type": "SensorData","data.sensorId": sensorId, "data.timestamp":{$gte: timestamp}})
                .project({ data: 1, _id: 0 })
                .toArray() as Promise<SensorLog[]>;
    }

    
    async getSensorLogsFromLocation(locationId: string) : Promise<SensorLog[]>{
        return this.sensorCollection.find({"data.type": "SensorData","data.locationId": locationId})
                .project({ data: 1, _id: 0 })
                .toArray() as Promise<SensorLog[]>;
    }


    async getSensorLogsFromTimestampLocation(locationId: string, timestamp: number)  : Promise<SensorLog[]>{
        return this.sensorCollection.find({"data.type": "SensorData", "data.sensorId": locationId, "data.timestamp":{$gte: timestamp}})
                .project({ data: 1, _id: 0 })
                .toArray() as Promise<SensorLog[]>;
    }

    
    async getSensorMaintenanceRecords(sensorId: string) : Promise<MaintenanceLog[]>{
        
        return this.sensorCollection.find({"data.type": "MaintenanceData", "data.sensorId": sensorId})
                .project({ data: 1, _id: 0 })
                .toArray() as Promise<MaintenanceLog[]>;
    }
}
