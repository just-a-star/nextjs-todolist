"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const UserAccountNav = () => {
  return (
    <Button onClick={() => signOut({ redirect: true, callbackUrl: `${window.location.origin}/sign-in` })} className="font-bold bg-red-600 px-4 py-2 underline">
      Sign Out
    </Button>
  );
};

export default UserAccountNav;
