"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InvitePageProps {
  inviteToken?: string;
  inviterName?: string;
  inviterEmail?: string;
  workspaceName?: string;
  memberCount?: number;
  onAccept?: (token: string) => Promise<void>;
  onDecline?: (token: string) => Promise<void>;
}

export default function AdvancedInvitePage({
  inviteToken = "sample-token",
  inviterName = "Anote",
  inviterEmail = "no-reply@anote.com",
  workspaceName = "지민's Workspace",
  memberCount = 1,
  onAccept,
  onDecline,
}: InvitePageProps) {
  const [status, setStatus] = useState<
    "pending" | "accepting" | "accepted" | "declined"
  >("pending");

  const handleAcceptInvite = async () => {
    setStatus("accepting");
    try {
      await onAccept?.(inviteToken);
      setStatus("accepted");
    } catch (error) {
      setStatus("pending");
      console.error("초대 수락 실패:", error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="w-full max-w-md space-y-8">
        {/* 상단 알림 */}

        <section className="absolute top-[74px] left-[34px]">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <strong className="text-lg text-black">
                [Anote] (보낸이)님이 너를 (Workspace이름) Workspace에
                초대했습니다.
              </strong>

              <div className="flex items-center gap-4 mt-10">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {inviterName}
                  </p>
                  <p className="text-sm text-slate-500">{inviterEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="gap-12 shadow-none border-none max-w-[448px]">
          <h1 className="text-[40px] leading-7 text-slate-900 font-abril-fatface mb-12">
            Anote
          </h1>

          <div className="space-y-12 pb-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-5">
                팀 참여를 수락하시겠습니까?
              </h2>
              <div className="rounded-lg flex gap-3">
                <div className="w-10 h-10 bg-gray-900 text-white rounded-lg flex items-center justify-center text-sm font-medium">
                  A
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {workspaceName}
                  </p>
                  <p className="text-sm text-gray-500">멤버 {memberCount}명</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleAcceptInvite}
                disabled={status === "accepting"}
                className="
                  w-full h-12 
                  bg-gray-900 hover:bg-gray-800 
                  text-white font-medium
                  transition-colors
                "
              >
                {status === "accepting" ? "초대 수락 중..." : "초대 수락"}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
