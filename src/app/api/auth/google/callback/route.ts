import { http } from '@/app/api/http';
import { NextResponse } from 'next/server';

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
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }
  try {
    const data: GoogleLoginResponse = await http.post(`/auth/sign-in/google`, {
      code,
    });

    const redirectResponse = NextResponse.redirect(new URL('/', request.url));

    redirectResponse.cookies.set({
      name: 'accessToken',
      value: data.data.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60,
    });

    redirectResponse.cookies.set({
      name: 'refreshToken',
      value: data.data.refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    });

    return redirectResponse;
  } catch (error) {
    console.error('Google login error:', error);
    return NextResponse.redirect(new URL('/not-found', request.url));
  }
}
