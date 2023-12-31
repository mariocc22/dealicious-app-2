"use client";

import LoginComponent from "@/app/components/Login/Login";
import LoginDealicious from "@/app/components/Login/LoginDealicious";
import LogoComponent from "@/app/components/Login/LogoComponent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = ({ params }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const urlParams = params.typeUser;

  useEffect(() => {
    if (session) {
      if (urlParams.includes("owner")) {
        router.push(`/dashboard/campaigns/active/${session?.user.id}#ongoing`);
      } else {
        router.push(`/superCustomer/restaurants/${session?.user.id}`);
      }
    }
  }, [session, status]);

  return (
    <>
      {status === "authenticated" ? (
        <LogoComponent />
      ) : (
        <>
          <LoginDealicious />
        </>
      )}
    </>
  );
};

export default Login;
