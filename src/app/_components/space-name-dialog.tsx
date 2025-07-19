import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SpaceNameDialog({ isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6 gap-8">
        <DialogHeader className="">
          <DialogTitle className="text-xl font-semibold">
            Space 이름 변경
          </DialogTitle>
        </DialogHeader>

        <div className="">
          <div>
            <label className="text-base font-medium mb-2 block">이름</label>
            <Input
              defaultValue="Anote 팀"
              className="rounded-xl border py-2 px-3 border-slate-200 text-sm h-10 outline-1 outline-white"
            />
          </div>

          <div className="flex gap-3 justify-end pt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6 py-2 rounded-lg"
            >
              취소
            </Button>
            <Button className="px-6 py-2 rounded-lg bg-gray-900 hover:bg-gray-800">
              확인
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
