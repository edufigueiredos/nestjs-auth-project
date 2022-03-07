import { environment } from './../environment/environment';
import { UserModule } from './../user/user.module';
import { LocalStrategy } from './guards/strategies/local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: environment.jwt_secret,
      signOptions: {expiresIn: environment.jwt_expire}
    })
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
