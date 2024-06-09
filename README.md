

# nextjs-todolist-w-prisma-postgresql

This is a to-do list application created with Next.js 14. You can use it to manage your tasks efficiently. For a preview, visit the deployed website: [https://nextjs-todolist-bintang-rahmatullahs-projects.vercel.app/](https://nextjs-todolist-bintang-rahmatullahs-projects.vercel.app/), which is deployed using Vercel with its Vercel Postgres.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (version 18.17.0 or higher)
- npm (version 9 or higher) or yarn (preferably latest, haven't tested this)
- PostgreSQL (a local or remote database instance)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/just-a-star/nextjs-todolist.git
    cd nextjs-todolist
    ```

2. **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Using yarn:
    ```bash
    yarn install
    ```

3. **Set up the environment variables:**
    Create a `.env` file in the root of your project and add the following variables:
    ```bash
    DATABASE_URL="your_database_url_here"
    NEXTAUTH_SECRET="your_nextauth_secret_here"
    ```
    Example `.env.example`:
    ```bash
    DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
    NEXTAUTH_SECRET="your_nextauth_secret_here"
    ```

4. **Generate Prisma Client:**
    ```bash
    npx prisma generate
    ```

5. **Run database migrations:**
    ```bash
    npx prisma migrate dev --name init
    ```

### Running the Development Server

To run the development server, use the following command:

Using npm:
```bash
npm run dev
```
Using yarn:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

### Features

- Sign In/Sign Up
- Protected Routes
- Simple To-Do List (CRUD)
- ~~Dark Mode~~ (Not yet implemented)
- ~~Forgot Password~~ (Not yet implemented)
- ~~Update Profile~~ (Not yet implemented)

### Important Packages

Here are some of the important packages used in this project:

- **@prisma/client**: Prisma Client for database interactions.
- **bcrypt**: Library for hashing passwords.
- **date-fns**: Utility library for manipulating JavaScript dates.
- **next-auth**: Authentication for Next.js.
- **react-hook-form**: Performant, flexible, and extensible forms with easy-to-use validation.
- **react-icons**: Collection of popular icons as React components.
- **tailwindcss**: Utility-first CSS framework for rapidly building custom user interfaces.
- **zod**: TypeScript-first schema declaration and validation library.

---

