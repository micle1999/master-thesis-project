import {Kafka, Consumer} from 'kafkajs'
import {KafkaUtils} from './utils/kafka-utils'

export class ConsumerService{

    kafka: Kafka;
    consumer: Consumer;

    constructor(){
        this.kafka = new Kafka({
            clientId: 'test-consumer',
            brokers: ['0.0.0.0:29092']
        })    
        this.consumer = this.kafka.consumer({ groupId: 'test-group' });
    }

    async setupConsumer(){
        await this.consumer.subscribe({topics: KafkaUtils.topics , fromBeginning: false});
        await this.consumer.connect();
    }

    async run(){
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
              const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
              console.log(`- ${prefix} ${message.key}#${message.value}`)
            },
        })
    }

    async destroyConsumer(){
        this.consumer.disconnect();
    }
}