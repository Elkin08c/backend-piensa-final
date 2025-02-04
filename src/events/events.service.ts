import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}
  create(createEventDto: CreateEventDto) {
    return this.prisma.events.create({ data: createEventDto });
  }

  findAll() {
    return this.prisma.events.findMany();
  }

  findOne(eventId: string) {
    return this.prisma.events.findUnique({ where: { eventId } });
  }

  update(eventId: string, updateEventDto: UpdateEventDto) {
    return this.prisma.events.update({
      where: { eventId },
      data: updateEventDto,
    });
  }

  remove(eventId: string) {
    return this.prisma.events.delete({ where: { eventId } });
  }
}
