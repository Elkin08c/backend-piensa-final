import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/roles';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Auth(ValidRoles.admin)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Auth(ValidRoles.admin)
  @Auth(ValidRoles.admin)
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Auth(ValidRoles.admin)
  @Get(':roleId')
  findOne(@Param('roleId') roleId: string) {
    return this.rolesService.findOne(roleId);
  }

  @Auth(ValidRoles.admin)
  @Patch(':roleId')
  update(
    @Param('roleId') roleId: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.update(roleId, updateRoleDto);
  }

  @Auth(ValidRoles.admin)
  @Delete(':roleId')
  remove(@Param('roleId') roleId: string) {
    return this.rolesService.remove(roleId);
  }
}
