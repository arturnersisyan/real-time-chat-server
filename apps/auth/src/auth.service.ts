import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signUp(data): Promise<any> {
    let existingUser;
    try {
      existingUser = await this.userRepository.findOne({
        where: { email: data.email },
      });
    } catch (err) {
      throw new RpcException({
        message: 'Sign Up failed.',
        statusCode: 500,
      });
    }

    if (existingUser) {
      throw new RpcException({
        message: 'Invalid credentials.',
        statusCode: 422,
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(data.password, 12);
    } catch (err) {
      throw new RpcException({
        message: 'Could not create user, please try again.',
        statusCode: 500,
      });
    }

    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.age = data.age;

    user.password = hashedPassword;
    try {
      await this.userRepository.save(user);
    } catch (err) {
      throw new RpcException({
        message: 'Could not create user, please try again.',
        statusCode: 500,
      });
    }
    return { name: user.name, email: user.email, age: user.age };
  }

  async signIn(data): Promise<{ access_token: string }> {

    let user;
    try {
      user = await this.userRepository.findOne({
        where: { email: data.email },
      });
    } catch (err) {
      throw new RpcException({
        message: 'LogIn failed.',
        statusCode: 500,
      });
    }

    if (!user) {
      throw new RpcException({
        message: 'User with this email does not exist.',
        statusCode: 401,
      });
    }

    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(data.password, user.password);
    } catch (err) {
      throw new RpcException({
        message: 'Try Later.',
        statusCode: 500,
      });
    }

    if (!isValidPassword) {
      throw new RpcException(new UnauthorizedException("Password is incorrect."));
    }

    const payload = { sub: user.userId, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
