import { ConsumerService } from "./consumer-service";

const service = new ConsumerService();
service.setupConsumer();
service.run();