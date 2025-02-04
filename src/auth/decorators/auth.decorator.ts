import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../guards/role.guard';
import { RoleProtected } from './role-protected.decorator';

export function Auth(...roles: string[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), RoleGuard),
  );
}
