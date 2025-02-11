import { Module } from '@nestjs/common';
import { SleepService } from './sleep.service';
import { SleepController } from './sleep.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [SleepController],
  providers: [SleepService, PrismaService],
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class SleepModule {}
