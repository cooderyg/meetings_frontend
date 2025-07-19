"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { CustomSwitch } from "./custom-switch";

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

export function SpaceCreateDialog({ isOpen, onClose, onConfirm }: Props) {
  const [spaceName, setSpaceName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [participants] = useState([
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0" showCloseButton={false}>
        {/* Header */}
        <DialogHeader className="p-6 relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-lg font-semibold">
                Space 생성
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

        <div className="py-2 px-6">
          {/* 이름 입력 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">이름</label>
            </div>
            <Input
              placeholder="Space 이름을 입력해 주세요."
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              className="rounded-xl border py-2 px-3 border-slate-200 text-sm h-10 outline-1 outline-white"
            />
          </div>

          {/* Private 설정 */}
          <div className="space-y-4 mt-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-between flex-1">
                <div>
                  <p className="text-sm font-medium">Private 설정</p>
                </div>
                <CustomSwitch
                  checked={isPrivate}
                  onCheckedChange={setIsPrivate}
                  size="md"
                  className="data-[state=checked]:bg-gray-900"
                />
              </div>
            </div>
          </div>

          {/* 미 참여자 */}
          <div className="space-y-4 mt-6">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-slate-500">미 참여자</p>
            </div>

            {/* 참여자 목록 */}
            <div className="mt-6">
              {participants.map((participant, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                    지
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {participant.name}
                    </p>
                    <p className="text-sm text-gray-500">{participant.email}</p>
                  </div>
                  <Select defaultValue={participant.permission}>
                    <SelectTrigger className="w-32 h-8 text-sm border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="can edit">can edit</SelectItem>
                      <SelectItem value="can view">can view</SelectItem>
                      <SelectItem value="admin">admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 justify-end p-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6 py-2 h-10 rounded-lg"
          >
            취소
          </Button>
          <Button
            onClick={handleConfirm}
            className="px-6 py-2 h-10 rounded-lg bg-gray-900 hover:bg-gray-800 text-white"
          >
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
