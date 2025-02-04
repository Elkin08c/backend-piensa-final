import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces/roles';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Auth(ValidRoles.admin)
  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Auth(ValidRoles.admin)
  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Auth(ValidRoles.admin)
  @Get(':deviceId')
  findOne(@Param('deviceId') deviceId: string) {
    return this.devicesService.findOne(deviceId);
  }

  @Auth(ValidRoles.admin)
  @Patch(':deviceId')
  update(
    @Param('deviceId') deviceId: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.devicesService.update(deviceId, updateDeviceDto);
  }

  @Auth(ValidRoles.admin)
  @Delete(':deviceId')
  remove(@Param('deviceId') deviceId: string) {
    return this.devicesService.remove(deviceId);
  }
}
