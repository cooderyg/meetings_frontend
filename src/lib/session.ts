import { cookies } from "next/headers";

export default async function getSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');
  const isLogin = Boolean(accessToken?.value);

  return { accessToken, refreshToken, isLogin };
}