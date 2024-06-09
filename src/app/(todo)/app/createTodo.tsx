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

const CreateTodo = ({ categories }: { categories: Category[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");

  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch("/api/todo", {
      method: "POST",
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
        <DialogTrigger asChild className="my-2">
          <Button onClick={handleModal} className="bg-green-600 hover:bg-green-800" variant="default">
            Add New Todo
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Todo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
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
                  required
                />
              </div>
              <div className="form-control w-full">
                <Label htmlFor="dueDate" className="font-bold">
                  Due date
                </Label>
                <Input id="dueDate" onChange={(e: { target: { value: SetStateAction<string> } }) => setDueDate(e.target.value)} type="date" required />
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
              <Button type="submit" className="bg-green-600 hover:bg-green-800" variant="default">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTodo;
