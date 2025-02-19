import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSleepDto } from './dto/create-sleep.dto';

@Injectable()
export class SleepService {
  constructor(private readonly prisma: PrismaService) {}
  private sleepData: Array<{ bloodOxygen: number; heartRate: number }> = [];

  async create(createSleepDto: CreateSleepDto, userId: string) {
    const startSleep = new Date(createSleepDto.startSleep);
    const endSleep = createSleepDto.endSleep
      ? new Date(createSleepDto.endSleep)
      : null;

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

  async saveData(
    sleepId: string,
    data: { bloodOxygen: number; heartRate: number },
  ) {
    try {
      const updatedSleep = await this.prisma.sleep.update({
        where: { sleepId },
        data: {
          healthData: {
            push: data,
          },
        },
      });

      return {
        message: 'Sleep data saved successfully',
        data: updatedSleep.healthData,
      };
    } catch (error) {
      throw new Error(`Failed to save sleep data: ${error.message}`);
    }
  }
}
