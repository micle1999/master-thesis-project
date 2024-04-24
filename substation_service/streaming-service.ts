import { Kafka, Producer } from 'kafkajs'
import { SensorData } from './model/sensor-data';
import { DataSigner } from './utils/data-sign';

export class StreamingService{
    
    kafka:Kafka;
    producer:Producer;
    signer:DataSigner;
    
    constructor(brokerUri: string, substationId: string){
      this.kafka = new Kafka({
        clientId: 'test-app2', //generate client id for node
        brokers: [brokerUri] // why we need array of string ? (for different clusters?)
    })    
      this.producer = this.kafka.producer();
      this.signer = new DataSigner(substationId); 
    }
    
    async setupProducer(){
      await this.producer.connect()    
    }

    async destroyProducer(){
      await this.producer.disconnect();
    }
    
    async sendSensorData(topic: string, data:SensorData){
      
      const stringData = JSON.stringify({
        sensorId: data.sensorId,
        substationId: data.substationId,
        sensorType: data.sensorType,
        traceId: data.traceId,
        locationId: data.locationId,
        payload: data.payload,
        timestamp: data.timestamp
      })

      console.log("DATA GENERATED ON "+ data.substationId + ": " + stringData);

      this.producer.send({
        topic: topic,
        messages: [
          {value: stringData,
            headers: {
              'substationId': data.substationId,
              'digest': await this.signer.signData(stringData)  
            }
          }
        ]
      })
    }
}


