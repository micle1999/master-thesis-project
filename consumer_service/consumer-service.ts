import {Kafka, Consumer} from 'kafkajs'
import {KafkaUtils} from './utils/kafka-utils'
import { BigchainService } from './bigchain/bigchain-service';
import { TestAssetData } from './model/assets/test-asset';

export class ConsumerService{

    kafka: Kafka;
    consumer: Consumer;
    bigchain: BigchainService;
    topics: string[];

    constructor(clusterUri:string, topics:string[], groupName: string){
        this.kafka = new Kafka({
            clientId: 'test-consumer', //generate clientID
            brokers: [clusterUri] //0.0.0.0:29092
        })    
        this.consumer = this.kafka.consumer({ groupId: groupName });
        this.bigchain = new BigchainService();
        this.topics = topics;
    }

    async setupConsumer(){
        await this.consumer.subscribe({topics: this.topics , fromBeginning: false});
        await this.consumer.connect();
    }

    async run(){
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
              //Implement logic for topics
              this.bigchain.createTransaction(new TestAssetData(message.offset, message.timestamp));
              
              const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
              console.log(`- ${prefix} ${message.key}#${message.value}`)
            },
        })
    }

    async destroyConsumer(){
        this.consumer.disconnect();
    }
}