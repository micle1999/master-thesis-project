import { Asset } from "./asset";

export class SensorDataAsset extends Asset{

    sensorId: string;
    sensorType: string;
    ringId: string;
    traceId: string;
    payload: string;
    timestamp: string;
    brokerId: string;

    constructor(sensorId: string, 
                sensorType: string,
                ringId: string, 
                traceId: string,
                payload: string,
                timestamp: string,
                brokerId: string
                ){
        super('SensorData'); // create enum
        this.sensorId = sensorId;
        this.sensorType = sensorType;
        this.ringId = ringId;
        this.traceId = traceId;
        this.payload = payload;
        this.timestamp = timestamp;
        this.brokerId = brokerId;
    }    
}