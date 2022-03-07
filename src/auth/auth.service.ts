import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) { }
  
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user && password) {
      const isPasswordValid = await compare(password, user.password);

      if (isPasswordValid) {
        user.password = undefined;
        return user
      }
    }

    throw new Error('Email address or password provided is incorrect.');
  }
}
