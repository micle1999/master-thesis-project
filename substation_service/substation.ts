import { StreamingService } from  './streaming-service'
import { Sensor } from  './model/sensor'
import { SensorData } from './model/sensor-data';
import { IdGenerator } from './utils/id-gen';
import { SENSOR_TYPE } from './utils/sensor-type';


let sensors: Sensor[] = [];
let topic: string;
let brokerUri: string;
let substationId: string;

let counter = 0;

if (process.argv.length < 5 && !process.env.DOCKER) {
    console.error('Arguments expected: 1.Kafka broker uri , 2.Kafka topic to produce data to, 3.SubstationId');
    process.exit(1);
}else{
    brokerUri = process.env.DOCKER? process.env.BROKER_URI : process.argv[2];
    topic = process.env.DOCKER? process.env.TOPIC : process.argv[3];
    substationId = process.env.DOCKER? process.env.SUBSTATION_ID : process.argv[4];
}

const sensor1 = new Sensor(SENSOR_TYPE.HUMIDITY, substationId ,'location1','sensor1', 200, {low:10, high:100});
sensors.push(sensor1);

const service = new StreamingService(brokerUri, substationId);
service.setupProducer();

for(let sensor of sensors){
    
    let interval = sensor.interval; 
    const intervalId = setInterval(() => sensorJob(sensor), interval);
    
}

function sensorJob(sensor:Sensor):void{
    if(counter < 10000){
        let value = sensor.measure();
        console.log(value);
        const data : SensorData = {
            sensorId: sensor.id,
            substationId: sensor.substationId,
            sensorType: sensor.type,
            traceId: IdGenerator.generateId(),
            locationId: sensor.locationId,
            payload: value,
            timestamp: Date.now()
        };
        service.sendSensorData(topic, data);
        counter++;
    }else{
        console.log("NO MORE VALUES GENERATED");
    }
    
    
}   

export{}
