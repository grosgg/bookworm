# Bookworm

## Tech Stack
- NextJS
- better-auth with Google OAuth
- node-postgres
- node-pg-migrate
- zod

## Local Development
1. Make sure Docker or OrbStack is installed.
2. Copy `.example-env` to `.env`. Set a secret for better-auth. Enter your Google client ID and secret.
3. Start the development server:
```bash
docker compose up -d --build
```
4. Run DB migrations:
```bash
docker compose exec app pnpm run migrate up
```
5. App is accessible at [http://localhost:3000](http://localhost:3000).
