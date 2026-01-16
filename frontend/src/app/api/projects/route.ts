import { prisma } from "@/lib/prisma";
import { sendSuccess, sendError } from "@/lib/responseHandler";
import { userSchema } from "@/schemas/userSchema";
import { ZodError } from "zod";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return sendSuccess(users, "Users fetched successfully");
  } catch (error) {
    return sendError("Failed to fetch users", "DATABASE_FAILURE", 500, error);
  }
}

export async function POST(req: Request) {
    try {
      const body = await req.json();
      const validatedData = userSchema.parse(body);
  
      return NextResponse.json({
        success: true,
        message: "User created successfully",
        data: validatedData,
      }, { status: 201 });
  
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({
          success: false,
          message: "Validation Error",
          errors: error.errors.map(e => ({
            field: e.path[0],
            message: e.message,
          })),
        }, { status: 400 });
      }
  
      return NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }