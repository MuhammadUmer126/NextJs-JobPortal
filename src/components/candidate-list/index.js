"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  fetchCandidateByIdAction,
  updateJobApplicationAction,
} from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  "https://acykgthutmgdiyapwstx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjeWtndGh1dG1nZGl5YXB3c3R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MDI5NTYsImV4cCI6MjA1NTk3ODk1Nn0.sYB4mB3bMQKFY1QuD5M7WM_fL12ynSbCfBUWRlWTRQY"
);

function CandidateList({
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
  jobApplications,
}) {
  const handleFetchCandidatedetails = async (jobApplication) => {
    const result = await fetchCandidateByIdAction(
      jobApplication?.candidateUserID
    );
    if (result) {
      setCurrentCandidateDetails(result);
      setShowCurrentCandidateDetailsModal(true);
    }
  };

  const handleResumePreview = async () => {
    const { data } = supabaseClient.storage
      .from("jobprtal")
      .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);

    const a = document.createElement("a");
    a.href = data?.publicUrl;
    a.setAttribute("download", "Resume.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleUpdateJobStatus = async (getCurrentStatus) => {
    getCurrentStatus;
    let cpyJobApplications = [...jobApplications];

    const indexOfCurrentjobApplicant = cpyJobApplications.findIndex(
      (jobApplication) =>
        jobApplication.candidateUserID == currentCandidateDetails?.userId
    );

    let data = cpyJobApplications[indexOfCurrentjobApplicant];
    data.status = data.status.concat(getCurrentStatus);
    data;

    await updateJobApplicationAction(data, "/jobs");
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-10">
        {jobApplications &&
          jobApplications.length &&
          jobApplications.map((jobApplication, index) => {
            return (
              <div
                key={index}
                className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4"
              >
                <div className="px-4 my-6 flex justify-between items-center">
                  <h3 className="text-lg font-bold dark:text-black">
                    {jobApplication?.name}
                  </h3>
                  <Button
                    onClick={() => handleFetchCandidatedetails(jobApplication)}
                  >
                    View profile
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
      <Dialog
        open={showCurrentCandidateDetailsModal}
        onOpenChange={setShowCurrentCandidateDetailsModal}
      >
        <DialogContent>
          <div>
            <h1 className="text-2xl font-bold dark:text-white text-black">
              {currentCandidateDetails?.candidateInfo?.name},{" "}
              {currentCandidateDetails?.email}
            </h1>
            <p className="text-xl font-medium dark:text-white text-black">
              {currentCandidateDetails?.candidateInfo?.currentCompany}
            </p>
            <p className="text-sm font-normal dark:text-white text-black">
              {currentCandidateDetails?.candidateInfo?.currentJobLocation}
            </p>
            <p className="dark:text-white">
              Total Experience:
              {currentCandidateDetails?.candidateInfo?.totalExperience}
            </p>
            <p className="dark:text-white">
              Salary: {currentCandidateDetails?.candidateInfo?.currentSalary}{" "}
            </p>
            <p className="dark:text-white">
              Notice Period:{" "}
              {currentCandidateDetails?.candidateInfo?.noticePeriod}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <h1 className="dark:text-white">Previous Companies</h1>
              <div className="flex flex-wrap items-center gap-4 mt-6">
                {currentCandidateDetails?.candidateInfo?.previousCompanies
                  .split(",")
                  .map((skillItem, index) => (
                    <div
                      key={index}
                      className="w-[100px] dark:bg-white flex justify-center items-center h-[35px] bg-black rounded-[4px]"
                    >
                      <h2 className="text-[13px]  dark:text-black font-medium text-white">
                        {skillItem}
                      </h2>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              {currentCandidateDetails?.candidateInfo?.skills
                .split(",")
                .map((skillItem, index) => (
                  <div
                    key={index}
                    className="w-[100px] dark:bg-white flex justify-center items-center h-[35px] bg-black rounded-[4px]"
                  >
                    <h2 className="text-[13px] dark:text-black font-medium text-white">
                      {skillItem}
                    </h2>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleResumePreview}
              className=" flex h-11 items-center justify-center px-5"
            >
              Resume
            </Button>
            <Button
              onClick={() => handleUpdateJobStatus("Selected")}
              className=" disabled:opacity-65 flex h-11 items-center justify-center px-5"
              disabled={
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("Selected") ||
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("Rejected")
                  ? true
                  : false
              }
            >
              {jobApplications
                .find(
                  (item) =>
                    item.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("Selected")
                ? "Selected"
                : "Select"}
            </Button>
            <Button
              onClick={() => handleUpdateJobStatus("Rejected")}
              className=" disabled:opacity-65 flex h-11 items-center justify-center px-5"
              disabled={
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("Selected") ||
                jobApplications
                  .find(
                    (item) =>
                      item.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("Rejected")
                  ? true
                  : false
              }
            >
              {jobApplications
                .find(
                  (item) =>
                    item.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("Rejected")
                ? "Rejected"
                : "Reject"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CandidateList;
