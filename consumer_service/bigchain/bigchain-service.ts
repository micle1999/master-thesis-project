import driver, { Connection } from 'bigchaindb-driver';
import { BigchainUtils } from '../utils/bigchain-utils';

export class BigchainService{

    connection: Connection;

    constructor(){
        this.connection = new driver.Connection(BigchainUtils.BIGCHAIN_API_PATH, {
            app_id: BigchainUtils.APP_ID,
            app_key: BigchainUtils.APP_KEY
    })
    }
}

