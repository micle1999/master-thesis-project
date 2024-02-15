import { TestAssetData } from "../model/assets/test-asset";

export function generateTestAsset(data: TestAssetData){
    return {
        'test-asset': {
                'attr1': data.attr1,
                'attr2': data.attr1,
        }
    }
}