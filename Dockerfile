FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies based on the preferred lockfile if available
COPY package.json pnpm-lock.yaml* package-lock.json* yarn.lock* ./

# Install pnpm if necessary (for sharp postinstall, pnpm support)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install node_modules
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build Next.js app
RUN if [ "$NODE_ENV" = "production" ]; then pnpm run build; fi

# Expose port (as per compose.yaml and Next.js default)
EXPOSE 3000

# Start the app
CMD pnpm run start
