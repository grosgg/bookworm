import { MigrationBuilder } from 'node-pg-migrate';

export const shorthands: undefined = undefined;

export const up = (pgm: MigrationBuilder): void => {
  pgm.createTable('book', {
    id: { type: 'uuid', primaryKey: true },
    userId: { type: 'uuid', notNull: true, references: 'user' },
    bookshelfId: { type: 'uuid', notNull: false, references: 'bookshelf' },
    title: { type: 'varchar(255)', notNull: true },
    author: { type: 'varchar(255)', notNull: true },
    isbn: { type: 'varchar(255)', notNull: false },
    status: { type: 'varchar(255)', notNull: true },
    coverUrl: { type: 'varchar(255)', notNull: false },
    pages: { type: 'integer', notNull: false },
    notes: { type: 'text', notNull: false },
    createdAt: { type: 'timestamp with time zone', notNull: true, default: pgm.func('now()') },
    updatedAt: { type: 'timestamp with time zone', notNull: true, default: pgm.func('now()') },
  });
}

export const down = (pgm: MigrationBuilder): void => {
  pgm.dropTable('book');
}
