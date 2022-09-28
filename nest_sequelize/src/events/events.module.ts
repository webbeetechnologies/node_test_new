import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import Workshop from './entities/workshop.entity';
import Event from './entities/event.entity';
import { SequelizeModule } from '@nestjs/sequelize';

export const eventsModuleConfig = {
  imports: [SequelizeModule.forFeature([Event, Workshop])],
  controllers: [EventsController],
  providers: [EventsService],
};

@Module(eventsModuleConfig)
export class EventsModule {}
