import Link from "next/link";
import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col h-screen p-5">
      <section className="flex-1">{children}</section>
      <footer>
        <div className="text-center space-y-2">
          <p className="text-sm text-slate-500">
            계정을 등록하면 Anote의&nbsp;
            <Link href={""} className="underline underline-offset-2">
              이용약관
            </Link>
            과&nbsp;
            <Link href={""} className="underline underline-offset-2">
              개인정보 정책
            </Link>
            에 동의하게 됩니다.
          </p>

          <p className="text-xs text-slate-500 leading-relaxed">
            This site is protected by reCAPTCHA and the Google&nbsp;
            <Link href={""} className="underline underline-offset-2">
              Privacy Policy&nbsp;
            </Link>
            and&nbsp;
            <Link href={""} className="underline underline-offset-2">
              Terms of Service
            </Link>
            apply.
          </p>
        </div>
      </footer>
    </main>
  );
}
