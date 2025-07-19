"use client";

import { Button } from "@/components/ui/button";
import { CommonDialog } from "./_components/common-dialog";
import { overlay } from "overlay-kit";

export default function Home() {
  const handleButton = () => {
    overlay.open(({ isOpen, close }) => (
      <CommonDialog
        isOpen={isOpen}
        onClose={close}
        title="Title"
        description="Description"
        leftBtnText="Cancel"
        rightBtnText="Save changes"
        onLeftBtnClick={() => {
          console.log("Cancel");
        }}
        onRightBtnClick={() => {
          console.log("Delete");
        }}
      />
    ));
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <Button onClick={handleButton}>Open</Button>
    </div>
  );
}
