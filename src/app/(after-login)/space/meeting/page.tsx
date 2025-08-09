import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pen, Plus } from 'lucide-react';
import AudioStreamer, { MEETING_ID } from './_components/audioStreamer';
import AiSummary from './_components/ai-summary';
import VoiceRecording from './_components/voice-recording';
import { getAiSummary } from '@/app/api/meeting/get-ai-summary';
import PersonalNote from './_components/personal-note';

type Props = {};

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

export default function MeetingPage(props: Props) {
   const aiData = getAiSummary({ meetingId: MEETING_ID });
   console.log('aiData', aiData);

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
                  <TabsTrigger value="ai-summary" className="cursor-pointer">
                     AI 요약
                  </TabsTrigger>
               </TabsList>

               <TabsContent value="voiceRecording">
                  <VoiceRecording />
               </TabsContent>
               <TabsContent value="memo">
                  <PersonalNote />
               </TabsContent>
               <TabsContent value="ai-summary">
                  <AiSummary />
               </TabsContent>
            </Tabs>
         </section>

         <AudioStreamer className="fixed bottom-6 left-1/2 transform -translate-x-1/2" />
      </main>
   );
}
