import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Todo } from "@prisma/client";

const prisma = new PrismaClient();

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const db = prisma;
