"use client";

import { Button } from "@/components/ui/button";
import { overlay } from "overlay-kit";
import { InputShare } from "./_components/input-share-dialog";

export default function Home() {
  const handleButton = () => {
    overlay.open(({ isOpen, close }) => (
      <InputShare isOpen={isOpen} onClose={close} />
    ));
  };

  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-auto">
        <Button onClick={handleButton}>Open</Button>
      </main>
    </div>
  );
}
