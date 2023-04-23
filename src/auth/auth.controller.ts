import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { IRegisterRequest } from 'src/user/user.interface';
import { LocalGuard } from './guards/local.guard';
import { AuthenticationGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userSerivce: UserService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() body: IRegisterRequest) {
    const user = await this.userSerivce.createUser(body);
    delete user.password;
    return {
      ...this.authService.login(user),
      user,
    };
  }

  @UseGuards(AuthenticationGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.authService.getProfile(req.user.email);
  }
}
