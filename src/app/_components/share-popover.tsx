import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Share2, RotateCw } from "lucide-react";
import { CustomSwitch } from "./custom-switch";
import { useState } from "react";

export function SharePopover() {
  const [isPublic, setIsPublic] = useState(false);
  const [linkExpiration, setLinkExpiration] = useState("7");
  const [isPasswordProtected, setIsPasswordProtected] = useState(true);
  const [password, setPassword] = useState("xjrw2f");
  const [shareLink, setShareLink] = useState(
    "http://example.com/link/to/document"
  );

  const getExpirationDate = (days: string) => {
    if (days === "never") return "만료 없음";
    const date = new Date();
    date.setDate(date.getDate() + parseInt(days));
    date.setHours(18, 45, 0, 0);
    return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, "0")}월 ${String(date.getDate()).padStart(2, "0")}일 ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}까지`;
  };

  const generateNewPassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const handleCopyLink = () => {
    const textToCopy = isPasswordProtected
      ? `${shareLink} (Password: ${password})`
      : shareLink;
    navigator.clipboard.writeText(textToCopy);
    console.log("링크가 복사되었습니다!");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 px-3 relative hover:bg-slate-900 hover:text-white hover:ring-2 hover:ring-slate-900"
          )}
        >
          <Share2 className="w-4 h-4 mr-1" />
          <span className="text-sm">공유</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[423px] p-4">
        <div className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <h4 className="font-semibold text-slate-950 text-lg">노트공유</h4>
            <p className="text-muted-foreground text-sm">
              링크가 있으면 누구나 로그인 후 볼 수 있어요.
            </p>
          </div>

          <div
            className={cn(
              "flex items-center",
              isPublic ? "justify-between" : "space-x-2"
            )}
          >
            <CustomSwitch
              id="airplane-mode"
              size="md"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
            <Label
              htmlFor="airplane-mode"
              className="text-sm text-slate-950 font-medium"
            >
              공개 공유
            </Label>
          </div>

          {isPublic && (
            <>
              <div className="flex items-center justify-between">
                <Label className="text-sm text-slate-950 font-medium">
                  링크 만료일
                </Label>
                <div className="flex flex-col items-end">
                  <Select
                    value={linkExpiration}
                    onValueChange={setLinkExpiration}
                  >
                    <SelectTrigger className="w-[120px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7일 후</SelectItem>
                      <SelectItem value="30">30일 후</SelectItem>
                      <SelectItem value="never">무제한</SelectItem>
                    </SelectContent>
                  </Select>
                  {linkExpiration !== "never" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {getExpirationDate(linkExpiration)}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label className="text-sm text-slate-950 font-medium">
                    비밀번호
                  </Label>
                  <span className="flex gap-2 items-center">
                    {isPasswordProtected ? (
                      <>
                        <span className="text-slate-900 font-medium">
                          {password}
                        </span>
                        <RotateCw size={16} />
                      </>
                    ) : (
                      <span className="text-slate-500font-medium font-medium">
                        {password}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CustomSwitch
                    id="password-protection"
                    size="md"
                    checked={isPasswordProtected}
                    onCheckedChange={setIsPasswordProtected}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 h-9 text-sm"
                />
                <Button
                  onClick={handleCopyLink}
                  className="h-9 bg-slate-900 text-white hover:bg-slate-800 text-sm whitespace-nowrap"
                >
                  {isPasswordProtected ? "링크와 비밀번호 복사" : "링크 복사"}
                </Button>
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
