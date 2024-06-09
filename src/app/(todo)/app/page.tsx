import AppNavbar from "@/components/AppNavbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { db } from "@/lib/db";
import CreateTodo from "./createTodo";
import DeleteTodo from "./deleteTodo";
import UpdateTodo from "./updateTodo";
import { formatDistanceToNow } from "date-fns";

const getTodos = async () => {
  const res = await db.todo.findMany({
    select: {
      id: true,
      title: true,
      dueDate: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return res;
};

const getCategories = async () => {
  const res = await db.category.findMany();
  return res;
};

const categoryColors: { [key: string]: string } = {
  Personal: "bg-blue-600",
  Work: "bg-blue-600",
  Shopping: "bg-orange-600",
};

const App = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  const [todos, categories] = await Promise.all([getTodos(), getCategories()]);

  if (!session) {
    return (
      <main className="bg-gray-50 flex min-h-screen flex-col items-center p-6">
        <AppNavbar />
        <h1 className="text-xl font-bold my-4">You need to be logged in to view your to do list.</h1>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 flex min-h-screen flex-col items-center p-6">
      <AppNavbar />
      <h1 className="text-xl font-bold my-4">Your to do list</h1>
      <CreateTodo categories={categories} />
      <section className="flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Task</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Due Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id} className="even:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{todo.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatDistanceToNow(new Date(todo.dueDate), { addSuffix: true })}</td>
                  <td className={`border border-gray-300 px-4 py-2 `}>
                    <span className={`px-2 p-2 text-white text-sm font-medium rounded-xl py-2 ${categoryColors[todo.category.name] || "bg-gray-600"}`}>
                      {todo.category.name}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex flex-row space-x-2">
                      <UpdateTodo todo={todo} categories={categories} />
                      <DeleteTodo todo={todo} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default App;
