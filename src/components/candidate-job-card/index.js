"use client";

import { Fragment, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Rocket } from "lucide-react";
import CommonCard from "../common-card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { createJobApplicationAction } from "@/actions";

function CandidateJobCard({ jobItem, profileInfo, getJobApplication }) {
  console.log(getJobApplication);

  const [showJobDetailsDrawer, setShowJobDetailsDrawer] = useState(false);

  const handleOnJobApply = () => {
    if (!profileInfo?.data?.isPremiumUser && getJobApplication.length >= 2) {
      toast("Buy membership to apply on more jobs");
      return;
    }

    setShowJobDetailsDrawer(false);
    createJobApplicationAction(
      {
        recruiterUserID: jobItem?.recruiterId,
        name: profileInfo?.data?.candidateInfo?.name,
        email: profileInfo?.data?.email,
        candidateUserID: profileInfo?.data?.userId,
        status: ["Applied"],
        jobID: jobItem?._id,
        jobAppliedDate: new Date().toLocaleDateString(),
      },
      "/jobs"
    );
  };

  return (
    <Fragment>
      <Drawer
        open={showJobDetailsDrawer}
        onOpenChange={setShowJobDetailsDrawer}
      >
        <CommonCard
          icon={<Rocket />}
          title={jobItem?.title}
          description={jobItem?.companyName}
          footerContent={
            <Button
              onClick={() => setShowJobDetailsDrawer(true)}
              className=" dark:bg-[#fffa27] flex h-11 items-center justify-center px-5"
            >
              View Details
            </Button>
          }
        />

        <DrawerContent className={"p-6"}>
          <DrawerHeader className={"px-0"}>
            <div className="flex justify-between">
              <DrawerTitle className="text-4xl dark:text-white font-extrabold text-gray-800">
                {jobItem?.title}
              </DrawerTitle>
              <div className="flex gap-3">
                <Button
                  onClick={handleOnJobApply}
                  className="disabled:opacity-65 flex h-11 items-center justify-center px-5"
                  disabled={
                    getJobApplication.findIndex(
                      (item) => item.jobID === jobItem?._id
                    ) > -1
                      ? true
                      : false
                  }
                >
                  {getJobApplication.findIndex(
                    (item) => item.jobID === jobItem?._id
                  ) > -1
                    ? "Applied"
                    : "Apply"}
                </Button>
                <Button
                  className="flex h-11 items-center justify-center px-5"
                  onClick={() => setShowJobDetailsDrawer(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DrawerHeader>
          <DrawerDescription className="text-2xl dark:text-white  font-medium text-gray-600">
            {jobItem?.description}

            <span className="text-xl dark:text-white  ml-4 font-normal text-gray-500">
              {jobItem?.location}
            </span>
          </DrawerDescription>
          <div className="w-[150px] mt-6 flex justify-center dark:bg-white  items-center h-[40px] bg-black rounded-[4px]">
            <h2 className="text-xl font-bold dark:text-black  text-white">
              {jobItem?.type}
            </h2>
          </div>
          <h3 className="text-2xl font-medium text-black mt-3">
            Experience: {jobItem?.experience}
          </h3>
          <div className="flex flex-wrap gap-4 mt-6">
            {jobItem?.skills.split(",").map((skill, index) => {
              return (
                <div
                  key={index}
                  className="px-4 flex justify-center items-center h-[35px] dark:bg-white  bg-black rounded-[4px]"
                >
                  <h2 className="text-[13px] font-medium text-white dark:text-black ">
                    {skill.trim()}
                  </h2>
                </div>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}

export default CandidateJobCard;
