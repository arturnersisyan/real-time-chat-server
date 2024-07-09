import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://ttznfbkl:QbuRWAElGrVT8zhYD3yokD73SQtA7zFk@moose.rmq.cloudamqp.com/ttznfbkl'],
      queue: 'auth_queue',
      noAck: false,
      queueOptions: {
        durable: false
      },
    },
  });

  app.listen()
}
bootstrap();
