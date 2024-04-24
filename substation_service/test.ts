import { DataSigner } from "./utils/data-sign";
const signer = new DataSigner('substation1');
const data = "test-data";

signer.signData(data).then(signed =>{
    console.log(signed);
});
