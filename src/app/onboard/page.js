import { fetchProfileAction } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import Onboard from "@/components/onBoard";
import { redirect } from "next/navigation";
import React from "react";

async function OnBoardPage() {
  const user = await currentUser();

  const profileInfo = await fetchProfileAction(user?.id);

  if (user) {
    if (profileInfo?.success) {
      if (profileInfo?.data?._id) {
        if (
          profileInfo?.data?.role === "recruiter" &&
          profileInfo?.data?.isPremiumUser == false
        ) {
          redirect("/membership");
        } else {
          redirect("/");
        }
      }
    } else {
      return <Onboard />;
    }
  } else {
    redirect("/sign-in");
  }
}

export default OnBoardPage;
