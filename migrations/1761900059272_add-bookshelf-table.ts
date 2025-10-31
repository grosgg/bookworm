import { MigrationBuilder } from 'node-pg-migrate';

export const shorthands: undefined = undefined;

export const up = (pgm: MigrationBuilder): void => {
  pgm.createTable('bookshelf', {
    id: { type: 'uuid', primaryKey: true },
    userId: { type: 'uuid', notNull: true, references: 'user' },
    name: { type: 'varchar(255)', notNull: true },
    visibility: { type: 'varchar(255)', notNull: true },
    createdAt: { type: 'timestamp with time zone', notNull: true, default: pgm.func('now()') },
    updatedAt: { type: 'timestamp with time zone', notNull: true, default: pgm.func('now()') },
  });
}

export const down = (pgm: MigrationBuilder): void => {
  pgm.dropTable('bookshelf');
}
