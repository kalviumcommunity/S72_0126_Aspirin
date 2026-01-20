import { NextResponse } from "next/server";
import { handleError } from "@/lib/errorHandler";

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];



export async function GET() {
  try {
    // Simulating an error
    throw new Error("Database connection failed!");
  } catch (error) {
    return handleError(error, "GET /api/users");
  }
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  return NextResponse.json({
    page,
    limit,
    data: users,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "User created", data: body },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ success: false, message: "Token missing" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ success: true, message: "Protected data", user: decoded });
  } catch {
    return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 403 });
  }
}