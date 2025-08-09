import { create } from 'zustand';

export interface TranscriptData {
   time: number;
   content: string;
   speakerTag?: string | null;
   isNewSegment?: boolean;
}

interface TranscriptDataStore {
   transcript: TranscriptData[];
   setTranscript: (transcript: TranscriptData[]) => void;
   addTranscript: (newData: TranscriptData) => void; // 🔥 추가
}

// 🔥 export 추가해서 getState() 사용 가능하게
export const useTranscriptDataStore = create<TranscriptDataStore>(set => ({
   transcript: [],
   setTranscript: transcript => set({ transcript }),
   // 🎯 실시간 상태 업데이트 메서드
   addTranscript: (newData: TranscriptData) =>
      set(state => {
         const prev = state.transcript;
         const lastItem = prev[prev.length - 1];

         // 🎯 대화 구분 로직
         const shouldCreateNewSegment =
            !lastItem ||
            (newData.speakerTag && lastItem.speakerTag !== newData.speakerTag) ||
            newData.time - lastItem.time > 3;

         if (shouldCreateNewSegment) {
            return {
               transcript: [...prev, { ...newData, isNewSegment: true }],
            };
         } else {
            return {
               transcript: prev.map((item, index) =>
                  index === prev.length - 1
                     ? {
                          ...item,
                          content: item.content + ' ' + newData.content,
                          time: Math.max(item.time, newData.time),
                       }
                     : item,
               ),
            };
         }
      }),
}));

export const useTranscriptData = () => {
   const transcript = useTranscriptDataStore(state => state.transcript);
   const setTranscript = useTranscriptDataStore(state => state.setTranscript);
   const addTranscript = useTranscriptDataStore(state => state.addTranscript); // 🔥 추가

   return [transcript, setTranscript, addTranscript] as const;
};
