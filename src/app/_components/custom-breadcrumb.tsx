'use client';

import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface BreadcrumbItem {
   label: string;
   count?: number;
   type: 'text' | 'link' | 'dropdown' | 'count';
   isPrivate?: boolean;
   href?: string;
}

export function CustomBreadcrumb() {
   const isPrivate = false;
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const [isOpen, setIsOpen] = useState(false);
   const tab = searchParams.get('tab');

   const getBreadcrumbs = (): BreadcrumbItem[] => {
      if (pathname === '/') {
         switch (tab) {
            case 'drafts':
               return [{ label: '초안', type: 'count', count: 3 }];
            case 'shared':
               return [{ label: '공유 받은 노트', type: 'text' }];
            default:
               return [{ label: 'general', type: 'dropdown' }];
         }
      }

      if (pathname === '/space') {
         return [
            { label: 'ANote', type: 'link', href: '/space' },
            { label: 'general', type: 'dropdown' },
         ];
      }

      if (pathname === '/space/meeting') {
         return [
            { label: 'ANote', type: 'link', href: '/space' },
            { label: 'general', type: 'dropdown' },
         ];
      }

      if (pathname === '/trash') {
         return [{ label: '휴지통', type: 'text', href: '/trash' }];
      }
      return [];
   };

   const breadcrumbs = getBreadcrumbs();

   return (
      <Breadcrumb>
         <BreadcrumbList>
            <SidebarTrigger size={'lg'} />

            <BreadcrumbSeparator className="h-4">
               <Separator orientation="vertical" className="bg-slate-200" />
            </BreadcrumbSeparator>

            {breadcrumbs.map((item, index) => (
               <BreadcrumbItem key={index} className="flex items-center">
                  {item.type === 'dropdown' && (
                     <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                        <DropdownMenuTrigger className="flex items-center gap-2">
                           <span className="text-slate-950 text-sm">{item.label}</span>
                           {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} color="#020618" />}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                           <DropdownMenuItem>ANote</DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  )}

                  {item.type === 'count' && (
                     <div className="flex items-center gap-2">
                        <span className="text-slate-950 text-sm font-normal">{item.label}</span>
                        {item.count && (
                           <Badge
                              variant="outline"
                              className="text-slate-950 text-sm border-slate-200 bg-white rounded-full px-2.5 py-0.5 font-semibold">
                              {item.count}
                           </Badge>
                        )}
                     </div>
                  )}

                  {item.type === 'text' && <span className="text-slate-950 text-sm font-normal">{item.label}</span>}

                  {item.type === 'link' && (
                     <Link href={item.href || '/'}>
                        <span className="text-slate-950 text-sm font-normal">{item.label}</span>
                     </Link>
                  )}

                  {item.type !== 'dropdown' && index !== breadcrumbs.length - 1 && (
                     // <BreadcrumbSeparator className="h-4 flex items-center">
                     <ChevronRight size={16} color="#64748B" />
                     // </BreadcrumbSeparator>
                  )}
               </BreadcrumbItem>
            ))}

            {isPrivate && (
               <BreadcrumbItem>
                  <BreadcrumbPage>
                     <span className="text-xs text-slate-950 bg-white px-2 py-0.5 border border-slate-200 rounded-[9px]">
                        Private
                     </span>
                  </BreadcrumbPage>
               </BreadcrumbItem>
            )}
         </BreadcrumbList>
      </Breadcrumb>
   );
}
