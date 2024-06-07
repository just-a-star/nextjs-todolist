import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <main className="bg-gray-50 flex min-h-screen flex-col items-center p-24">
      <h1>Welcome to Next To Do List</h1>
    </main>
  );
};

export default page;
