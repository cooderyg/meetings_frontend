"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ProfileAvatarProps } from "../tpye/profile";

const statusTexts = {
  default: "",
  inviting: "초대 중",
  withdrawn: "(탈퇴)",
  "left-workspace": "(이전 멤버)",
  me: "(나)",
};

const sizeClasses = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

export const UserProfileAvatar = ({
  user,
  size = "md",
  className,
}: ProfileAvatarProps) => {
  const statusText = statusTexts[user.status];
  const sizeClass = sizeClasses[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* 아바타 */}
      <Avatar className={cn(sizeClass, "relative")}>
        {user.profileImage &&
        user.status !== "withdrawn" &&
        user.status !== "left-workspace" ? (
          <AvatarImage
            src={user.profileImage}
            alt={user.name}
            className="object-cover"
          />
        ) : null}

        <AvatarFallback className="bg-slate-100 text-slate-500 font-medium">
          {user.status === "inviting" ? (
            <span className="text-sm font-normal">?</span>
          ) : (
            <span className="text-sm font-normal">{user.name.slice(0, 1)}</span>
          )}
        </AvatarFallback>
      </Avatar>

      {/* 사용자 정보 */}
      <div
        className={cn(
          "flex flex-col",
          (user.status === "withdrawn" || user.status === "left-workspace") &&
            "opacity-50"
        )}
      >
        <span className="text-sm font-medium text-slate-950">
          {user.status === "inviting" ? "초대 중" : `${user.name}${statusText}`}
        </span>
        <span className="text-xs text-slate-500">{user.email}</span>
      </div>
    </div>
  );
};
