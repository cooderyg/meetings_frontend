'use client';

import { ReactNode, useMemo } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

interface Props {
   children: ReactNode;
}

export function AfterLoginProvider({ children }: Props) {
   const pathname = usePathname();

   const defaultOpen = useMemo(() => {
      const collapsedPaths = ['/space/meeting'];
      return !collapsedPaths.some(path => pathname.startsWith(path));
   }, [pathname]);

   return <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>;
}
