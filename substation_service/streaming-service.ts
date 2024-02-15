import { Kafka, Producer } from 'kafkajs'
import { SensorData } from './model/sensor-data';

export class StreamingService{
    
    kafka:Kafka;
    producer:Producer;
    
    constructor(brokerUri: string){
      this.kafka = new Kafka({
        clientId: 'test-app2', //generate client id for node
        brokers: [brokerUri] // why we need array of string ? (for different clusters?)
    })    
      this.producer = this.kafka.producer();
    }
    
    async setupProducer(){
      await this.producer.connect()    
    }

    async destroyProducer(){
      await this.producer.disconnect();
    }
    
    async sendSensorData(topic: string, data:SensorData){
      this.producer.send({
        topic: topic,
        messages: [
          {value: JSON.stringify({
            sensorId: data.sensorId,
            sensorType: data.sensorType,
            traceId: data.traceId,
            ringId: data.ringId,
            payload: data.payload,
            timestamp: data.timestamp
          })}
        ]
      })
    }
}


