"use client";

import { Button } from "@/components/ui/button";
import { overlay } from "overlay-kit";
import SpaceNameDialog from "./_components/space-name-dialog";

export default function Home() {
  const handleButton = () => {
    overlay.open(({ isOpen, close }) => (
      <SpaceNameDialog isOpen={isOpen} onClose={close} />
    ));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6">
      <Button onClick={handleButton}>Open</Button>
    </div>
  );
}
