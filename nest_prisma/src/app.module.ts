import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { MenuItemsModule } from './menu-items/menu-items.module';

export const appModuleConfig = {
  imports: [EventsModule, MenuItemsModule],
  controllers: [],
  providers: [],
};

@Module(appModuleConfig)
export class AppModule {}
