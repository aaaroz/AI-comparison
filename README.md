# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

  Project run instructions

   1. Prerequisites

   - Node 18+ and npm
   - Docker (and optionally docker-compose)
   - Environment variables (see .env section)

   2. Install

   - Clone repo and cd into it
   - npm install
   - npm run build (optional for production)

   3. Create .env (example)
   Paste into .env at project root:
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gemini?schema=public"
   GEMINI_API_KEY="your_gemini_api_key"
   ALIBABA_API_KEY="your_alibaba_api_key"
   ALIBABA_API_URL="https://your-alibaba-endpoint.example.com (https://your-alibaba-endpoint.example.com)"

  (ALIBABA_API_URL is used as OpenAI-client baseURL to call Qwen)

   4. Run a PostgreSQL DB with Docker (quick)
   docker run --name gemini-db 
     -e POSTGRES_USER=postgres 
     -e POSTGRES_PASSWORD=postgres 
     -e POSTGRES_DB=gemini 
     -p 5432:5432 
     -d postgres:15

  Wait a few seconds for DB to initialize. Confirm with:
  docker logs gemini-db

  Alternative: build/run a Dockerfile (if you have one)

  build

  docker build -t my-postgres -f path/to/Dockerfile .

  run

  docker run --name gemini-db -p 5432:5432 -d my-postgres
  (Use your Dockerfile’s env/config as appropriate.)

  Optional: docker-compose snippet (paste to docker-compose.yml)
  version: "3.8"
  services: db:
      image: postgres:15
      environment:
        POSTGRES_USER: postgres
        POSTGRES_PASSWORD: postgres
        POSTGRES_DB: gemini
      ports:
        - "5432:5432"
      volumes:
        - db-data:/var/lib/postgresql/data
  volumes:
    db-data:

  Start: docker compose up -d

   5. Prisma setup (generate & migrate)

   - npm install prisma --save-dev (if not present)
   - npx prisma generate
   - If using migrations (repo has prisma/migrations), run:
   npx prisma migrate deploy
   OR for local dev (apply and create client):
   npx prisma migrate dev --name init
   - To inspect DB: npx prisma studio

   6. Start app

   - Development: npm run dev
   - Visit: http://localhost:3000/compare (http://localhost:3000/compare)

   7. Notes & troubleshooting

   - Ensure DATABASE_URL matches the DB container host/port.
   - Ensure ALIBABA_API_URL and ALIBABA_API_KEY are set (OpenAI SDK uses baseURL to reach Qwen).
   - Install OpenAI SDK if not present: npm install openai
   - If you change Prisma schema, run npx prisma migrate dev (dev) or npx prisma migrate deploy (prod).
   - Logs: check Next.js terminal output and docker logs gemini-db.
