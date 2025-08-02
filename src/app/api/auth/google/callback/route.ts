import { NextResponse } from "next/server";

type Status = {
  code: number;
  message: string;
};

interface GoogleLoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    status: Status;
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  console.log("======code======", code);

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code", request.url));
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/auth/sign-in/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data: GoogleLoginResponse = await response.json();

    const redirectResponse = NextResponse.redirect(
      new URL("/", request.url)
    );

    
    redirectResponse.cookies.set({
      name: "accessToken",
      value: data.data.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      path: "/", 
      sameSite: "strict",
      maxAge: 60 * 60, 
    });

    
    redirectResponse.cookies.set({
      name: "refreshToken",
      value: data.data.refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, 
    });

    return redirectResponse;
  } catch (error) {
    console.error("Google login error:", error);
    return NextResponse.redirect(
      new URL("/login?error=login_failed", request.url)
    );
  }
}
