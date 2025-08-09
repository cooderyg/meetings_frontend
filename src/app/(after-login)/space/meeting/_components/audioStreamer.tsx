'use client';

import { ClientToServerEvents, ServerToClientEvents } from '@/app/tpye/socket';
import { cn } from '@/lib/utils';
import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { io, Socket } from 'socket.io-client';
import { TranscriptData, useTranscriptData } from '@/app/store/trance-data';

interface Props {
   className?: string;
}

export const MEETING_ID = 'ea413ae4-3a66-4e52-9975-3d06ab33b02a';

export default function RecordingButton({ className }: Props) {
   const [isConnected, setIsConnected] = useState(false);
   const [isInitialized, setIsInitialized] = useState(false);
   const [isRecording, setIsRecording] = useState(false);
   const [isPaused, setIsPaused] = useState(false);
   const [meetingId, setMeetingId] = useState(MEETING_ID);
   const [audioLevel, setAudioLevel] = useState(0);
   const [micGain, setMicGain] = useState(5.0);

   const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
   const audioContextRef = useRef<any | null>(null);
   const processorRef = useRef<any | null>(null);
   const streamRef = useRef<MediaStream | null>(null);

   const [transcriptData, setTranscriptData, addTranscript] = useTranscriptData();

   useEffect(() => {
      console.log('isConnected', isConnected);
      console.log('isInitialized', isInitialized);
      console.log('isRecording', isRecording);
      console.log('isPaused', isPaused);
   }, [isPaused, isRecording, isInitialized, isConnected]);

   // Socket.IO 연결 설정
   const connectSocket = () => {
      try {
         console.log('NestJS WebSocket 서버에 연결 시도 중...');
         socketRef.current = io('http://localhost:2052', {
            transports: ['websocket', 'polling'],
            timeout: 5000,
            forceNew: true,
         });

         socketRef.current.on('connect', () => {
            console.log('Socket.IO 연결 성공!', socketRef.current?.id);
            setIsConnected(true);
         });

         socketRef.current.on('disconnect', reason => {
            console.log('Socket.IO 연결 종료:', reason);
            setIsConnected(false);
            setIsInitialized(false);
            setIsRecording(false);
            setIsPaused(false);
         });

         socketRef.current.on('connect_error', error => {
            console.error('Socket.IO 연결 오류:', error);
            setIsConnected(false);
         });

         // 결과 수신 이벤트
         socketRef.current.on('write-streaming-recognize', data => {
            console.log('🎤 STT 실시간 결과:', data);
            console.log('🎤 STT 실시간 결과 (전체 응답):', data);
            console.log('🎤 STT speakerTag:', data.speakerTag);
            // console.log('🎤 응답 구조:', Object.keys(data));
            // console.log('🎤 content 필드:', data.content);

            if (data.isFinal) {
               const newTranscriptData: TranscriptData = {
                  time: data.time,
                  content: data.content,
                  speakerTag: data.speakerTag,
               };

               addTranscript(newTranscriptData);
               // setTranscriptData(prev => {
               //    const lastItem = prev[prev.length - 1];

               //    // 🎯 대화 구분 로직
               //    const shouldCreateNewSegment =
               //       !lastItem || // 첫 번째 항목
               //       (data.speakerTag && lastItem.speakerTag !== data.speakerTag) || // 화자 변경
               //       data.time - lastItem.time > 3; // 3초 이상 간격

               //    if (shouldCreateNewSegment) {
               //       // 새로운 발화 구간 생성
               //       return [
               //          ...prev,
               //          {
               //             ...newTranscriptData,
               //             isNewSegment: true,
               //          },
               //       ];
               //    } else {
               //       // 같은 화자의 연속 발화 - 마지막 항목에 추가
               //       return prev.map((item, index) =>
               //          index === prev.length - 1
               //             ? {
               //                  ...item,
               //                  content: item.content + ' ' + newTranscriptData.content,
               //                  time: Math.max(item.time, newTranscriptData.time),
               //               }
               //             : item,
               //       );
               //    }
               // });
            }
         });

         socketRef.current.on('pause-streaming-recognize', data => {
            console.log('⏸️ STT 일시정지 응답:', data);
         });

         socketRef.current.on('resume-streaming-recognize', data => {
            console.log('▶️ STT 재개 응답:', data);
         });

         socketRef.current.on('end-streaming-recognize', data => {
            console.log('🛑 STT 종료 응답:', data);
         });

         socketRef.current.on('error-streaming-recognize', error => {
            console.error('❌ STT 에러:', error);
            // 에러 처리 로직 추가 필요
         });
      } catch (error) {
         console.error('Socket.IO 연결 실패:', error);
      }
   };

   // STT 스트리밍 초기화
   const initStreamingRecognize = () => {
      if (socketRef.current && socketRef.current.connected) {
         console.log('STT 스트리밍 초기화:', meetingId);
         socketRef.current.emit('init-streaming-recognize', meetingId);

         // 오디오 설정 정보도 함께 전송 (화자분리 최적화)
         socketRef.current.emit('audio-config', {
            sampleRate: 16000,
            channels: 1,
            encoding: 'LINEAR16',
            bufferSize: 1024,
            // 화자분리를 위한 추가 설정
            diarizationHint: {
               minSpeakerCount: 1,
               maxSpeakerCount: 6,
               enableSpeakerDiarization: true,
            },
         });
         console.log('서버에 오디오 설정 전송 (화자분리 포함):', {
            sampleRate: 16000,
            channels: 1,
            encoding: 'LINEAR16',
            diarization: 'enabled',
         });

         setIsInitialized(true);
      }
   };

   // 오디오 스트림 일시정지
   const pauseStreamingRecognize = () => {
      if (socketRef.current && socketRef.current.connected) {
         console.log('STT 스트리밍 일시정지');
         socketRef.current.emit('pause-streaming-recognize');
         setIsPaused(true);
      }
   };

   // 오디오 스트림 재개
   const resumeStreamingRecognize = () => {
      if (socketRef.current && socketRef.current.connected) {
         console.log('STT 스트리밍 재개');
         socketRef.current.emit('resume-streaming-recognize');
         setIsPaused(false);
      }
   };

   // STT 스트리밍 종료
   const endStreamingRecognize = () => {
      if (socketRef.current && socketRef.current.connected) {
         console.log('STT 스트리밍 종료');
         socketRef.current.emit('end-streaming-recognize');
      }
      // 오디오 스트림 정리
      if (processorRef.current) {
         processorRef.current.disconnect();
         processorRef.current = null;
      }

      if (audioContextRef.current) {
         audioContextRef.current.close();
         audioContextRef.current = null;
      }

      if (streamRef.current) {
         streamRef.current.getTracks().forEach(track => track.stop());
         streamRef.current = null;
      }

      setIsRecording(false);
      setIsInitialized(false);
      setIsPaused(false);
      setAudioLevel(0);
   };

   // Socket.IO 연결 해제
   const disconnectSocket = () => {
      if (isRecording) {
         endStreamingRecognize();
      }

      if (socketRef.current) {
         socketRef.current.disconnect();
         socketRef.current = null;
      }
      setIsConnected(false);
   };

   // 오디오 스트림 시작 함수
   const startAudioStream = async () => {
      try {
         console.log('🎬 직접 오디오 스트림 시작');

         const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
               echoCancellation: false,
               noiseSuppression: false,
               autoGainControl: false,
               sampleRate: 16000,
            },
         });

         streamRef.current = stream;
         audioContextRef.current = new AudioContext({ sampleRate: 16000 });

         const source = audioContextRef.current.createMediaStreamSource(stream);
         processorRef.current = audioContextRef.current.createScriptProcessor(2048, 1, 1);

         processorRef.current.onaudioprocess = (event: any) => {
            if (socketRef.current?.connected) {
               const inputBuffer = event.inputBuffer.getChannelData(0);
               const audioData = new Float32Array(inputBuffer);

               // 오디오 레벨 계산
               let sum = 0;
               for (let i = 0; i < audioData.length; i++) {
                  sum += audioData[i] * audioData[i];
               }
               const rms = Math.sqrt(sum / audioData.length);

               // 게인 적용
               const amplifiedAudioData = new Float32Array(audioData.length);
               for (let i = 0; i < audioData.length; i++) {
                  let sample = audioData[i] * micGain;
                  if (Math.abs(sample) > 0.8) {
                     sample = sample > 0 ? 0.8 + (sample - 0.8) * 0.2 : -0.8 + (sample + 0.8) * 0.2;
                  }
                  amplifiedAudioData[i] = Math.max(-1, Math.min(1, sample));
               }

               const displayLevel = Math.min(1, rms * micGain * 3);
               setAudioLevel(displayLevel);

               // Int16 변환
               const int16Array = new Int16Array(amplifiedAudioData.length);
               for (let i = 0; i < amplifiedAudioData.length; i++) {
                  const sample = amplifiedAudioData[i];
                  int16Array[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
               }

               // 전송 조건 (더 관대하게)
               const shouldSend = displayLevel > 0.00001 || Math.random() < 0.3;

               if (shouldSend) {
                  socketRef.current.emit('write-streaming-recognize', int16Array.buffer);

                  if (Math.random() < 0.05) {
                     console.log('🎵 오디오 전송:', {
                        레벨: displayLevel.toFixed(4),
                        버퍼크기: int16Array.buffer.byteLength,
                        게인: micGain,
                     });
                  }
               }
            }
         };

         source.connect(processorRef.current);
         processorRef.current.connect(audioContextRef.current.destination);

         setIsRecording(true);
         console.log('✅ 직접 오디오 스트림 완료');
      } catch (error) {
         console.error('❌ 직접 오디오 스트림 실패:', error);
         throw error;
      }
   };

   // 녹음 버튼 클릭 핸들러 - 완전 리팩토링
   const handleRecordingClick = async () => {
      if (!isRecording) {
         try {
            console.log('🚀 녹음 시작 - 완전 자동화 프로세스');
            // 1단계: 소켓 연결
            if (!socketRef.current?.connected) {
               console.log('1️⃣ 소켓 연결 중...');
               await new Promise<void>((resolve, reject) => {
                  connectSocket();

                  const checkConnection = setInterval(() => {
                     if (socketRef.current?.connected) {
                        clearInterval(checkConnection);
                        console.log('✅ 소켓 연결 완료!');
                        resolve();
                     }
                  }, 100);

                  setTimeout(() => {
                     clearInterval(checkConnection);
                     reject(new Error('소켓 연결 타임아웃'));
                  }, 5000);
               });
            }
            // 2단계: STT 초기화 (상태 무관)
            console.log('2️⃣ STT 스트리밍 초기화 중...');
            if (socketRef.current?.connected) {
               initStreamingRecognize();
            }
            // 3단계: 오디오 스트림 시작
            console.log('3️⃣ 오디오 스트림 시작 중...');
            await new Promise(resolve => setTimeout(resolve, 500));
            await startAudioStream();
         } catch (error) {
            console.error('❌ 녹음 시작 실패:', error);
            // 에러 시 상태 초기화
            setIsConnected(false);
            setIsInitialized(false);
            setIsRecording(false);
            setIsPaused(false);
         }
      } else {
         console.log('🛑 녹음 정지 중...');
         endStreamingRecognize();
         disconnectSocket();
      }
   };

   // 컴포넌트 언마운트 시 정리
   useEffect(() => {
      return () => {
         endStreamingRecognize();
         disconnectSocket();
      };
   }, []);

   return (
      <div className={cn('flex flex-col justify-center items-center gap-3', className)}>
         <div
            className={cn(
               'p-4 flex items-center justify-start gap-3 shadow-lg rounded-[9999] border border-slate-200 bg-white z-10 w-[260px] h-[80px]',
            )}>
            {isRecording ? (
               <button
                  onClick={handleRecordingClick}
                  className={cn('w-14 h-14 rounded-4xl border border-slate-950 flex items-center justify-center')}>
                  <div className="rounded bg-red-500 hover:bg-red-600 w-8 h-8" />
               </button>
            ) : (
               <button
                  onClick={handleRecordingClick}
                  className={cn('border border-slate-950 w-14 h-14 rounded-full flex items-center justify-center')}>
                  <div className="rounded-full bg-red-500 hover:bg-red-600 w-11 h-11" />
               </button>
            )}
            <div className="flex flex-col">
               <span className="text-sm font-normal">
                  {isRecording ? '01:30 녹음 중' : '버튼을 눌러 녹음 시작하기'}
               </span>
               {isRecording && (
                  <span className="text-xs text-gray-500">오디오 레벨: {(audioLevel * 100).toFixed(1)}%</span>
               )}
            </div>
         </div>

         <p className="text-slate-500 font-normal text-sm">녹음 전 모든 참여자의 동의를 얻으세요.</p>
      </div>
   );
}
