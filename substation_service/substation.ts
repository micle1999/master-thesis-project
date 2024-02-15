import { StreamingService } from  './streaming-service'
import { Sensor } from  './model/sensor'
import { SensorData } from './model/sensor-data';
import { IdGenerator } from './utils/id-gen';
import { SENSOR_TYPE } from './utils/sensor-type';


let sensors: Sensor[] = [];
let topic: string;
let brokerUri: string;

if (process.argv.length < 4) {
    console.error('Arguments expected: 1.Kafka broker uri , 2.Kafka topic to produce data to');
    process.exit(1);
}else{
    brokerUri = process.argv[2];
    topic = process.argv[3];
}

const sensor1 = new Sensor(SENSOR_TYPE.HUMIDITY,'ringId1','sensor1', 1000, {low:10, high:100});
sensors.push(sensor1);

const service = new StreamingService(brokerUri);
service.setupProducer();

for(let sensor of sensors){
    
    let interval = sensor.interval; 
    const intervalId = setInterval(() => sensorJob(sensor), interval);
    
}

function sensorJob(sensor:Sensor):void{
    let value = sensor.measure();
    console.log(value);
    const data : SensorData = {
        sensorId: sensor.id,
        sensorType: sensor.type,
        traceId: IdGenerator.generateId(),
        ringId: sensor.ringId,
        payload: value,
        timestamp: Date.now()
    };
    service.sendSensorData(topic, data);
}   

export{}
