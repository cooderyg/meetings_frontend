'use client';

import { Input } from '@/components/ui/input';
import { Pen, Plus } from 'lucide-react';
import { useState } from 'react';

const participants = [
   {
      name: '이정민',
   },
   {
      name: '김혜림',
   },
   {
      name: '강영구',
   },
   {
      name: '류원희',
   },
   {
      name: '인한별',
   },
];

export default function MeetingHeader() {
   const [title, setTitle] = useState('');
   const [isTitleEditing, setIsTitleEditing] = useState(false);

   return (
      <section>
         {isTitleEditing ? (
            <Input
               type="text"
               className="w-[315px] focus-visible:ring-slate-950 focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:border focus-visible:border-slate-200"
               placeholder="노트 이름을 작성해 주세요."
               onBlur={() => setIsTitleEditing(false)}
               value={title}
               onChange={e => setTitle(e.target.value)}
               onKeyDown={e => {
                  if (e.key === 'Enter') {
                     setIsTitleEditing(false);
                  }
               }}
            />
         ) : (
            <div className="flex items-center gap-1.5">
               <Pen size={24} onClick={() => setIsTitleEditing(true)} className="cursor-pointer" />
               <h1 className="text-2xl font-semibold">{title || 'Untitled'}</h1>
            </div>
         )}
         <p className="mt-1.5 text-slate-500   text-sm">2025년 6월 5일 오전 12:05 ∙ 0초</p>
         <div className="flex items-center gap-1.5 mt-3 pt-[10px] pb-[30px]">
            {participants.map(participant => (
               <div key={participant.name} className="flex items-center gap-1">
                  <div className="rounded-full text-slate-500 bg-slate-100 text-sm font-normal w-6 h-6 flex justify-center items-center">
                     {participant.name.substring(0, 1)}
                  </div>
                  <span>{participant.name}</span>
               </div>
            ))}
            <button className="flex items-center gap-1 ml-4 cursor-pointer">
               <span className="text-sm font-medium">참석자 추가</span>
               <Plus size={16} />
            </button>
         </div>
      </section>
   );
}
