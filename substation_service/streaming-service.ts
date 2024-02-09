import {Kafka, Producer} from 'kafkajs'
import { SensorData } from './model/sensor-data';

export class StreamingService{
    
    kafka:Kafka;
    producer:Producer;
    
    constructor(){
      this.kafka = new Kafka({
        clientId: 'test-app2',
        brokers: ['0.0.0.0:29092']
    })    
      this.producer = this.kafka.producer();
    }
    
    async setupProducer(){
      await this.producer.connect()    
      await this.producer.send({
          topic: 'test-topic',
          messages: [
            { value: 'Hello KafkaJS user!' },
          ],
        })
    }

    async destroyProducer(){
      await this.producer.disconnect();
    }
    
    async sendSensorData(data:SensorData){
      this.producer.send({
        topic: 'sensors',
        messages: [
          {value: data.timestamp.toString()}
        ]
      })
    }
}


