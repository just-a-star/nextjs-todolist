import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { hash } from "bcrypt";
import * as z from "zod";
// Define schema for input validation
const userSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  username: z.string().min(1, "Username is required").max(30),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    // check if email is already in use
    const existingUserByEmail = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUserByEmail) {
      return NextResponse.json({ user: null, message: "Email already in use" }, { status: 409 });
    }

    // check if username is already in use
    const existingUserByUsername = await db.user.findFirst({
      where: {
        username,
      },
    });
    if (existingUserByUsername) {
      return NextResponse.json({ user: null, message: "Username already in use" }, { status: 409 });
    }

    // hash password
    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json({ user: rest, message: "User successfully created!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong! Please try again later." }, { status: 500 });
  }
}
