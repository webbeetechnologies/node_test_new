import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaModule } from '../prisma/prisma.module';

export const eventsModuleConfig = {
  controllers: [EventsController],
  providers: [EventsService],
  imports: [PrismaModule],
};

@Module(eventsModuleConfig)
export class EventsModule {}
