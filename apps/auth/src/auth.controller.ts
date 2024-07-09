import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { json } from 'stream/consumers';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
