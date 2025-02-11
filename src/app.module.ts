import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { DevicesModule } from './devices/devices.module';
import { SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';
import { SleepModule } from './sleep/sleep.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    DevicesModule,
    SwaggerModule,
    AuthModule,
    SleepModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
