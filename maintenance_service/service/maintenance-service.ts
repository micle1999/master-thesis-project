//represents maintenance service class called by api class
import { BigchainService } from "./bigchain-service";
import { MongoService } from "./mongo-service";

export class MaintenanceService{
    
    mongo: MongoService;
    bigchain: BigchainService;

    constructor(){

    }

    async run(){
        
    }

    getSensorLogs(sensorId: string, timestamp: string){

    }

    getSensorLogsFromLocation(locationId: string, timestamp: string){

    }
}