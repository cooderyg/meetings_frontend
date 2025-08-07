'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pen, Plus } from 'lucide-react';
import React, { useState } from 'react';
import AudioStreamer from './_components/audioStreamer';

type Props = {};

const participants = [
   {
      name: '김민수',
   },
   {
      name: '박지민',
   },
   {
      name: '최서연',
   },
];

export default function MeetingPage(props: Props) {
   const [transcriptText, setTranscriptText] = useState('');
   return (
      <main className="flex flex-col justify-center max-w-[900px] mx-auto">
         <section>
            <div className="flex items-center gap-1.5">
               <Pen size={24} />
               <h1 className="text-2xl font-semibold">Untitled</h1>
            </div>
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

         <section>
            <Tabs defaultValue="voiceRecording" className="gap-6">
               <TabsList>
                  <TabsTrigger value="voiceRecording" className="cursor-pointer">
                     음성 기록
                  </TabsTrigger>
                  <TabsTrigger value="memo" className="cursor-pointer">
                     메모
                  </TabsTrigger>
               </TabsList>

               <TabsContent value="voiceRecording">
                  {transcriptText.length > 0 ? (
                     <p>{transcriptText}</p>
                  ) : (
                     <p className="text-slate-500 text-sm font-normal">
                        현재 저장된 음성이 없습니다. 아래 버튼을 눌러 녹음을 시작해 주세요.
                     </p>
                  )}
               </TabsContent>
               <TabsContent value="memo">
                  <p className="text-slate-500 text-sm font-normal">
                     현재 저장된 음성이 없습니다. 아래 버튼을 눌러 녹음을 시작해 주세요.
                  </p>
               </TabsContent>
            </Tabs>
         </section>

         <AudioStreamer
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2"
            setTranscriptText={setTranscriptText}
         />
      </main>
   );
}
