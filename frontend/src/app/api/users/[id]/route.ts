import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = Number(params.id);

  if (isNaN(userId)) {
    return NextResponse.json(
      { error: "Invalid user ID" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    id: userId,
    name: "Sample User",
  });
}

export async function DELETE() {
  return NextResponse.json(
    { message: "User deleted" },
    { status: 200 }
  );
}
