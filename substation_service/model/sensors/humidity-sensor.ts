import { Sensor } from "../sensor";
import { IdGenerator } from "../../utils/id-gen"; 
import { ValueGenerator } from "../../utils/value-gen"; 
import { ValueBoundary } from "../value-boundary";

export class HumiditySensor implements Sensor{

    id: string;
    name: string;
    interval: number;
    valueBoundaries: ValueBoundary;

    constructor(name:string, interval:number, boundaries: ValueBoundary){
        this.id = IdGenerator.generateId();
        this.name = name;
        this.interval = interval;
        this.valueBoundaries = boundaries
    }

    //implement random gen 
    measure(): string{
        return ValueGenerator.generateValue(this.valueBoundaries);
    }
}