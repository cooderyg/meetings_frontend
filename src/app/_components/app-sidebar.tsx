'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
   SidebarSeparator,
} from '@/components/ui/sidebar';
import { Pen, Home, Share2, Folder, Lock, Trash2, HelpCircle, Bell, Plus, ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export function AppSidebar() {
   const searchParams = useSearchParams();
   const tab = searchParams?.get('tab') || undefined;

   const workspaceName = "지민's Workspace";
   const workspaceInitial = 'A';
   const userName = '박지민';
   const userEmail = 'm@example.com';
   const notificationCount = 3;
   const trialMinutesRemaining = 298;
   const totalTrialMinutes = 300;
   const draftCount = 3;

   const onNewNote = () => {
      console.log('onNewNote');
   };

   const onUpgrade = () => {
      console.log('onUpgrade');
   };

   const onWorkspaceClick = () => {
      console.log('onWorkspaceClick');
   };

   // 진행률 계산
   const progressPercentage = (trialMinutesRemaining / totalTrialMinutes) * 100;

   return (
      <Sidebar className={cn('border-r')}>
         {/* 헤더 영역 */}
         <SidebarHeader className="border-b border-slate-200">
            <div className="flex items-center gap-3 mb-4">
               <div
                  className="flex items-center justify-between w-full gap-2 cursor-pointer"
                  onClick={onWorkspaceClick}>
                  <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                     <span className="text-white text-sm font-medium">{workspaceInitial}</span>
                  </div>
                  <span className="font-medium text-slate-700">{workspaceName}</span>
                  <ChevronsUpDown className="size-4 text-gray-500" />
               </div>
            </div>

            <Button
               onClick={onNewNote}
               className="w-full justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900">
               <Pen className="size-4" />새 노트 만들기
            </Button>
         </SidebarHeader>

         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupContent>
                  <SidebarMenu>
                     <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={tab === undefined} tooltip="Home">
                           <Link href="/">
                              <Home className="size-4" />
                              <span>Home</span>
                           </Link>
                        </SidebarMenuButton>
                     </SidebarMenuItem>

                     <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="초안" isActive={tab === 'drafts'}>
                           <Link href="/?tab=drafts">
                              <Pen className="size-4" />
                              <span>초안</span>
                              {draftCount > 0 && <SidebarMenuBadge>{draftCount}</SidebarMenuBadge>}
                           </Link>
                        </SidebarMenuButton>
                     </SidebarMenuItem>

                     <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="공유 받은 노트" isActive={tab === 'shared'}>
                           <Link href="/?tab=shared">
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
                           <Link href="/space?tab=general">
                              <Folder className="size-4" />
                              <span>general</span>
                           </Link>
                        </SidebarMenuButton>
                     </SidebarMenuItem>

                     <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Anote팀">
                           <Link href="/space?tab=anote-team">
                              <Lock className="size-4" />
                              <span>Anote팀</span>
                              <span className="text-xs text-slate-950 bg-gray-100 px-2 py-0.5 rounded">Private</span>
                           </Link>
                        </SidebarMenuButton>
                     </SidebarMenuItem>
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            {/* 유틸리티 메뉴 */}
            {/* <SidebarGroup>
               <SidebarGroupContent>
                  <SidebarMenu>
                     <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="휴지통">
                           <Link href="/trash">
                              <Trash2 className="size-4" />
                              <span>휴지통</span>
                           </Link>
                        </SidebarMenuButton>
                     </SidebarMenuItem>

                     <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="도움말">
                           <Link href={'/help'}>
                              <HelpCircle className="size-4" />
                              <span>도움말</span>
                           </Link>
                        </SidebarMenuButton>
                     </SidebarMenuItem>
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup> */}
         </SidebarContent>

         {/* 업그레이드 섹션 */}
         <SidebarFooter>
            <div className="bg-white from-blue-50 border border-slate-200 to-indigo-50 rounded-lg p-4">
               <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-semibold text-slate-900">Pro로 업그레이드</h3>
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
               <Button onClick={onUpgrade} className="w-full bg-slate-900 hover:bg-slate-950 text-white text-sm">
                  업그레이드
               </Button>
            </div>
         </SidebarFooter>

         {/* 사용자 프로필 */}
         <SidebarFooter className="border-t border-gray-100">
            <div className="flex items-center gap-3">
               <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                     <span className="text-white text-sm font-medium">{userName.charAt(0)}</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                     <span className="text-white text-xs font-medium">{notificationCount}</span>
                  </div>
               </div>
               <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{userName}</p>
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
