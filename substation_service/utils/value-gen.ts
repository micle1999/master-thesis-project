import { ValueBoundary } from "../model/value-boundary";

export class ValueGenerator{

    static generateValue(boundaries:ValueBoundary): string{
        return (Math.random() * (boundaries.high - boundaries.low) + boundaries.low).toFixed(4);
    }
}