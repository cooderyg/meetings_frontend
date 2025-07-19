"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus } from "lucide-react";

interface Props {
  title: string;
  description: string;
  leftBtnText: string;
  rightBtnText: string;
  onLeftBtnClick?: () => void;
  onRightBtnClick?: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ConfirmDialog({
  title,
  description,
  leftBtnText,
  rightBtnText,
  onLeftBtnClick,
  onRightBtnClick,
  isOpen,
  onClose,
}: Props) {
  const handleLeftClick = () => {
    onLeftBtnClick?.();
  };

  const handleRightClick = () => {
    onRightBtnClick?.();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleLeftClick}>
            {leftBtnText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleRightClick}>
            <Plus />
            {rightBtnText}
            <Plus />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
