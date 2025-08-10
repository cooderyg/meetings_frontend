import { http } from '../http';

interface Request {
   meetingsId: string;
}

type MeetingStatus = 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED' | 'PAUSED';

export interface MeetingsData {
   resource: string;
   createdAt: string;
   updatedAt: string;
   status: MeetingStatus;
   tags: string[];
   workspace: string;
   memo: string;
   summary: string;
   deletedAt: null;
}

interface Response {
   success: true;
   data: MeetingsData;
}

export async function getAiSummary({ meetingsId }: Request) {
   const response = await http.get<Response>(`/meetings/${meetingsId}`);
   return response;
}
