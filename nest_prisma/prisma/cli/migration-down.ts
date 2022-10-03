import * as path from 'path';
import { PrismaService } from '../../src/prisma/prisma.service';
import { isMigration } from './migration';

const migrationDir = path.resolve(__dirname, '../migrations');
const prisma = new PrismaService();

(async function loadModules() {
  const executedMigrations: any = await prisma.$queryRaw`SELECT name
                           FROM migrations
                           order by createdAt DESC`;

  for (const file of executedMigrations) {
    const importedModule = await import(path.resolve(migrationDir, file.name));

    if (!isMigration(importedModule.default)) {
      continue;
    }
    const instance = new importedModule.default();

    await prisma.$queryRaw`CREATE TABLE IF NOT EXISTS "migrations" (
     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
     "name" TEXT NOT NULL UNIQUE,
     "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP)`;

    const count: any[] = await prisma.$queryRaw`SELECT id
                             from migrations
                             where name = ${file.name}`;

    if (count.length) {
      try {
        await instance.down();
        console.log(`Migration rolled back: ${file.name}`);
        await prisma.$queryRaw`DELETE FROM migrations where name = ${file.name}`;
      } catch (e) {
        console.error(e);
      }
    }
  }
})();
