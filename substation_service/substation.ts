import {StreamingService} from  './streaming-service'
import {Sensor} from  './model/sensor'
import {HumiditySensor} from  './model/sensors/humidity-sensor'
import { SensorData } from './model/sensor-data';


let sensors: Sensor[] = [];

const service = new StreamingService();
const sensor1 = new HumiditySensor("sensor1", 1000, {low:10, high:100});

sensors.push(sensor1);

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
        payload: value,
        timestamp: Date.now()
    };
    service.sendSensorData(data);
}   

export{}
