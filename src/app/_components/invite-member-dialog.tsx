"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, Plus, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MemberPermissionDropdown } from "./member-permission-dropdown";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (data: SpaceData) => void;
}

interface SpaceData {
  name: string;
  isPrivate: boolean;
  participants: Array<{
    name: string;
    email: string;
    permission: string;
  }>;
}

const permissions = [
  { value: "admin", label: "admin" },
  { value: "full_edit", label: "full edit" },
  { value: "can_edit", label: "can edit" },
  { value: "can_view", label: "can view" },
];

export function InviteMemberDialog({ isOpen, onClose, onConfirm }: Props) {
  const [spaceName, setSpaceName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<string>("admin");

  const handlePermissionSelect = (permission: string) => {
    setSelectedPermission(permission);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0" showCloseButton={false}>
        {/* Header */}
        <DialogHeader className="p-6 relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-lg font-semibold">
                멤버 초대
              </DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="absolute right-[10px] top-[10px] p-1.5 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 text-slate-900" />
            </button>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Input
              placeholder="이메일을 입력해 주세요."
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              className="border py-2 px-3 border-slate-200 text-sm h-10 outline-1 outline-white rounded-[6px]"
            />
            <Button className="h-10 w-20" variant={"default"}>
              초대
            </Button>
          </div>
          <div className="flex justify-between items-center ">
            <p className="text-sm font-medium text-slate-950">권한 선택</p>
            <div className="flex flex-col gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-32 justify-between text-sm border-gray-300"
                  >
                    {permissions.find((p) => p.value === selectedPermission)
                      ?.label || selectedPermission}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-[192px]"
                  side="bottom"
                  align="start"
                >
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
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
