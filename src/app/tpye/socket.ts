// 소켓 타입 정의
export interface SttSessionResponse {
   clientId: string;
   type: string;
   isConnected: boolean;
   message: string | null;
}

export interface SttSessionWriteResponse extends SttSessionResponse {
   speakerTag: string | null;
   time: number;
   content: string;
   isFinal: boolean;
}

export interface SttSessionSuccessResponse extends SttSessionResponse {
   // type, isConnected, message 상속
}

export interface SttSessionErrorResponse extends SttSessionResponse {
   // type이 'error', isConnected가 false로 고정
}

// 🔥 클라이언트 -> 서버 이벤트 타입
export interface ClientToServerEvents {
   'init-streaming-recognize': (meetingId: string) => void;
   'write-streaming-recognize': (AudioConfig: ArrayBuffer) => void;
   'pause-streaming-recognize': () => void;
   'resume-streaming-recognize': () => void;
   'end-streaming-recognize': () => void;
   'audio-config': (data: any) => void;
}

// 🔥 서버 -> 클라이언트 이벤트 타입
export interface ServerToClientEvents {
   'write-streaming-recognize': (data: SttSessionWriteResponse) => void;
   'pause-streaming-recognize': (data: SttSessionSuccessResponse) => void;
   'resume-streaming-recognize': (data: SttSessionSuccessResponse) => void;
   'end-streaming-recognize': (data: SttSessionSuccessResponse) => void;
   'error-streaming-recognize': (data: SttSessionErrorResponse) => void;
}

// 타입 안전한 소켓 인터페이스
export interface InterServerEvents {
   // 서버 간 통신용 (지금은 비어있음)
}

export interface SocketData {
   // 소켓에 저장할 추가 데이터
   userId?: string;
   meetingId?: string;
}
