import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const pathname = request.nextUrl.pathname;

  // if (pathname.startsWith('/api/auth/google/callback')) {
  //   return NextResponse.next();
  // }

  // if (!session.isLogin) {
  //   if(pathname !== '/login') {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  // }else {
// }


  if (session.isLogin) {
    if (pathname === '/login') {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};