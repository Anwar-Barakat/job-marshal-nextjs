import { handlers } from "@/utils/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Handle OAuth callback errors
async function handleAuth(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<Response>
) {
  try {
    const response = await handler(request);
    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.redirect(
      new URL("/login?error=AuthenticationFailed", request.url)
    );
  }
}

export async function GET(request: NextRequest) {
  return handleAuth(request, handlers.GET);
}

export async function POST(request: NextRequest) {
  return handleAuth(request, handlers.POST);
}
