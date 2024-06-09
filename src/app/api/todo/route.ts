import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { db } from "../../../lib/db";
import type { Todo } from "@prisma/client";
import session, { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "../../../lib/auth";
export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "You need to be logged in to create a todo!" }, { status: 401 });
    }
    const body: Todo = await req.json();
    const userId = session.user.id;
    // console.log("User ID: ", userId);
    // console.log("seseion: ", session.user);

    // validate req body
    if (!body.title || !body.dueDate || !body.categoryId) {
      return NextResponse.json({ message: "Missing required fields!" }, { status: 400 });
    }
    const newTodo = await db.todo.create({
      data: {
        title: body.title,
        dueDate: new Date(body.dueDate),
        categoryId: body.categoryId,
        userId: userId,
        completed: false,
      },
    });

    return NextResponse.json({ todo: newTodo, message: "Todo successfully created!" }, { status: 201 });
  } catch (error) {
    // console.log("Error creating todo: ", error);
    return NextResponse.json({ message: "Something went wrong! Please try again later." }, { status: 500 });
  }
};
