import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSleepDto } from './dto/create-sleep.dto';
import { UpdateSleepDto } from './dto/update-sleep.dto';

@Injectable()
export class SleepService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSleepDto: CreateSleepDto, userId: string) {
    const startSleep = new Date(createSleepDto.startSleep);
    const endSleep = createSleepDto.endSleep
      ? new Date(createSleepDto.endSleep)
      : null;

    // Validar que la fecha de inicio no sea mayor que la fecha final
    if (endSleep && startSleep > endSleep) {
      throw new BadRequestException(
        'La fecha de inicio no puede ser mayor a la fecha final.',
      );
    }

    return this.prisma.sleep.create({
      data: {
        startSleep,
        endSleep,
        userId,
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.sleep.findMany({
      where: { userId },
      orderBy: { startSleep: 'desc' },
    });
  }

  async findAll() {
    return this.prisma.sleep.findMany({
      orderBy: { startSleep: 'desc' },
      include: { user: true },
    });
  }

  async getSleepMetrics(userId: string) {
    const sleeps = await this.prisma.sleep.findMany({
      where: { userId },
      orderBy: { startSleep: 'asc' },
    });
    const metrics = sleeps.map((record) => {
      const start = new Date(record.startSleep);
      const end = record.endSleep ? new Date(record.endSleep) : null;
      const duration = end
        ? (end.getTime() - start.getTime()) / (1000 * 60 * 60)
        : 0;
      return {
        date: start.toLocaleDateString(),
        duration,
      };
    });
    return metrics;
  }

  async getAllSleepMetrics() {
    const sleeps = await this.prisma.sleep.findMany({
      orderBy: { startSleep: 'asc' },
      include: { user: true },
    });
    const metrics = sleeps.map((record) => {
      const start = new Date(record.startSleep);
      const end = record.endSleep ? new Date(record.endSleep) : null;
      const duration = end
        ? (end.getTime() - start.getTime()) / (1000 * 60 * 60)
        : 0;
      return {
        userId: record.userId,
        userName: record.user?.name,
        date: start.toLocaleDateString(),
        duration,
      };
    });
    return metrics;
  }
}
