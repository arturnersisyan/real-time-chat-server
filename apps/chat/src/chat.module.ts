import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: './.env',
  }),],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
