import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "./ui/button";
import UserAccountNav from "./UserAccountNav";
import UserAccountNavSignedIn from "./UserAccountNavSignedIn";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full flex flex-col items-center py-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-md">
      <div className="flex flex-col items-center justify-between w-full max-w-4xl px-4">
        {session?.user ? (
          <div className="flex flex-col items-center">
            <p className="m-2">You&apos;ve logged in,</p>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <UserAccountNavSignedIn />
              <UserAccountNav />
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <p className="m-2">Get started by making an account&nbsp;</p>
            <Link href="/sign-up">
              <Button className="font-bold bg-green-600 underline">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
