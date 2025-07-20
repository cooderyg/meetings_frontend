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
import { Plus, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MemberPermissionDropdown } from "./Member-permission-dropdown";

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

export function MemberDialog({ isOpen, onClose, onConfirm }: Props) {
  const [spaceName, setSpaceName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [participants] = useState([
    {
      name: "박지민",
      email: "p@example.com",
      permission: "can edit",
    },
    {
      name: "박지민",
      email: "p@example.com",
      permission: "can edit",
    },
    {
      name: "박지민",
      email: "p@example.com",
      permission: "can edit",
    },
  ]);

  const handleConfirm = () => {
    const data: SpaceData = {
      name: spaceName,
      isPrivate,
      participants,
    };
    onConfirm?.(data);
    onClose();
  };

  const getMemberList = () => {
    return (
      <>
        {participants.map((participant, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
              지
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {participant.name}
              </p>
              <p className="text-sm text-gray-500">{participant.email}</p>
            </div>
            <MemberPermissionDropdown
              currentPermission="can_edit"
              onPermissionChange={(permission) => {
                console.log("권한 변경:", permission);
                // 참여자 권한 업데이트 로직
              }}
              onResend={() => {
                console.log("초대 재전송");
                // 초대 재전송 로직
              }}
              onDelete={() => {
                console.log("멤버 삭제");
                // 멤버 삭제 로직
              }}
              memberName="박지민"
            />
            {/* <Select defaultValue={participant.permission}>
              <SelectTrigger className="w-32 h-8 text-sm border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="can edit">admin</SelectItem>
                <SelectItem value="can view">full edit</SelectItem>
                <SelectItem value="admin">can edit</SelectItem>
                <SelectItem value="admin">can view</SelectItem>
                <SelectItem value="admin">guest</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
        ))}
      </>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0" showCloseButton={false}>
        {/* Header */}
        <DialogHeader className="p-6 relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-lg font-semibold">멤버</DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="absolute right-[10px] top-[10px] p-1.5 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 text-slate-900" />
            </button>
          </div>
        </DialogHeader>

        <div className="px-6">
          <label className="flex justify-start items-center relative py-2.5 px-3 border-b border-gray-200 outline-0 focus-visible:border-slate-950">
            <Search size={16} color="#020618" className="mr-2 opacity-50" />
            <input
              type="text"
              className="outline-0 text-sm placeholder:opacity-50 text-slate-950 placeholder:text-slate-950"
              placeholder="멤버 찾기"
            />
          </label>
        </div>

        <div className="p-6">
          {/* 참여자 */}
          <div>
            <p className="text-sm font-medium text-slate-500">6명</p>
            <div className="flex items-center gap-4 mt-6">
              <span className="border border-slate-200 rounded-full h-10 w-10 flex justify-center items-center">
                <Plus size={16} color="#020618" />
              </span>
              <span className="text-slate-950 text-sm">멤버 초대</span>
            </div>
            <div className="py-6 flex flex-col gap-6">{getMemberList()}</div>
          </div>

          {/* 미 참여자 */}
          <div className="mt-6">
            <p className="text-sm font-medium text-slate-500">미 참여자</p>
            <div className="py-6 flex flex-col gap-6">{getMemberList()}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
