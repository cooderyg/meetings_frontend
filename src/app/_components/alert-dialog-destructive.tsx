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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  workspaceName?: string;
  warningText?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  variant?: "destructive" | "default";
}

export function AlertDialogDestructive({
  isOpen,
  onClose,
  title,
  description,
  workspaceName,
  warningText,
  cancelText = "취소",
  confirmText = "삭제",
  onConfirm,
  onCancel,
  variant = "destructive",
}: Props) {
  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md gap-2">
        <AlertDialogHeader className="text-center space-y-3">
          <AlertDialogTitle className="text-lg font-semibold text-gray-900">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-500 leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {workspaceName && (
          <div className="rounded-lg py-[10px] px-3 border border-gray-200 h-10">
            <p className="text-sm font-medium text-slate-500">
              {workspaceName}
            </p>
          </div>
        )}

        {warningText && (
          <p className="text-sm text-red-600 leading-5">{warningText}</p>
        )}

        <AlertDialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:gap-2">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="w-full min-w-20 h-10 sm:w-auto text-sm"
            >
              {cancelText}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={variant}
              onClick={handleConfirm}
              className="justify-center gap-1 w-full min-w-20 h-10 sm:w-auto bg-red-600 hover:bg-red-700 text-white text-sm"
            >
              <Trash2 size={16} color="white" />
              {confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
