import { fetchProfileAction } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import Membership from "@/components/membership";
import React from "react";

async function MembershipPage() {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  return (
    <Membership
      profileInfo={JSON.parse(JSON.stringify(profileInfo))}
      user={JSON.parse(JSON.stringify(user))}
    />
  );
}

export default MembershipPage;
