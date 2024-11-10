# Scouts Aanwezigheden

## Getting Started

1. Clone the repo `git clone https://github.com/stefvan-nieuwenhove/scouts-aanwezigheden.git`
2. Install dependencies `npm install` or `yarn install`
3. Make a .env file with the following content. Find your keys in the Clerk dashboard.

```
NODE_ENV=development
DATABASE_URL=postgresql://postgres:example@localhost:5432/postgres
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL='/sign-in'
NEXT_PUBLIC_CLERK_SIGN_UP_URL='/sign-up'
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL='/'
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL='/'
```

4. Make sure that docker instance is running and run the docker-compose file `npm run db:run` or `yarn db:run`
5. Push the tables to the database `npm run db:push` or `yarn db:push`
6. Make some members with prisma studio `npm run db:studio` or `yarn db:studio`
7. Run the development server `npm run dev` or `yarn dev`

## Tech stack

- Next.js
- Tailwind CSS & Shadcn UI
- Prisma
- Clerk
- React Table
