"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}
		&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URL}
		&response_type=code
		&scope=email profile`;
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="
              w-full h-10 
              bg-slate-900 hover:bg-slate-800 
              text-white font-medium
              flex items-center justify-center gap-1
              transition-colors
            "
    >
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.4994 4.81062C9.47584 4.81062 10.1345 5.2324 10.5101 5.58485L11.9776 4.15196C11.0763 3.31418 9.9034 2.79996 8.4994 2.79996C6.46562 2.79996 4.70918 3.96707 3.85406 5.66574L5.5354 6.97151C5.95718 5.71774 7.12429 4.81062 8.4994 4.81062Z"
          fill="#EA4335"
        />
        <path
          d="M13.4916 8.11551C13.4916 7.68795 13.4569 7.37595 13.3818 7.0524H8.49957V8.98218H11.3654C11.3076 9.46173 10.9956 10.184 10.3022 10.6693L11.9431 11.9404C12.9254 11.0333 13.4916 9.69862 13.4916 8.11551Z"
          fill="#4285F4"
        />
        <path
          d="M5.54116 9.02841C5.43138 8.70485 5.36782 8.35819 5.36782 7.99996C5.36782 7.64174 5.43138 7.29507 5.53538 6.97152L3.85404 5.66574C3.5016 6.37063 3.29938 7.16219 3.29938 7.99996C3.29938 8.83774 3.5016 9.6293 3.85404 10.3342L5.54116 9.02841Z"
          fill="#FBBC05"
        />
        <path
          d="M8.49948 13.2C9.90348 13.2 11.0821 12.7377 11.943 11.9404L10.3021 10.6693C9.86304 10.9755 9.2737 11.1893 8.49948 11.1893C7.12437 11.1893 5.95726 10.2822 5.54126 9.02841L3.85992 10.3342C4.71504 12.0329 6.4657 13.2 8.49948 13.2Z"
          fill="#34A853"
        />
      </svg>
      {isLoading ? "로그인 중..." : "Google로 시작하기"}
    </Button>
  );
}
