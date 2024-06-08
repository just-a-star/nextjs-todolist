import AppNavbar from "@/components/AppNavbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <main className="bg-gray-50 flex min-h-screen flex-col items-center p-6">
      <AppNavbar />
      <h1>Welcome to Next To Do List {session?.user.username}</h1>
    </main>
  );
};

export default Page;
