import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Post,
    UseFilters,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { ClientProxy, RpcException } from '@nestjs/microservices';
  import { json } from 'stream/consumers';
  import { response } from 'express';
  import { UserDto } from './dto/user.dto';
  import { User } from 'apps/auth/src/entities/user.entity';
  import { RpcExceptionFilter } from './filters/rpc-exception.filter';
  import { Observable } from 'rxjs';
  import { LogInDto } from './dto/login.dto';
  import { AuthGuard } from './guards/auth.guard';
  

@Controller('auth')
export class AuthController {
    constructor(
      private readonly authService: AuthService,
      @Inject('GATEWAY_SERVICE') private readonly client: ClientProxy,
    ) {}
  
    @HttpCode(HttpStatus.OK)
    @UseFilters(new RpcExceptionFilter())
    @Post('signup')
    async signUp(@Body() data: UserDto): Promise<any> {
      console.log(data);
      return this.client
        .send('create_user', data)
        .toPromise()
        .catch((err) => {
          throw new RpcException(err);
        });
    }
  
    @HttpCode(HttpStatus.OK)
    @UseFilters(new RpcExceptionFilter())
    @Post('login')
    async signIn(@Body() data: LogInDto) {
      return this.client
        .send('login_user', data)
        .toPromise()
        .catch((err) => {
          throw new RpcException(err);
        });
    }
  
    @HttpCode(HttpStatus.OK)
    @Get('profile')
    @UseGuards(AuthGuard)
    async getProfile(@Request() req) {
      try{
        return req.user;
      } catch(err) {
        return err.message;
      }
    }
  }
  
