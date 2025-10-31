import { MigrationBuilder } from 'node-pg-migrate';

export const shorthands: undefined = undefined;

export const up = (pgm: MigrationBuilder): void => {
  pgm.createTable('user', {
    id: { type: 'uuid', primaryKey: true },
    name: { type: 'varchar(255)', notNull: true },
    email: { type: 'varchar(255)', notNull: true, unique: true },
    emailVerified: { type: 'boolean', notNull: true },
    image: { type: 'varchar(255)' },
    createdAt: { type: 'timestamp with time zone', notNull: true, default: pgm.func('now()') },
    updatedAt: { type: 'timestamp with time zone', notNull: true, default: pgm.func('now()') },
  });
  pgm.createTable('session', {
    id: { type: 'uuid', primaryKey: true },
    userId: { type: 'uuid', notNull: true, references: 'user' },
    token: { type: 'varchar(255)', notNull: true, unique: true },
    expiresAt: { type: 'timestamp with time zone', notNull: true },
    ipAddress: { type: 'varchar(255)' },
    userAgent: { type: 'varchar(255)' },
    createdAt: { type: 'timestamp with time zone', notNull: true, default: pgm.func('now()') },
    updatedAt: { type: 'timestamp with time zone', notNull: true, default: pgm.func('now()') },
  });
  pgm.createTable('account', {
    id: { type: 'uuid', primaryKey: true },
    userId: { type: 'uuid', notNull: true, references: 'user' },
    accountId: { type: 'varchar(255)', notNull: true },
    providerId: { type: 'varchar(255)', notNull: true },
    refreshToken: { type: 'text' },
    accessToken: { type: 'text' },
    accessTokenExpiresAt: { type: 'timestamp with time zone' },
    refreshTokenExpiresAt: { type: 'timestamp with time zone' },
    scope: { type: 'text' },
    idToken: { type: 'text' },
    createdAt: { type: 'timestamp with time zone', notNull: true, default: pgm.func('now()') },
    updatedAt: { type: 'timestamp with time zone', notNull: true, default: pgm.func('now()') },
  });
  pgm.createTable('verification', {
    id: { type: 'uuid', primaryKey: true },
    identifier: { type: 'varchar(255)', notNull: true },
    value: { type: 'varchar(255)', notNull: true },
    expiresAt: { type: 'timestamp with time zone', notNull: true },
    createdAt: { type: 'timestamp with time zone', notNull: true, default: pgm.func('now()') },
    updatedAt: { type: 'timestamp with time zone', notNull: true, default: pgm.func('now()') },
  });
};

export const down = (pgm: MigrationBuilder): void => {
  pgm.dropTable('verification');
  pgm.dropTable('account');
  pgm.dropTable('session');
  pgm.dropTable('user');
};
