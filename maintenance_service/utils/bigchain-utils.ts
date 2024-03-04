import driver from 'bigchaindb-driver';
import { writeFileSync } from 'fs';

export class BigchainUtils{

    static BIGCHAIN_API_PATH = 'http://localhost:9984/api/v1/'; //for single node

    static generateKeypair(): driver.Ed25519Keypair {
        const keypair = new driver.Ed25519Keypair();
        writeFileSync("../keys/" + 'maintenance_service' + ".priv", keypair.privateKey);
        writeFileSync("../keys/" + 'maintenance_service' + ".pub", keypair.publicKey);
        return keypair;
    }
}