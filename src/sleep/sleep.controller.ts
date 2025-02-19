import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SleepService } from './sleep.service';
import { CreateSleepDto } from './dto/create-sleep.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces/roles';
import { log } from 'console';

@Controller('sleep')
export class SleepController {
  constructor(private readonly sleepService: SleepService) {}

  @Auth(ValidRoles.user, ValidRoles.admin)
  @Post('send-data/:sleepId')
  postData(
    @Param('sleepId') sleepId: string,
    @Body()
    data: {
      bloodOxygen: number;
      heartRate: number;
    },
  ) {
    console.log(data);
    return this.sleepService.saveData(sleepId, data);
  }

  @Auth(ValidRoles.admin)
  @Get('admin')
  findAll() {
    return this.sleepService.findAll();
  }

  @Auth(ValidRoles.admin)
  @Get('metrics/all')
  getAllSleepMetrics() {
    return this.sleepService.getAllSleepMetrics();
  }

  @Auth(ValidRoles.user, ValidRoles.admin)
  @Get('metrics/:userId')
  getSleepMetricsByUser(@Param('userId') userId: string) {
    return this.sleepService.getSleepMetrics(userId);
  }

  @Auth(ValidRoles.user, ValidRoles.admin)
  @Get(':userId')
  findByUser(@Param('userId') userId: string) {
    return this.sleepService.findByUser(userId);
  }

  @Auth(ValidRoles.user, ValidRoles.admin)
  @Post(':userId')
  create(
    @Body() createSleepDto: CreateSleepDto,
    @Param('userId') userId: string,
  ) {
    return this.sleepService.create(createSleepDto, userId);
  }
}
