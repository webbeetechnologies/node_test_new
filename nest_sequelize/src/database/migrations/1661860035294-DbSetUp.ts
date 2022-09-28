import { literal, QueryInterface } from 'sequelize';
import {
  addYears,
  format,
  subYears,
  setMonth,
  setDate,
  setHours,
} from 'date-fns';
import { ModelAttributes } from 'sequelize/types/model';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('menu_item', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'varchar' },
      url: { type: 'varchar' },
      parentId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'menu_item',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    await queryInterface.createTable('event', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'varchar' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);

    await queryInterface.createTable('workshop', {
      id: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: 'varchar' },
      eventId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'event',
          },
          key: 'id',
        },
        onDelete: 'cascade',
      },
      start: {
        type: 'timestamp',
      },
      end: {
        type: 'timestamp',
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes);
    // await queryRunner.startTransaction();
    try {
      await queryInterface.bulkInsert(`menu_item`, [
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
      ]);

      const date1 = format(subYears(new Date(), 1), 'yyyy');
      const date2 = format(addYears(new Date(), 1), 'yyyy');

      await queryInterface.bulkInsert(`event`, [
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
      ]);

      const time1 = setDate(setMonth(subYears(new Date(), 1), 1), 21);
      const time2 = addYears(new Date(), 1);
      const month21 = setMonth(time2, 9);
      const month22 = setMonth(time2, 10);
      const month23 = setMonth(time2, 8);
      const month24 = setMonth(time2, 11);

      const setHoursAndFormat = (date: Date, hours = 1) => {
        return format(setHours(date, hours), 'yyyy-mm-dd hh:mm:ss');
      };

      await queryInterface.bulkInsert(`workshop`, [
        {
          id: 1,
          start: setHoursAndFormat(time1, 10),
          end: setHoursAndFormat(time1, 16),
          eventId: 1,
          name: 'Illuminate your knowledge of the laravel code base',
        },
        {
          id: 2,
          start: setHoursAndFormat(month21, 10),
          end: setHoursAndFormat(month21, 16),
          eventId: 2,
          name: 'The new Eloquent - load more with less',
        },
        {
          id: 3,
          start: setHoursAndFormat(month22, 10),
          end: setHoursAndFormat(month22, 17),
          eventId: 2,
          name: 'AutoEx - handles exceptions 100% automatic',
        },
        {
          id: 4,
          start: setHoursAndFormat(month23, 10),
          end: setHoursAndFormat(month23, 18),
          eventId: 3,
          name: '#NoClass pure functional programming',
        },
        {
          id: 5,
          start: setHoursAndFormat(month24, 9),
          end: setHoursAndFormat(month24, 17),
          eventId: 3,
          name: 'Navigating the function jungle',
        },
      ]);
    } catch (error) {
      // await queryRunner.rollbackTransaction();
      throw error;
    }

    // await queryRunner.commitTransaction();
  },
};
