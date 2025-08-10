import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Star, Trash2 } from 'lucide-react';
import { CustomSwitch } from './custom-switch';
import { useState } from 'react';

export function AIPopover() {
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
               <Star className="w-4 h-4 mr-1" />
               <span className="text-sm text-white">AI</span>
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-[230px] p-4">
            <div className="flex flex-col gap-4">
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
               <div className="mt-1.5 flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm">삭제</span>
               </div>
            </div>
         </PopoverContent>
      </Popover>
   );
}
