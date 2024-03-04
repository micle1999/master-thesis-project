//represents maintenance service class called by api class
import { MaintenanceLog } from "../model/assets/maintenance-log-asset";
import { SensorLog } from "../model/assets/sensor-log-asset";
import { BigchainService } from "./bigchain-service";
import { MongoService } from "./mongo-service";

export class MaintenanceService{
    
    mongo: MongoService;
    bigchain: BigchainService;

    constructor(){
        this.mongo = new MongoService();
        this.bigchain = new BigchainService();
    }

    async run(){
        this.mongo.run();
        this.bigchain.run();
    }

    //called by GET request get data from sensor /{sensorId}
    async getSensorLogs(sensorId: string) : Promise<SensorLog[]>{
        return this.mongo.getSensorLogs(sensorId);
    }

    //called by GET request get data from sensor with defined timestamp forward /{sensorId}/{timestamp}
    async getSensorTimestampLogs(sensorId: string, timestamp: number) : Promise<SensorLog[]>{
        return this.mongo.getSensorTimestampLogs(sensorId, timestamp);
    }

    //called by GET request get data from location /{locationId}
    async getSensorLogsFromLocation(locationId: string) : Promise<SensorLog[]>{
        return this.mongo.getSensorLogsFromLocation(locationId);
    }


    //called by GET request get data from location with defined timestamp forward /{locationId}/{timestamp}
    async getSensorLogsFromTimestampLocation(locationId: string, timestamp: number) : Promise<SensorLog[]>{
        return this.mongo.getSensorLogsFromTimestampLocation(locationId, timestamp);
    }

    //called by POST request add maintenance record
    addMaintenanceRecord(recordData: MaintenanceLog){
        return this.bigchain.createMaintenanceTransaction(recordData);
    }

    async getMaintenanceRecords(sensorId: string) : Promise<MaintenanceLog[]>{
        return this.mongo.getSensorMaintenanceRecords(sensorId);
    }
}