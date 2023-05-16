import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/create-auth.dto';
import { LoginAuthDTO } from './dto/logindto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() RegisterAuthDto: RegisterAuthDto) {
    return await this.authService.register(RegisterAuthDto);
  }

  @Post('login')
  async login(@Body() LoginAuthDto: LoginAuthDTO) {
    return await this.authService.login(LoginAuthDto);
  }
}
