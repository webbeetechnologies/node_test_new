import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeAsyncConfig } from './config/sequelize.config';
import { EventsModule } from './events/events.module';
import { MenuItemsModule } from './menu-items/menu-items.module';

export const appModuleConfig = {
  imports: [
    SequelizeModule.forRootAsync(sequelizeAsyncConfig),
    EventsModule,
    MenuItemsModule,
  ],
  controllers: [],
  providers: [],
};

@Module(appModuleConfig)
export class AppModule {}
