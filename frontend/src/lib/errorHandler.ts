import { NextResponse } from "next/server";
import { logger } from "./logger";

export function handleError(error: any, context: string) {
  const isProd = process.env.NODE_ENV === "production";

  const response = {
    success: false,
    message: isProd
      ? "Something went wrong. Please try again later."
      : error.message || "Unknown error",
    ...(isProd ? {} : { stack: error.stack }),
  };

  logger.error(`Error in ${context}`, {
    message: error.message,
    stack: isProd ? "REDACTED" : error.stack,
  });

  return NextResponse.json(response, { status: 500 });
}
