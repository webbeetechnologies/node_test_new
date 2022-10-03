export interface Migration {
  up(prisma: any): Promise<void>;
  down(prisma: any): Promise<void>;
}

/**
 * User Defined Type Guard!
 */
export function isMigration(arg: Migration): arg is Migration {
  return true;
}
