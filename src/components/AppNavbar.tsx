import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import UserAccountNav from "./UserAccountNav";
const Navbar = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session);

  return (
    <div className="w-full flex flex-col items-center py-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-md">
      <p className="m-2">
        Hello, <span className="font-semibold text-semibold text-gray-00">{session?.user.username}!</span>
      </p>

      <div>
        {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link href="/sign-in">
            <Button className="font-bold bg-green-600 underline">Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
