"use client";

import Link from "next/link";

const UserAccountNavSignedIn = () => {
  return (
    <Link href="/app" className="font-bold rounded px-4 py-2 bg-green-600 underline">
      Todo App &rarr;
    </Link>
  );
};

export default UserAccountNavSignedIn;