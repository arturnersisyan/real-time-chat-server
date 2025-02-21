import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
  } from 'class-validator';
  
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
  
  export class UserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail(null, { message: 'Please provide valid Email.' })
    email: string;
  
    @IsInt()
    age: number;
  
  
    @IsNotEmpty()
    @Matches(passwordRegEx, {
      message: `Password must contain Minimum 8 and maximum 20 characters, 
      at least one uppercase letter, 
      one lowercase letter, 
      one number and 
      one special character`,
    })
    password: string;
  }