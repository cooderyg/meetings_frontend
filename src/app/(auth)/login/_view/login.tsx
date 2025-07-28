"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { redirect } from "next/navigation";
import { postGoogleCode } from "@/app/api/action/post-google-code";
import { use, useEffect } from "react";
import GoogleLoginButton from "./gogle-login-button";

interface Props {
  code: string;
}

export default async function Login({ code }: Props) {
  console.log("code:", code);

  useEffect(() => {
    if (code) {
      try {
        fetch(`${process.env.NEXT_PUBLIC_APP_URL}/auth/sign-in/google`, {
          method: "POST",
          body: JSON.stringify({ code }),
        });
      } catch (error) {
        console.error("OAuth callback error:", error);
      }
    }
  }, [code]);

  return (
    <div className="h-full flex items-center justify-center px-4">
      <Card className="w-full max-w-[352px] border-none shadow-none gap-9 p-0">
        <CardHeader className="text-center">
          <h1 className="text-[40px] leading-7 font-bold text-slate-900 font-abril-fatface">
            Anote
          </h1>
        </CardHeader>

        <CardContent className="border border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center gap-6">
          <CardTitle className="text-xl font-semibold text-slate-950 mb-2">
            로그인 또는 회원가입
          </CardTitle>
          <GoogleLoginButton />
        </CardContent>
      </Card>
    </div>
  );
}
