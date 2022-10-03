import { Module } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { MenuItemsController } from './menu-items.controller';
import { PrismaModule } from '../prisma/prisma.module';

export const menuItemsModuleConfig = {
  controllers: [MenuItemsController],
  providers: [MenuItemsService],
  imports: [PrismaModule],
};

@Module(menuItemsModuleConfig)
export class MenuItemsModule {}
