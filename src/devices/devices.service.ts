import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}

  create(createDeviceDto: CreateDeviceDto) {
    return this.prisma.devices.create({ data: createDeviceDto });
  }

  findAll() {
    return this.prisma.devices.findMany();
  }

  findOne(deviceId: string) {
    return this.prisma.devices.findUnique({ where: { deviceId: deviceId } });
  }

  update(deviceId: string, updateDeviceDto: UpdateDeviceDto) {
    return this.prisma.devices.update({
      where: { deviceId: deviceId },
      data: updateDeviceDto,
    });
  }

  remove(deviceId: string) {
    return this.prisma.devices.delete({ where: { deviceId: deviceId } });
  }
}
