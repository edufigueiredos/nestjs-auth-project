import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserPayload } from './models/user-payload.model';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/user-token.model';

@Injectable()
export class AuthService {


  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  login(user: UserEntity): UserToken {
    const payload: UserPayload = {
      sub: user._id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);
    return {
      access_token: jwtToken
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await compare(password, user.password);

      if (isPasswordValid) {
        user.password = undefined;
        return user
      }
    }

    throw new Error('Email address or password provided is incorrect.');
  }
}
