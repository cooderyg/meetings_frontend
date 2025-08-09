import { create } from 'zustand';

export interface TranscriptData {
   time: number;
   content: string;
   speakerTag?: string | null;
   isNewSegment?: boolean;
}
interface RecordingState {
   isRecording: boolean;
   isPaused: boolean;
   recordingTime: number;
}

interface TranscriptDataStore extends RecordingState {
   transcript: TranscriptData[];
   setTranscript: (transcript: TranscriptData[]) => void;
   addTranscript: (newData: TranscriptData) => void;

   startRecording: () => void;
   pauseRecording: () => void;
   resumeRecording: () => void;
   stopRecording: () => void;
   getFormattedTime: () => string;

   // 🔥 내부 타이머 관리
   _tickTimer: () => void;
}
export const useTranscriptDataStore = create<TranscriptDataStore>((set, get) => ({
   transcript: [],
   isRecording: false,
   isPaused: false,
   recordingTime: 0,
   setTranscript: transcript => set({ transcript }),
   addTranscript: (newData: TranscriptData) =>
      set(state => {
         const prev = state.transcript;
         const lastItem = prev[prev.length - 1];

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

   startRecording: () => {
      set({ isRecording: true, isPaused: false, recordingTime: 0 });
      // 타이머 시작은 외부에서 관리
   },

   // 🔥 일시정지
   pauseRecording: () => set({ isPaused: true }),

   // 🔥 재개
   resumeRecording: () => set({ isPaused: false }),

   // 🔥 정지 (초기화)
   stopRecording: () =>
      set({
         isRecording: false,
         isPaused: false,
         recordingTime: 0,
      }),

   // 🔥 시간 포맷팅
   getFormattedTime: () => {
      const seconds = get().recordingTime;
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
   },

   // 🔥 1초씩 증가 (외부 타이머에서 호출)
   _tickTimer: () => {
      const state = get();
      if (state.isRecording && !state.isPaused) {
         set({ recordingTime: state.recordingTime + 1 });
      }
   },
}));

export const useTranscriptData = () => {
   const transcript = useTranscriptDataStore(state => state.transcript);
   const setTranscript = useTranscriptDataStore(state => state.setTranscript);
   const addTranscript = useTranscriptDataStore(state => state.addTranscript);
   const isRecording = useTranscriptDataStore(state => state.isRecording);
   const isPaused = useTranscriptDataStore(state => state.isPaused);
   const recordingTime = useTranscriptDataStore(state => state.recordingTime);
   const startRecording = useTranscriptDataStore(state => state.startRecording);
   const pauseRecording = useTranscriptDataStore(state => state.pauseRecording);
   const resumeRecording = useTranscriptDataStore(state => state.resumeRecording);
   const stopRecording = useTranscriptDataStore(state => state.stopRecording);
   const getFormattedTime = useTranscriptDataStore(state => state.getFormattedTime);

   return {
      transcript,
      setTranscript,
      addTranscript,
      isRecording,
      isPaused,
      recordingTime,
      startRecording,
      pauseRecording,
      resumeRecording,
      stopRecording,
      getFormattedTime,
   } as const;
};
