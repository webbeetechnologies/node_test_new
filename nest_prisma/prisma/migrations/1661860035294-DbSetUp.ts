import {
  addYears,
  format,
  subYears,
  setMonth,
  setDate,
  setHours,
} from 'date-fns';
import { PrismaService } from '../../src/prisma/prisma.service';
import { Migration } from '../cli/migration';

const prisma = new PrismaService();

export default class implements Migration {
  async up() {
    try {
      await prisma.$queryRaw`CREATE TABLE "events" (
                                                     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                     "name" TEXT NOT NULL,
                                                     "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                           )`;

      await prisma.$queryRaw`CREATE TABLE "menu_items" (
                                                         "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                         "name" TEXT NOT NULL,
                                                         "url" TEXT NOT NULL,
                                                         "parentId" INTEGER,
                                                         "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                         CONSTRAINT "menu_items_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "menu_items" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
                           )`;

      await prisma.$queryRaw`CREATE TABLE "workshops"
                     (
                         "id"        INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
                         "name"      TEXT     NOT NULL,
                         "eventId"   INTEGER  NOT NULL,
                         "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         "start"     DATETIME NOT NULL,
                         "end"       DATETIME NOT NULL,
                         CONSTRAINT "workshops_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
                     )`;

      const menuItems = [
        {
          id: 1,
          name: 'All events',
          url: '/events',
          parentId: null,
        },
        {
          id: 2,
          name: 'Laracon',
          url: '/events/laracon',
          parentId: 1,
        },
        {
          id: 3,
          name: 'Illuminate your knowledge of the laravel code base',
          url: '/events/laracon/workshops/illuminate',
          parentId: 2,
        },
        {
          id: 4,
          name: 'The new Eloquent - load more with less',
          url: '/events/laracon/workshops/eloquent',
          parentId: 2,
        },
        {
          id: 5,
          name: 'Reactcon',
          url: '/events/reactcon',
          parentId: 1,
        },
        {
          id: 6,
          name: '#NoClass pure functional programming',
          url: '/events/reactcon/workshops/noclass',
          parentId: 5,
        },
        {
          id: 7,
          name: 'Navigating the function jungle',
          url: '/events/reactcon/workshops/jungle',
          parentId: 5,
        },
      ];

      const CreateMenuItems = menuItems.map((menuItemData) => {
        return prisma.menuItem.create({
          data: menuItemData,
        });
      });

      const date1 = format(subYears(new Date(), 1), 'yyyy');
      const date2 = format(addYears(new Date(), 1), 'yyyy');

      const events = [
        {
          id: 1,
          name: `Laravel convention ${date1}`,
        },
        {
          id: 2,
          name: `Laravel convention ${date2}`,
        },
        {
          id: 3,
          name: `React convention ${date2}`,
        },
      ];

      const CreateEvents = events.map((eventData) => {
        return prisma.event.create({
          data: eventData,
        });
      });

      const time1 = setDate(setMonth(subYears(new Date(), 1), 1), 21);
      const time2 = addYears(new Date(), 1);
      const month21 = setMonth(time2, 9);
      const month22 = setMonth(time2, 10);
      const month23 = setMonth(time2, 8);
      const month24 = setMonth(time2, 11);

      const workShops = [
        {
          id: 1,
          start: setHours(time1, 10),
          end: setHours(time1, 16),
          eventId: 1,
          name: 'Illuminate your knowledge of the laravel code base',
        },
        {
          id: 2,
          start: setHours(month21, 10),
          end: setHours(month21, 16),
          eventId: 2,
          name: 'The new Eloquent - load more with less',
        },
        {
          id: 3,
          start: setHours(month22, 10),
          end: setHours(month22, 17),
          eventId: 2,
          name: 'AutoEx - handles exceptions 100% automatic',
        },
        {
          id: 4,
          start: setHours(month23, 10),
          end: setHours(month23, 18),
          eventId: 3,
          name: '#NoClass pure functional programming',
        },
        {
          id: 5,
          start: setHours(month24, 9),
          end: setHours(month24, 17),
          eventId: 3,
          name: 'Navigating the function jungle',
        },
      ];

      const CreateWorkShops = workShops.map((workShopData) => {
        return prisma.workshop.create({
          data: workShopData,
        });
      });

      prisma.$transaction([
        ...CreateMenuItems,
        ...CreateEvents,
        ...CreateWorkShops,
      ]);
      // automatic rollback on error
    } catch (e) {
      console.error(e);
    } finally {
      await prisma.$disconnect();
    }
  }

  async down() {
    await prisma.$queryRaw`DROP TABLE "events"`;
    await prisma.$queryRaw`DROP TABLE "menu_items"`;
    await prisma.$queryRaw`DROP TABLE "workshops"`;
  }
}
