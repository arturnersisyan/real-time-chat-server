import { Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { json } from 'stream/consumers';
import { response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject("GATEWAY_SERVICE") private readonly client: ClientProxy
  ) {}
}
