import {Kafka, Consumer} from 'kafkajs'
import {KafkaUtils} from './utils/kafka-utils'
import { BigchainService } from './bigchain/bigchain-service';
import { TestAssetData } from './model/assets/test-asset';
import { SensorDataAsset } from './model/assets/sensor-data-asset';

export class ConsumerService{

    kafka: Kafka;
    consumer: Consumer;
    bigchain: BigchainService;
    topic: string;

    constructor(clusterUri:string, topic:string, groupName: string){
        this.kafka = new Kafka({
            clientId: 'test-consumer', //generate clientID
            brokers: [clusterUri] //0.0.0.0:29092
        })    
        this.consumer = this.kafka.consumer({ groupId: groupName });
        this.bigchain = new BigchainService();
        this.topic = topic;
    }

    async setupConsumer(){
        await this.consumer.subscribe({topics: [this.topic] , fromBeginning: false});
        await this.consumer.connect();
    }

    async run(){
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
              
                //Parse message to object
                if(message.value?.toString() != null){
                    const parsedMessage = JSON.parse(message.value.toString())
                    this.bigchain.createTransaction(new SensorDataAsset(
                                                        parsedMessage.sensorId,
                                                        parsedMessage.sensorType,
                                                        parsedMessage.ringId,
                                                        parsedMessage.traceId,
                                                        parsedMessage.payload,
                                                        parsedMessage.timestamp,
                                                        "brokerId1"));
                    //Get metadata from message (brokerId ?)
                    
                }
            
                const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
                console.log(`- ${prefix} ${message.key}#${message.value}`)
            },
        })
    }

    async destroyConsumer(){
        this.consumer.disconnect();
    }
}