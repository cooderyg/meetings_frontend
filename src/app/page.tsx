"use client";

import { Button } from "@/components/ui/button";
import { CommonDialog } from "./_components/common-dialog";
import { overlay } from "overlay-kit";
import { DataTable } from "./_components/data-table";

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
    <div className="flex flex-col justify-center items-center h-screen gap-6">
      <Button onClick={handleButton}>Open</Button>
      <div className="w-screen border px-6 max-h-[500px] overflow-y-scroll">
        <DataTable />
      </div>
    </div>
  );
}
