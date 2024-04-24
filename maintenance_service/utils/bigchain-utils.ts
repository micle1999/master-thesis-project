import * as driver from 'bigchaindb-driver';
import { writeFileSync } from 'fs';
import { Connection } from 'bigchaindb-driver';

export class BigchainUtils{

    static BIGCHAIN_API_PATH = process.env.DOCKER? process.env.BIGCHAIN_URI : 'http://localhost:9984/api/v1/'; //for single node

    static generateKeypair(): driver.Ed25519Keypair {
        const keypair = new driver.Ed25519Keypair();
        writeFileSync("../keys/" + 'maintenance_service' + ".priv", keypair.privateKey);
        writeFileSync("../keys/" + 'maintenance_service' + ".pub", keypair.publicKey);
        return keypair;
    }
}

export class BigchainInitializer{
    
    static initializeBigchain(){
        return new Connection(BigchainUtils.BIGCHAIN_API_PATH)
    }
}