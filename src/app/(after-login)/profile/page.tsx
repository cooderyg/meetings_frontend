"use client";

import { UserProfileAvatar } from "@/app/_components/user-profile-avatar";
import { UserProfile } from "@/app/tpye/profile";
import React from "react";

const exampleUsers: UserProfile[] = [
  {
    id: "1",
    name: "박지민",
    email: "p@example.com",
    profileImage: "https://github.com/shadcn.png",
    status: "default",
  },
  {
    id: "2",
    name: "박지민",
    email: "p@example.com",
    status: "inviting",
  },
  {
    id: "3",
    name: "박지민",
    email: "p@example.com",
    status: "withdrawn",
  },
  {
    id: "4",
    name: "박지민",
    email: "p@example.com",
    status: "left-workspace",
  },
  {
    id: "5",
    name: "박지민",
    email: "p@example.com",
    status: "me",
  },
];

export default function UserProfileExample() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-slate-950">사용자 프로필 예시</h2>

      {/* 전체 프로필 (이름 + 이메일) */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">전체 프로필</h3>
        <div className="space-y-3">
          {exampleUsers.map((user) => (
            <UserProfileAvatar
              key={user.id}
              user={user}
              showName={true}
              showEmail={true}
              size="md"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
