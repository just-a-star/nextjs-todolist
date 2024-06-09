"use client";

import { useState, SyntheticEvent, SetStateAction } from "react";

import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DialogDescription } from "@radix-ui/react-dialog";
import { FaTrashAlt } from "react-icons/fa";

type Todo = {
  id: string;
  title: string;
  dueDate: Date;
  category: {
    name: string;
  };
};

const DeleteTodo = ({ todo }: { todo: Todo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");

  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (todoId: string) => {
    await fetch(`/api/todo/${todoId}`, {
      method: "DELETE",
    });

    router.refresh();
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild className="my-2">
          <Button onClick={handleModal} variant="destructive" className="hover:bg-red-800">
            <FaTrashAlt />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete this <span className="font-bold">{todo.title}</span>?
          </DialogDescription>

          <DialogFooter className="mt-4">
            <Button type="button" onClick={handleModal} variant="secondary">
              No
            </Button>
            <Button type="button" onClick={() => handleDelete(todo.id)} variant="destructive">
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteTodo;
