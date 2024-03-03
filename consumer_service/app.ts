import { ConsumerService } from "./consumer-service";

if (process.argv.length < 5) {
    console.error('Arguments expected: 1.Kafka cluster url, 2.Topic to subscribe, 3.Consumer group.');
    process.exit(1);
}else{
    const service = new ConsumerService(process.argv[2], process.argv[3], process.argv[4]);  
    service.setupConsumer();
    service.run();
}


