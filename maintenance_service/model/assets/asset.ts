import { IdGenerator } from "../../utils/id-gen";

export class Asset{

    id: string;
    type: string;

    constructor(type: string){
        this.id = IdGenerator.generateId();
        this.type = type;
    }
}