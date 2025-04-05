"use client";

import {
  candidateOnboardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnBoardFromControls,
} from "@/utils";
import CommonForm from "../common-form";
import { useEffect, useState } from "react";
import { updateProfileAction } from "@/actions";

const Account = ({ user, profileInfo }) => {
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );

  useEffect(() => {
    if (profileInfo?.data?.role === "recruiter") {
      setRecruiterFormData(profileInfo?.data?.recruiterInfo);
    }
    if (profileInfo?.data?.role === "candidate") {
      setCandidateFormData(profileInfo?.data?.candidateInfo);
    }
  }, [profileInfo]);

  const handleOnProfileUpdate = async () => {
    await updateProfileAction(
      profileInfo?.data?.role === "candidate"
        ? {
            _id: profileInfo?.data?._id,
            userId: profileInfo?.data?.userId,
            role: profileInfo?.data?.role,
            email: profileInfo?.data?.email,
            isPremiumUser: profileInfo?.data?.isPremiumUser,
            memberShipType: profileInfo?.data?.memberShipType,
            memberShipStartDate: profileInfo?.data?.memberShipStartDate,
            memberShipEndDate: profileInfo?.data?.memberShipEndDate,
            candidateInfo: {
              ...candidateFormData,
              resume: profileInfo?.data?.candidateInfo?.resume,
            },
          }
        : {
            _id: profileInfo?.data?._id,
            userId: profileInfo?.data?.userId,
            role: profileInfo?.data?.role,
            email: profileInfo?.data?.email,
            isPremiumUser: profileInfo?.data?.isPremiumUser,
            memberShipType: profileInfo?.data?.memberShipType,
            memberShipStartDate: profileInfo?.data?.memberShipStartDate,
            memberShipEndDate: profileInfo?.data?.memberShipEndDate,
            recruiterInfo: {
              ...recruiterFormData,
            },
          },
      "/account"
    );
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-baseline dark:border-white justify-between pb-6 border-b pt-24">
        <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
          Account Details
        </h1>
      </div>
      <div className="py-20 pb-24 pt-6">
        <div className="container mx-auto p-0 space-y-8">
          <CommonForm
            action={handleOnProfileUpdate}
            buttonText={"Update Profile"}
            formControls={
              profileInfo?.data?.role === "candidate"
                ? candidateOnboardFormControls.filter(
                    (formControl) => formControl.name !== "resume"
                  )
                : recruiterOnBoardFromControls
            }
            formData={
              profileInfo?.data?.role === "candidate"
                ? candidateFormData
                : recruiterFormData
            }
            setFormData={
              profileInfo?.data?.role === "candidate"
                ? setCandidateFormData
                : setRecruiterFormData
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
