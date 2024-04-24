import { ConsumerService } from "./consumer-service";

if (process.argv.length < 6 && !process.env.DOCKER) {
    console.error('Arguments expected: 1.Kafka cluster url, 2.Topic to subscribe, 3.Consumer group.');
    process.exit(1);
}else{
    const brokerUri = process.env.DOCKER? process.env.BROKER_URI : process.argv[2];
    const bigchainUri = process.env.DOCKER? process.env.BIGCHAIN_URI : process.argv[3];
    const topic = process.env.DOCKER? process.env.TOPIC : process.argv[4];
    const groupName = process.env.DOCKER? process.env.GROUP_NAME : process.argv[5];
    const service = new ConsumerService(brokerUri, bigchainUri, topic, groupName);  
    service.setupConsumer();
    service.run();
}


