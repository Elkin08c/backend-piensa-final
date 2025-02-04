import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}
  create(createRoleDto: CreateRoleDto) {
    return this.prisma.roles.create({ data: createRoleDto });
  }

  findAll() {
    return this.prisma.roles.findMany();
  }

  findOne(roleId: string) {
    return this.prisma.roles.findUnique({ where: { roleId } });
  }

  update(roleId: string, updateRoleDto: UpdateRoleDto) {
    return this.prisma.roles.update({ where: { roleId }, data: updateRoleDto });
  }

  remove(roleId: string) {
    return this.prisma.roles.delete({ where: { roleId } });
  }
}
