"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

export function CustomBreadcrumb() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <SidebarTrigger size={"lg"} />

        <BreadcrumbSeparator className="h-4">
          <Separator orientation="vertical" className="bg-slate-200" />
        </BreadcrumbSeparator>

        <BreadcrumbItem>
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger className="flex items-center gap-2">
              <span>general</span>
              {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbPage>
            <span className="text-xs text-slate-950 bg-white px-2 py-0.5 border border-slate-200 rounded-[9px]">
              Private
            </span>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
