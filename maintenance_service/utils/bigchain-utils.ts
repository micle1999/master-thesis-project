import driver from 'bigchaindb-driver';
import { writeFileSync } from 'fs';

export class BigchainUtils{

    static BIGCHAIN_API_PATH = 'http://localhost:9984/api/v1/'; //for single node
    static APP_ID = 'app_id to add';
    static APP_KEY = 'app_key to add';

    static generateKeypair(): driver.Ed25519Keypair {
        const keypair = new driver.Ed25519Keypair();
        writeFileSync("../keys/" + 'service' + ".priv", keypair.privateKey);
        writeFileSync("../keys/" + 'service' + ".pub", keypair.publicKey);
        return keypair;
    }
}