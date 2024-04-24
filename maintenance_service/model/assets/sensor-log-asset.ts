import { Asset } from "./asset";

export class SensorLog extends Asset{

    sensorId: string;
    substationId: string;
    sensorType: string;
    locationId: string;
    traceId: string;
    payload: string;
    timestamp: number;

    constructor(sensorId: string, 
                substationId: string,
                sensorType: string,
                locationId: string, 
                traceId: string,
                payload: string,
                timestamp: number,
                ){
        super('SensorData'); // create enum
        this.sensorId = sensorId;
        this.substationId = substationId;
        this.sensorType = sensorType;
        this.locationId = locationId;
        this.traceId = traceId;
        this.payload = payload;
        this.timestamp = timestamp;
    }    
}