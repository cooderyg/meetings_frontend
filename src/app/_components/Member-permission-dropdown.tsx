"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Trash2 } from "lucide-react";
import { useState } from "react";

interface MemberPermissionDropdownProps {
  currentPermission: string;
  onPermissionChange: (permission: string) => void;
  onResend?: () => void;
  onDelete?: () => void;
  memberName: string;
}
const permissions = [
  { value: "admin", label: "admin" },
  { value: "full_edit", label: "full edit" },
  { value: "can_edit", label: "can edit" },
  { value: "can_view", label: "can view" },
  { value: "guest", label: "guest" },
];

export function MemberPermissionDropdown({
  currentPermission,
  onPermissionChange,
  onResend,
  onDelete,
  memberName,
}: MemberPermissionDropdownProps) {
  const [selectedPermission, setSelectedPermission] =
    useState(currentPermission);

  const handlePermissionSelect = (permission: string) => {
    setSelectedPermission(permission);
    onPermissionChange(permission);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-32 justify-between text-sm border-gray-300"
        >
          {permissions.find((p) => p.value === selectedPermission)?.label ||
            selectedPermission}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40">
        {permissions.map((permission) => (
          <DropdownMenuCheckboxItem
            key={permission.value}
            onClick={() => handlePermissionSelect(permission.value)}
            checked={selectedPermission === permission.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            {permission.label}
          </DropdownMenuCheckboxItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onResend}
          className="flex items-center gap-2 cursor-pointer pl-8"
        >
          <span>재 전송</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Trash2 className="h-4 w-4" color="#020618" />
          <span>삭제</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
