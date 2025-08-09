'use client';
import { getAiSummary } from '@/app/api/meeting/get-ai-summary';
import { MEETING_ID } from './audioStreamer';
import { useTranscriptData } from '@/app/store/trance-data';

export default async function AiSummary() {
   const [transcriptData] = useTranscriptData();

   console.log('transcriptData', transcriptData);
   return <div></div>;
}
