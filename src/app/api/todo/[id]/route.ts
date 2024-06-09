import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { db } from "../../../../lib/db";
import type { Todo } from "@prisma/client";
import session, { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "../../../../lib/auth";

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
    }

    const userId = session.user.id;
    const todo = await db.todo.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ todo, message: "Todo successfully deleted!" }, { status: 200 });
  } catch (error) {
    // console.log("Error deleting todo: ", error);
    return NextResponse.json({ message: "Something went wrong! Please try again later." }, { status: 500 });
  }
};

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
    }
    const userId = session.user.id;
    const body = await req.json();
    // validate req body
    if (!body.title || !body.dueDate || !body.categoryId) {
      return NextResponse.json({ message: "Missing required fields!" }, { status: 400 });
    }
    const todo = await db.todo.update({
      where: {
        id: params.id,
      },
      data: {
        title: body.title,
        dueDate: new Date(body.dueDate),
        categoryId: body.categoryId,
        userId: userId,
        completed: body.completed,
      },
    });

    return NextResponse.json({ todo, message: "Todo successfully deleted!" }, { status: 200 });
  } catch (error) {
    // console.log("Error deleting todo: ", error);
    return NextResponse.json({ message: "Something went wrong! Please try again later." }, { status: 500 });
  }
};
