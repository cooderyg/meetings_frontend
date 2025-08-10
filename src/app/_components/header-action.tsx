'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SharePopover } from './share-popover';
import { usePathname } from 'next/navigation';
import { AIPopover } from './ai-popover';
import { PublishPopover } from './publish-popover';

interface IHeaderActionsProps {
   userCount?: number;
}

export function HeaderActions({ userCount = 2 }: IHeaderActionsProps) {
   const displayCount = userCount >= 99 ? '99+' : userCount.toString();
   const pathname = usePathname();
   console.log('pathname', pathname);

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
               <span className="text-sm font-medium text-slate-700">{displayCount}</span>
            </div>
         </Button>

         {/* 공유하기, AI, 발행하기 */}
         {pathname === '/space/meeting' && (
            <>
               <SharePopover />
               <AIPopover />
               <PublishPopover />
            </>
         )}
      </div>
   );
}
