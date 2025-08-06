import { Consumer, EachMessagePayload, Kafka } from "kafkajs";
import { MessageBroker } from "../types/broker";

export class KafkaBroker implements MessageBroker {
  private consumner: Consumer;
  constructor(clientId: string, brokers: string[]) {
    const kafka = new Kafka({ clientId, brokers });

    this.consumner = kafka.consumer({ groupId: clientId });
  }
  async connectConsumer() {
    await this.consumner.connect();
  }
  async disconnectConsumer() {
    await this.consumner.disconnect();
  }
  async consumeMessage(topics: string[], fromBeginning: boolean = false) {
    await this.consumner.subscribe({ topics, fromBeginning });
    await this.consumner.run({
      eachMessage: async ({
        topic,
        partition,
        message,
      }: EachMessagePayload) => {
        console.log({
          value: message.value.toString(),
          topic,
          partition,
        });
      },
    });
  }
}
