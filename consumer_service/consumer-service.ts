import { Kafka, Consumer } from 'kafkajs'
import { KafkaUtils } from './utils/kafka-utils'
import { BigchainService } from './bigchain/bigchain-service';
import { SensorDataAsset } from './model/assets/sensor-data-asset';
import { DataVerifier } from './utils/data-verify';
import { IdGenerator } from './utils/id-gen';

export class ConsumerService{

    kafka: Kafka;
    consumer: Consumer;
    bigchain: BigchainService;
    topic: string;
    verifier: DataVerifier;
    consumerId: string;

    constructor(brokerUri:string, bigchainUri: string, topic:string, groupName: string){
        this.consumerId = 'consumer-' + IdGenerator.generateId()
        this.kafka = new Kafka({
            clientId: this.consumerId,
            brokers: [brokerUri] 
        })    
        this.consumer = this.kafka.consumer({ groupId: groupName });
        this.bigchain = new BigchainService(bigchainUri);
        this.verifier = new DataVerifier();
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

                    if(message.headers?.substationId != null && 
                       message.headers?.digest != null && 
                       await this.verifier.verifyData(message.value.toString(), 
                                                      message.headers.digest.toString(), 
                                                      message.headers.substationId.toString())){
                    
                    
                    console.log("DATA CONSUMED FROM KAFKA ON "+ this.consumerId + " : " + message.value.toString());

                    const parsedMessage = JSON.parse(message.value.toString())
                    this.bigchain.createTransaction(new SensorDataAsset(
                                                        parsedMessage.sensorId,
                                                        parsedMessage.substationId,
                                                        parsedMessage.sensorType,
                                                        parsedMessage.locationId,
                                                        parsedMessage.traceId,
                                                        parsedMessage.payload,
                                                        parsedMessage.timestamp));
                }else{
                    console.log("CORRUPTED DATA FROM KAFKA : message digests does not match. ");
                    console.log("MESSAGE DIGEST :" + message.headers.digest.toString());
                }
            
                const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
                console.log(`- ${prefix} ${message.key}#${message.value}`)
              }
            },
        })
    }

    async destroyConsumer(){
        this.consumer.disconnect();
    }
}