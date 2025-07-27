// src/app/(login)/home/page.tsx

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AiBeforeChat from "@/app/_components/ai-chat";

// 전체 컨테이너
export default function HomePage() {
  // 실제 메시지 상태, 전송 로직 등은 생략 (형이 붙이면 됨)
  return (
    <div className="flex h-screen max-h-screen bg-white">
      <div className="bg-slate-500 flex-6"></div>
    </div>
  );
}
