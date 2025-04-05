"use client";

import { Rocket } from "lucide-react";
import CommonCard from "../common-card";
import { Button } from "../ui/button";
import JobApplicants from "../job-applicants";
import { useState } from "react";

function RecruiterJobCard({ jobItem, getJobApplication }) {
  (getJobApplication);
  (jobItem);

  const [showApplicatsDrawer, setShowApplicatsDrawer] = useState(false);
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null);
  const [
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
  ] = useState(false);

  return (
    <div>
      <CommonCard
        icon={<Rocket />}
        title={jobItem?.title}
        footerContent={
          <Button
            onClick={() => setShowApplicatsDrawer(true)}
            className=" dark:bg-[#fffa27] disabled:opacity-55 flex h-11 items-center justify-center px-5"
          >
            {
              getJobApplication.filter((job) => job.jobID === jobItem?._id)
                .length
            }{" "}
            Applicants
          </Button>
        }
      />

      <JobApplicants
        showApplicatsDrawer={showApplicatsDrawer}
        setShowApplicatsDrawer={setShowApplicatsDrawer}
        currentCandidateDetails={currentCandidateDetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
        setShowCurrentCandidateDetailsModal={
          setShowCurrentCandidateDetailsModal
        }
        jobApplications={getJobApplication.filter((job) => {
          return job.jobID === jobItem?._id;
        })}
      />
    </div>
  );
}
0;

export default RecruiterJobCard;
