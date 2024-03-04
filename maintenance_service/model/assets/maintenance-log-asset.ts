import { Asset } from "./asset";

export class MaintenanceLog extends Asset{

    companyId: string;
    employeeId: string;
    sensorId: string;
    traceId: string;
    payload: string;
    timestamp: string;

    constructor(sensorId: string, 
                companyId: string,
                employeeId: string,
                traceId: string,
                payload: string,
                timestamp: string,
                ){
        super('maintenance_log'); // create enum
        this.companyId = companyId;
        this.employeeId = employeeId;
        this.sensorId = sensorId;
        this.traceId = traceId;
        this.payload = payload;
        this.timestamp = timestamp;
    }    
}