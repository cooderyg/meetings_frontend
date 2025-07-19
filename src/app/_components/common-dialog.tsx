"use client";

import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children?: ReactNode;
  leftBtnText: string;
  rightBtnText: string;
  onLeftBtnClick: () => void;
  onRightBtnClick: () => void;
}

export function CommonDialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  leftBtnText = "Cancel",
  rightBtnText = "Save changes",
  onLeftBtnClick,
  onRightBtnClick,
}: Props) {
  const handleCancel = () => {
    onLeftBtnClick?.();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md gap-0">
        <DialogHeader className="pb-6">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="pt-2 pb-8">
          <div className="border border-dashed border-slate-500 rounded-lg p-6 flex items-center justify-center text-center">
            {children || (
              <div className="text-gray-400">
                <p className="text-base mb-1 italic text-slate-500">
                  Place your content here
                </p>
                <p className="text-sm italic ">with Opt + Cmnd</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            className="py-2 px-4 h-10"
            onClick={handleCancel}
          >
            {leftBtnText}
          </Button>
          <Button
            variant="default"
            className="py-2 px-4 h-10"
            onClick={onRightBtnClick}
          >
            {rightBtnText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
