import { IdGenerator } from "../utils/id-gen";
import { ValueGenerator } from "../utils/value-gen";
import { ValueBoundary } from "./value-boundary";

export class Sensor{
    
    id: string;
    type: string;
    ringId: string;
    name: string;
    interval: number;
    valueBoundaries: ValueBoundary

    constructor(type:string, ringId:string, name:string, interval:number, boundaries: ValueBoundary){
        this.id = IdGenerator.generateId();
        this.id = type;
        this.ringId = ringId;
        this.name = name;
        this.interval = interval;
        this.valueBoundaries = boundaries
    }

    measure(): string {
        return ValueGenerator.generateValue(this.valueBoundaries);
    }
}