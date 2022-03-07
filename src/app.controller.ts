import { UserEntity } from './user/entities/user.entity';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './auth/decorators/currente-user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  getMe(@CurrentUser() user: UserEntity) {
    return user;
  }
}
