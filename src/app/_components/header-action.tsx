"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Pen } from "lucide-react";
import { SharePopover } from "./share-popover";

interface IHeaderActionsProps {
  userCount?: number;
  hasUnreadShares?: boolean;
  onShare?: () => void;
  onAI?: () => void;
  onPublish?: () => void;
}

export function HeaderActions({
  userCount = 2,
  hasUnreadShares = false,
  onShare,
  onAI,
  onPublish,
}: IHeaderActionsProps) {
  const displayCount = userCount >= 99 ? "99+" : userCount.toString();

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" className="h-8 px-3">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:ring-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
          <span className="text-sm font-medium text-slate-700">
            {displayCount}
          </span>
        </div>
      </Button>

      <SharePopover />

      <Button
        size="sm"
        className="h-8 px-3 bg-slate-900 hover:bg-slate-800"
        onClick={onAI}
      >
        <Star className="w-4 h-4 mr-1" />
        <span className="text-sm text-white">AI</span>
      </Button>

      <Button
        size="sm"
        className="h-8 px-3 bg-slate-900 hover:bg-slate-800"
        onClick={onPublish}
      >
        <Pen className="w-4 h-4 mr-1" />
        <span className="text-sm text-white">발행하기</span>
      </Button>
    </div>
  );
}
