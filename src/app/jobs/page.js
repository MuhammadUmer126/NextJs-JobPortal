import {
  createFilterCategories,
  fetchJobApplicationCandidateAction,
  fetchJobApplicationRecruiterAction,
  fetchJobsCandidateAction,
  fetchJobsRecruiterAction,
  fetchProfileAction,
} from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import JobListing from "@/components/jobs/jobListing";
import React from "react";

async function JobPage({ searchParams }) {
  const user = await currentUser();
  const profileInfo = await fetchProfileAction(user?.id);
  const serachData = await searchParams;

  console.log(serachData + " results");

  const getJobList =
    profileInfo?.data?.role == "recruiter"
      ? await fetchJobsRecruiterAction(user?.id)
      : await fetchJobsCandidateAction(serachData);

  const getJobApplication =
    profileInfo?.data?.role == "recruiter"
      ? await fetchJobApplicationRecruiterAction(user?.id)
      : await fetchJobApplicationCandidateAction(user?.id);

  const jobFilters = await createFilterCategories();

  return (
    <JobListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      getJobList={JSON.parse(JSON.stringify(getJobList))}
      getJobApplication={getJobApplication}
      jobFilters={jobFilters}
    />
  );
}

export default JobPage;
