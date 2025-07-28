import { http } from "../api";

export const postGoogleCode = async (code: string) => {
  const response = await http.post(`/auth/sign-in/google`, { code });

  if (response.ok) {
    const data = await response.json();
    console.log("OAuth success:", data);
  } else {
    console.error("OAuth failed:", await response.text());
  }
};
