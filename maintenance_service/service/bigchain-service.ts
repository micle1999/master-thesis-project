import { Connection, Ed25519Keypair, Transaction } from 'bigchaindb-driver';
import { BigchainUtils } from '../utils/bigchain-utils';
import { Asset } from '../model/assets/asset';
import { MaintenanceLog } from '../model/assets/maintenance-log-asset';
const driver = require('bigchaindb-driver')

export class BigchainService{

    connection: Connection;
    keypair: Ed25519Keypair;

    constructor(){
        this.keypair = BigchainUtils.generateKeypair();//new Ed25519Keypair()//
    }

    run(){
        this.connection = new Connection(BigchainUtils.BIGCHAIN_API_PATH)
    }

    createMaintenanceTransaction(maintenanceData: MaintenanceLog){
        
        const transaction = driver.Transaction.makeCreateTransaction(
            maintenanceData,
            null, //define metadata for transaction
            // A transaction needs an output
            [ Transaction.makeOutput(
                    Transaction.makeEd25519Condition(this.keypair.publicKey))
            ],
            this.keypair.publicKey
        );
        
        const signedTransaction = driver.Transaction.signTransaction(transaction, this.keypair.privateKey)
        return this.connection.postTransactionAsync(signedTransaction);
    }
}