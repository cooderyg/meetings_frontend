// src/app/_components/sidebar.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  ChevronUp,
  Pen,
  Home,
  Share2,
  Folder,
  Lock,
  Trash2,
  HelpCircle,
  Bell,
  Plus,
  Crown,
  ChevronsUpDown,
} from "lucide-react";
import Link from "next/link";

// 사이드바 아이템 인터페이스
interface ISidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
}

// 스페이스 아이템 인터페이스
interface ISpaceItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  isPrivate?: boolean;
  href?: string;
}

// 사이드바 컴포넌트 Props
interface ISidebarProps {
  className?: string;
  workspaceName?: string;
  workspaceInitial?: string;
  userName?: string;
  userEmail?: string;
  notificationCount?: number;
  trialMinutesRemaining?: number;
  totalTrialMinutes?: number;
  draftCount?: number;
  onNewNote?: () => void;
  onUpgrade?: () => void;
  onWorkspaceClick?: () => void;
}

export function AppSidebar({
  className,
  workspaceName = "지민's Workspace",
  workspaceInitial = "A",
  userName = "박지민",
  userEmail = "m@example.com",
  notificationCount = 3,
  trialMinutesRemaining = 298,
  totalTrialMinutes = 300,
  draftCount = 3,
  onNewNote,
  onUpgrade,
  onWorkspaceClick,
  ...props
}: ISidebarProps) {
  // 진행률 계산
  const progressPercentage = (trialMinutesRemaining / totalTrialMinutes) * 100;

  return (
    <Sidebar className={cn("border-r", className)} {...props}>
      {/* 헤더 영역 */}
      <SidebarHeader className="border-b border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="flex items-center justify-between w-full gap-2 cursor-pointer"
            onClick={onWorkspaceClick}
          >
            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {workspaceInitial}
              </span>
            </div>
            <span className="font-medium text-slate-700">{workspaceName}</span>
            <ChevronsUpDown className="size-4 text-gray-500" />
          </div>
        </div>

        <Button
          onClick={onNewNote}
          className="w-full justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900"
        >
          <Pen className="size-4" />새 노트 만들기
        </Button>
      </SidebarHeader>

      {/* 메인 컨텐츠 영역 */}
      <SidebarContent>
        {/* 메인 네비게이션 */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={true} tooltip="Home">
                  <Link href="/">
                    <Home className="size-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="초안">
                  <Link href="/drafts">
                    <Pen className="size-4" />
                    <span>초안</span>
                    {draftCount > 0 && (
                      <SidebarMenuBadge>{draftCount}</SidebarMenuBadge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="공유 받은 노트">
                  <Link href="shared">
                    <Share2 className="size-4" />
                    <span>공유 받은 노트</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* 스페이스 섹션 */}
        <SidebarGroup>
          <SidebarGroupLabel>
            Space
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="size-4" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="general">
                  <Link href="/spaces/general">
                    <Folder className="size-4" />
                    <span>general</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Anote팀">
                  <Link href="/spaces/anote-team">
                    <Lock className="size-4" />
                    <span>Anote팀</span>
                    <span className="text-xs text-slate-950 bg-gray-100 px-2 py-0.5 rounded">
                      Private
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* 유틸리티 메뉴 */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="휴지통">
                  <Link href="/trash">
                    <Trash2 className="size-4" />
                    <span>휴지통</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="도움말">
                  <Link href={"/help"}>
                    <HelpCircle className="size-4" />
                    <span>도움말</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 업그레이드 섹션 */}
      <SidebarFooter>
        <div className="bg-white from-blue-50 border border-slate-200 to-indigo-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-2xl font-semibold text-slate-900">
              Pro로 업그레이드
            </h3>
          </div>
          <p className="text-sm text-slate-600 mb-3">
            {trialMinutesRemaining}분 남음 / {totalTrialMinutes}분
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div
              className="bg-slate-900 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <Button
            onClick={onUpgrade}
            className="w-full bg-slate-900 hover:bg-slate-950 text-white text-sm"
          >
            업그레이드
          </Button>
        </div>
      </SidebarFooter>

      {/* 사용자 프로필 */}
      <SidebarFooter className="border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {userName.charAt(0)}
              </span>
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">
                {notificationCount}
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {userName}
            </p>
            <p className="text-xs text-slate-500 truncate">{userEmail}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 relative">
            <Bell className="size-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
