import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale("ko");

export const formatDate = {
  /**
   * 초를 녹음 시간 규칙에 맞게 포맷팅
   * @param totalSeconds - 총 초 수 (정수만)
   * @returns 규칙에 맞는 시간 문자열
   */
  recordingTime: (totalSeconds: number): string => {
    const seconds = Math.floor(totalSeconds);
    const duration = dayjs.duration(seconds, "seconds");
    const minutes = Math.floor(duration.asMinutes());
    const remainingSeconds = duration.seconds();
    if (seconds < 60) return `${seconds}초`;
    if (remainingSeconds === 0) return `${minutes}분`;
    return `${minutes}분 ${remainingSeconds}초`;
  },

  /**
   * MM:SS 형태로 포맷팅
   * @param totalSeconds - 총 초 수
   * @returns "MM:SS" 형태 문자열
   */
  recordingMMSS: (totalSeconds: number): string => {
    const seconds = Math.floor(totalSeconds);
    const duration = dayjs.duration(seconds, "seconds");
    const minutes = Math.floor(duration.asMinutes());
    const remainingSeconds = duration.seconds();
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  },

  /**
   * Page 녹음용 (60분 초과시 HH:MM:SS로 자동 전환)
   * @param totalSeconds - 총 초 수
   * @returns "MM:SS" 또는 "HH:MM:SS"
   */
  pageRecording: (totalSeconds: number): string => {
    const seconds = Math.floor(totalSeconds);
    const duration = dayjs.duration(seconds, "seconds");
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const remainingSeconds = duration.seconds();

    if (hours === 0) {
      const totalMinutes = Math.floor(duration.asMinutes());
      return `${totalMinutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  },

  /**
   * 녹음 세션 정보 생성
   * @param date - 녹음 시작 시간
   * @returns 세션 ID 형태
   */
  recordingSession: (date: Date): string => {
    return dayjs(date).format("YYYY년 M월 D일 A h:mm");
  },

  /**
   * 녹음 파일명용 타임스탬프
   * @param date - 날짜
   * @returns 파일명에 적합한 형태
   */
  recordingFileName: (date: Date): string => {
    return dayjs(date).format("YYYYMMDD_HHmmss");
  },

  /**
   * 상대 시간 (몇 분 전, 몇 시간 전)
   * @param date - 기준 날짜
   * @returns "5분 전", "2시간 전" 등
   */
  relativeTime: (date: Date): string => {
    return dayjs(date).fromNow();
  },

  /**
   * 녹음 시간 검증 및 포맷팅
   * @param totalSeconds - 총 초 수
   * @returns 검증된 시간 정보
   */
  validatedRecording: (totalSeconds: number) => {
    const seconds = Math.floor(totalSeconds);
    const duration = dayjs.duration(seconds, "seconds");
    const remainingSeconds = duration.seconds();

    return {
      korean: formatDate.recordingTime(seconds),
      mmss: formatDate.recordingMMSS(seconds),
      page: formatDate.pageRecording(seconds),
      isValid: seconds >= 60 && seconds <= 4500,
      type:
        seconds < 60
          ? "under_minute"
          : remainingSeconds === 0
            ? "exact_minute"
            : "normal",
    };
  },
};
