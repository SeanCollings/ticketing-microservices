import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http:localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable() // * important along with the below - get all events emitted in the past
    .setDurableName('accounting-service'); // * keep track of all events that have gone to this subscription/ queue-group

  const subscription = stan.subscribe(
    'ticket:created',
    'queue-group-name', // * do not dump durable name even if all services go offline/restart. Only 1 instance
    options
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Recieved event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});

// For linux
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
