// 사용자 상태 타입 정의
export type UserStatus =
  | "default" // 기본 사용자
  | "inviting" // 초대 중
  | "withdrawn" // 탈퇴한 사용자
  | "left-workspace" // 워크스페이스 나간 사용자
  | "me"; // 현재 사용자 (멤버 설정 화면)

// 사용자 프로필 인터페이스
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  status: UserStatus;
}

// 프로필 컴포넌트 Props
export interface ProfileAvatarProps {
  user: UserProfile;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  showEmail?: boolean;
  className?: string;
}
