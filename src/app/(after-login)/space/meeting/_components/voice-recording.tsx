'use client';

import { useTranscriptData } from '@/app/store/trance-data';

export default function VoiceRecording() {
   const { transcript } = useTranscriptData();
   return (
      <>
         {transcript.length > 0 ? (
            <div className="space-y-6">
               {transcript.map((data, index) => (
                  <div key={`${data.time}-${index}`}>
                     <div>
                        <span className="text-gray-500 font-normal text-base">
                           {Math.floor(data.time / 60)
                              .toString()
                              .padStart(2, '0')}
                           :{(data.time % 60).toString().padStart(2, '0')}
                        </span>
                     </div>
                     <p className="text-sm leading-5 font-normal text-slate-950 mt-1.5">{data.content}</p>
                  </div>
               ))}
            </div>
         ) : (
            <p className="text-slate-500 text-sm font-normal">
               현재 저장된 음성이 없습니다. 아래 버튼을 눌러 녹음을 시작해 주세요.
            </p>
         )}
      </>
   );
}
