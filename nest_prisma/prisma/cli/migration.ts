export interface Migration {
  up(): Promise<void>;
  down(): Promise<void>;
}

/**
 * User Defined Type Guard!
 */
export function isMigration(arg: Migration): arg is Migration {
  return true;
}
