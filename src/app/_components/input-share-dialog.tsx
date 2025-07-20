import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function InputShare({ isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="gap-6 p-6">
        <DialogHeader>
          <DialogTitle className="font-semibold">비밀번호 공유</DialogTitle>
          <DialogDescription className="text-slate-500">
            공유받은 비밀번호를 입력해 주세요. 붙여넣기도 돼요.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-2 pb-6 flex flex-col gap-2 items-center justify-center">
          <InputOTP maxLength={6}>
            <InputOTPGroup className="*:w-10 *:h-10">
              <InputOTPSlot
                index={0}
                className="z-10 bg-white data-[active=true]:z-[-1]"
              />
              <InputOTPSlot
                index={1}
                className="z-10 bg-white data-[active=true]:z-[-1]"
              />
              <InputOTPSlot
                index={2}
                className="z-20 bg-white data-[active=true]:z-[-1]"
              />
            </InputOTPGroup>
            <div className="flex items-center justify-center w-4">
              <div className="min-w-1.5 min-h-1.5 bg-slate-950 rounded-full mx-2"></div>
            </div>
            <InputOTPGroup className="*:w-10 *:h-10">
              <InputOTPSlot
                index={3}
                className="z-10 bg-white data-[active=true]:z-[-1]"
              />
              <InputOTPSlot
                index={4}
                className="z-10 bg-white data-[active=true]:z-[-1]"
              />
              <InputOTPSlot
                index={5}
                className="z-10 bg-white data-[active=true]:z-[-1]"
              />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-red-600 text-sm">비밀번호를 입력해주세요.</p>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button variant={"outline"}>취소</Button>
          <Button variant={"default"}>확인</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
