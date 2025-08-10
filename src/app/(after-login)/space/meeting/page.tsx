import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AudioStreamer from './_components/audioStreamer';
import AiSummary from './_components/ai-summary';
import VoiceRecording from './_components/voice-recording';
import PersonalNote from './_components/personal-note';
import MeetingHeader from './_components/meeting-header';
import { getAiSummary } from '@/app/api/meeting/get-ai-summary';

type Props = {};
export const MEETING_ID = 'ea413ae4-3a66-4e52-9975-3d06ab33b02a';
export default async function MeetingPage(props: Props) {
   // const aiData = getAiSummary({ meetingId: MEETING_ID });
   // console.log('aiData', aiData);

   const { data } = await getAiSummary({ meetingsId: MEETING_ID });
   console.log('data', data);

   return (
      <main className="flex flex-col justify-center max-w-[900px] mx-auto">
         <MeetingHeader />
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
                  <AiSummary meetingsData={data} />
               </TabsContent>
            </Tabs>
         </section>

         <AudioStreamer className="fixed bottom-6 left-1/2 transform -translate-x-1/2" meetingId={MEETING_ID} />
      </main>
   );
}
