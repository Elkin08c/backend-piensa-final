import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { META_ROLES } from '../decorators/role-protected.decorator';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const authList: string[] = this.reflector.get<string[]>(
      META_ROLES,
      context.getHandler(),
    );

    if (!authList || authList.length === 0) {
      return true; // No roles required, allow access
    }

    const userRole = await this.getUserRoles(user.userId);

    if (!authList.includes(userRole)) {
      throw new UnauthorizedException('User does not have the required roles');
    }

    return true;
  }

  private async getUserRoles(userId: string): Promise<string> {
    if (!userId) {
      throw new UnauthorizedException('User ID is required');
    }

    const user = await this.prisma.users.findUnique({
      where: { userId },
      select: { roles: { select: { name: true } } },
    });

    if (!user || !user.roles) {
      throw new UnauthorizedException('User or role not found');
    }

    return user.roles.name;
  }
}
