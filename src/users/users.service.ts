import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { bcrypt } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prisma.users.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(userId: string) {
    return this.prisma.users.findUnique({ where: { userId: userId } });
  }

  update(userId: string, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({
      where: { userId: userId },
      data: updateUserDto,
    });
  }

  remove(userId: string) {
    return this.prisma.users.delete({ where: { userId: userId } });
  }
}
