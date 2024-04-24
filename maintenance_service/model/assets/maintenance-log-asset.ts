import { IdGenerator } from "../../utils/id-gen";
import { Asset } from "./asset";

export class MaintenanceLog extends Asset{
    
    companyId: string;
    employeeId: string;
    sensorId: string;
    substationId: string;
    traceId: string;
    payload: string;
    timestamp: number;

    constructor(companyId: string,
                employeeId: string,
                sensorId: string,
                substationId: string,
                payload: string
                ){
        super('MaintenanceData'); // create enum
        this.companyId = companyId;
        this.employeeId = employeeId;
        this.sensorId = sensorId;
        this.substationId = substationId;
        this.traceId = IdGenerator.generateId();
        this.payload = payload;
        this.timestamp = Date.now();
    }    
}