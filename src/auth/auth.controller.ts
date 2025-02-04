import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/createLogin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async create(@Body() createLoginDto: CreateLoginDto) {
    return this.authService.login(createLoginDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
