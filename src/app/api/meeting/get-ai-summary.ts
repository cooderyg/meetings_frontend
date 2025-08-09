import { http } from '../http';

interface Response {
   summary: string;
}

interface Request {
   meetingId: string;
}

export async function getAiSummary(request: Request) {
   const response = await http.get<Response>(`/meetings/${request.meetingId}`);
   return response;
}
