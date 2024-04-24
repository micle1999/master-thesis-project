import { IdGenerator } from "../utils/id-gen";
import { ValueGenerator } from "../utils/value-gen";
import { ValueBoundary } from "./value-boundary";

export class Sensor{
    
    id: string;
    substationId: string;
    type: string;
    locationId: string;
    name: string;
    interval: number;
    valueBoundaries: ValueBoundary

    constructor(type:string, substationId:string, locationId:string, name:string, interval:number, boundaries: ValueBoundary){
        this.id = IdGenerator.generateId();
        this.type = type;
        this.substationId = substationId;
        this.locationId = locationId;
        this.name = name;
        this.interval = interval;
        this.valueBoundaries = boundaries
    }

    measure(): string {
        return ValueGenerator.generateValue(this.valueBoundaries);
    }
}