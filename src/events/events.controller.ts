import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces/roles';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Auth(ValidRoles.admin)
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Get(':eventId')
  findOne(@Param('eventId') eventId: string) {
    return this.eventsService.findOne(eventId);
  }

  @Auth(ValidRoles.admin)
  @Patch(':eventId')
  update(
    @Param('eventId') eventId: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(eventId, updateEventDto);
  }

  @Auth(ValidRoles.admin)
  @Delete(':eventId')
  remove(@Param('eventId') eventId: string) {
    return this.eventsService.remove(eventId);
  }
}
