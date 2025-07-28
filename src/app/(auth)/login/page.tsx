import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GoogleLoginButton from "./_view/gogle-login-button";
import { redirect } from "next/navigation";
import { postGoogleCode } from "@/app/api/action/post-google-code";
import Login from "./_view/login";

interface Props {
  params: {
    code: string;
  };
  searchParams: {
    code: string;
  };
}

export default async function LoginPage({ params, searchParams }: Props) {
  const { code } = await searchParams;
  console.log("code:", code);

  return <Login code={code} />;
}
