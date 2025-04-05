import {
  fetchJobApplicationCandidateAction,
  fetchJobsCandidateAction,
  fetchProfileAction,
} from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import Activity from "@/components/activity";
import React from "react";

async function ActivityPage() {
  const user = await currentUser();
  const getJobList = await fetchJobsCandidateAction();
  const getJobApplications = await fetchJobApplicationCandidateAction(user?.id);
  return (
    <Activity
      getJobList={JSON.parse(JSON.stringify(getJobList))}
      getJobApplications={getJobApplications}
    />
  );
}

export default ActivityPage;
