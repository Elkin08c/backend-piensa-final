import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoginDto } from './dto/createLogin.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './strategy/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: CreateLoginDto) {
    const { password, email } = loginDto;

    const user = await this.prisma.users.findUnique({
      where: { email },
      select: {
        email: true,
        password: true,
        userId: true,
      },
    });

    if (!user) throw new UnauthorizedException('Credentials are not valid');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid');

    const accessToken = this.getJwtToken(
      { id: user.userId },
      { expiresIn: '2d' },
    );

    return {
      userId: user.userId,
      accessToken,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

    try {
      const user = await this.prisma.users.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
        select: {
          email: true,
          userId: true,
        },
      });

      const accessToken = this.getJwtToken(
        { id: user.userId },
        { expiresIn: '2d' },
      );

      return {
        userId: user.userId,
        accessToken,
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private getJwtToken(payload: JwtPayload, options?: { expiresIn: string }) {
    const token = this.jwtService.sign(payload, options);
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}
