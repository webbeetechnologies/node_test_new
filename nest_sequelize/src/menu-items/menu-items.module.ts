import { Module } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { MenuItemsController } from './menu-items.controller';
import MenuItem from './entities/menu-item.entity';
import { SequelizeModule } from '@nestjs/sequelize';

export const menuItemsModuleConfig = {
  imports: [SequelizeModule.forFeature([MenuItem])],
  controllers: [MenuItemsController],
  providers: [MenuItemsService],
};

@Module(menuItemsModuleConfig)
export class MenuItemsModule {}
