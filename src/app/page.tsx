"use client";

import { Button } from "@/components/ui/button";
import { overlay } from "overlay-kit";
import { MemberDialog } from "./_components/member-dialog";
import { InviteMemberDialog } from "./_components/invite-member-dialog";
import { InputShare } from "./_components/input-share-dialog";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Home() {
  const handleButton = () => {
    overlay.open(({ isOpen, close }) => (
      <InputShare isOpen={isOpen} onClose={close} />
    ));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6">
      <Button onClick={handleButton}>Open</Button>
    </div>
  );
}
