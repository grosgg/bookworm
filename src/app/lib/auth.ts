import { v4 as uuidv4 } from 'uuid';
import { betterAuth } from "better-auth"
import { Pool } from 'pg';
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createDefaultBook } from './data';
import { createAuthMiddleware } from 'better-auth/api';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});

export const auth = betterAuth({
  database: pool,
  advanced: {
    database: {
      generateId: () => uuidv4(),
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/get-session")) {
        const session = ctx.context.session;
        if (session && session.user.createdAt > new Date(Date.now() - 1000 * 60)) {
          console.log("Creating default book for user", session.user.id);
          await createDefaultBook(session.user.id);
        }
      }
    }),
  },
});

export async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect('/');
  }

  return session;
}
