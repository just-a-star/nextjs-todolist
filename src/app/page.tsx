import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full max-w-4xl text-center">
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">
            Welcome to{" "}
            <a href="https://nextjs.org" className="text-blue-500">
              Next To Do List!
            </a>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">Made with TypeScript, Next.js, PostgreSQL, Shadcn UI, Prisma!</p>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Features</h2>
          <ol className="mt-4 text-lg text-gray-700 dark:text-gray-300 list-disc">
            <li>Sign In/Sign Up</li>
            {/* <li>Forgot Password</li> */}
            {/* <li>Update Profile</li> */}
            {/* <li>Dark Mode</li> */}
            <li>Protected Routes</li>
            <li>Simple To Do List</li>
          </ol>
        </div>

        {/* action login/signup */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Get Started</h2>
          <div className="flex justify-center gap-4 px-20 mt-6">
            <Link href="/sign-in" className="px-8 font-semibold py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
              Login
            </Link>
            <Link className="px-8 py-3 font-semibold bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600" href="/sign-up">
              Sign Up
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
