"use client";

import { useState, SyntheticEvent, SetStateAction } from "react";
import type { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FaEdit } from "react-icons/fa";

type Todo = {
  id: string;
  title: string;
  dueDate: Date;
  category: {
    name: string;
  };
};
const UpdateTodo = ({ categories, todo }: { categories: Category[]; todo: Todo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [dueDate, setDueDate] = useState(todo.dueDate.toString());
  const [category, setCategory] = useState(todo.category.name);

  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch(`/api/todo/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        dueDate,
        categoryId: category,
      }),
    });
    setTitle("");
    setDueDate("");
    setCategory("");
    router.refresh();
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild className="my-2 bg-blue-600 hover:bg-blue-800">
          <Button onClick={handleModal} variant="default">
            <FaEdit />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Update Todo <span className="text-blue-600">{todo.title}</span>?
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate}>
            <div className="space-y-4">
              <div className="form-control w-full">
                <Label htmlFor="taskName" className="font-bold">
                  Task name
                </Label>
                <Input
                  id="taskName"
                  onChange={(e: { target: { value: SetStateAction<string> } }) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Enter your task"
                  value={title}
                  required
                />
              </div>
              <div className="form-control w-full">
                <Label htmlFor="dueDate" className="font-bold">
                  Due date
                </Label>
                <Input id="dueDate" onChange={(e: { target: { value: SetStateAction<string> } }) => setDueDate(e.target.value)} type="date" value={dueDate} required />
              </div>
              <div className="form-control w-full">
                <Label htmlFor="category" className="font-bold">
                  Category
                </Label>
                <Select onValueChange={(value: SetStateAction<string>) => setCategory(value)}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem value={category.id} key={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" onClick={handleModal} variant="secondary">
                Close
              </Button>
              <Button type="submit" variant="default">
                Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateTodo;
