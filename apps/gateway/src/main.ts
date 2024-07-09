import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://ttznfbkl:QbuRWAElGrVT8zhYD3yokD73SQtA7zFk@moose.rmq.cloudamqp.com/ttznfbkl'],
      queue: 'auth_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
