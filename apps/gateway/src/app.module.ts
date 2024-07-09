import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ ClientsModule.register([
    {
      name: 'GATEWAY_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://ttznfbkl:QbuRWAElGrVT8zhYD3yokD73SQtA7zFk@moose.rmq.cloudamqp.com/ttznfbkl'],
        queue: 'auth_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  ]),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
