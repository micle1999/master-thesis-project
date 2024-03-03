import { Connection, Ed25519Keypair, Transaction, TransactionOperations } from 'bigchaindb-driver';
import { BigchainUtils } from '../utils/bigchain-utils';
import { Asset } from '../model/assets/asset';
const driver = require('bigchaindb-driver')

export class BigchainService{

    connection: Connection;
    keypair: Ed25519Keypair;

    constructor(){
        //this.connection = new driver.Connection(BigchainUtils.BIGCHAIN_API_PATH, {
        //    app_id: BigchainUtils.APP_ID,
        //    app_key: BigchainUtils.APP_KEY
        //})
        
        this.keypair = new Ed25519Keypair()//BigchainUtils.generateKeypair();
        this.connection =  new Connection(BigchainUtils.BIGCHAIN_API_PATH)
    }

    createTransaction(transactionData: Asset){
        
        const transaction = driver.Transaction.makeCreateTransaction(
            transactionData,
            null, //define metadata for transaction
            // A transaction needs an output
            [ Transaction.makeOutput(
                    Transaction.makeEd25519Condition(this.keypair.publicKey))
            ],
            this.keypair.publicKey
        );
        
        const signedTransaction = driver.Transaction.signTransaction(transaction, this.keypair.privateKey)
        this.connection.postTransactionAsync(signedTransaction);
    }
}

