import {
    IsEmail,
    IsNotEmpty,
  } from 'class-validator';

  
  export class LogInDto {

    @IsNotEmpty()
    @IsEmail(null, { message: 'Please provide valid Email.' })
    email: string;
  
    @IsNotEmpty()
    password: string;
  }