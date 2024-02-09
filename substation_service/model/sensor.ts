import { ValueBoundary } from "./value-boundary";

export interface Sensor{
    
    id: string;
    name: string;
    interval: number;
    valueBoundaries: ValueBoundary

    measure(): string;
}