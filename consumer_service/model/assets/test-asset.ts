import { Asset } from "./asset";

export class TestAssetData extends Asset{
    
    attr1: string;
    attr2: string;

    constructor(attr1: string, attr2: string){
        super('TestAsset'); // create enum
        this.attr1 = attr1;
        this.attr2 = attr2;
    }
}