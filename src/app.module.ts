import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { DevicesModule } from './devices/devices.module';
import { EventsModule } from './events/events.module';
import { SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    DevicesModule,
    EventsModule,
    SwaggerModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
