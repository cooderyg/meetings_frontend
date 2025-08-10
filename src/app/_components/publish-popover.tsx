import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Share2, RotateCw, Pen } from 'lucide-react';
import { CustomSwitch } from './custom-switch';
import { useState } from 'react';

export function PublishPopover() {
   const [isPublic, setIsPublic] = useState(false);

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               size="sm"
               className={cn(
                  'h-8 px-3 relative bg-slate-900 text-white hover:bg-slate-900 hover:text-white hover:ring-2 hover:ring-slate-900',
               )}>
               <Pen className="w-4 h-4 mr-1" />
               <span className="text-sm text-white">발행하기</span>
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-[423px] p-4">
            <div className="flex flex-col gap-4">
               <div className="space-y-1.5">
                  <h4 className="font-semibold text-slate-950 text-lg">발행하기</h4>
                  <p className="text-muted-foreground text-sm">
                     발행 후 다른 팀원에게 공개되어 열람할 수 있는 상태가 됩니다.
                  </p>
               </div>

               <div
                  className={cn(
                     'flex items-center justify-between',
                     // isPublic ? "justify-between" : "space-x-2"
                  )}>
                  <Label htmlFor="airplane-mode" className="text-sm text-slate-950 font-medium">
                     Private 설정
                  </Label>
                  <CustomSwitch id="airplane-mode" size="md" checked={isPublic} onCheckedChange={setIsPublic} />
               </div>
               <div className="flex justify-end mt-6">
                  <Button className="w-20 h-10">발행</Button>
               </div>
            </div>
         </PopoverContent>
      </Popover>
   );
}
