"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CommonForm from "../common-form";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import { createJobAction } from "@/actions";
import { toast } from "sonner";

function PostNewJob({ user, profileInfo, getJobApplication }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState(initialPostNewJobFormData);

  useEffect(() => {
    setFormData({
      ...formData,
      companyName: profileInfo?.data?.recruiterInfo?.companyName,
    });
  }, []);

  const createJob = async () => {
    await createJobAction(
      {
        ...formData,
        recruiterId: user?.id,
        applicants: [],
      },
      "/jobs"
    );
  };

  const handleOnOpenDialog = () => {
    if (!profileInfo?.data?.isPremiumUser && getJobApplication.length >= 1) {
      toast("Buy membership for creating more jobs");
      return;
    }
    setOpenDialog(true);
  };

  return (
    <>
      <Button
        onClick={handleOnOpenDialog}
        className={
          "disabled:opacity-60 flex h-11 items-center justify-center px-5"
        }
      >
        Post A Job
      </Button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className={"sm:max-w-screen h-[600px] overflow-auto"}>
          <DialogHeader>
            <DialogTitle>Post New job</DialogTitle>
            <div className="grid gap-4 py-4">
              <CommonForm
                action={createJob}
                buttonText={"Add"}
                formControls={postNewJobFormControls}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PostNewJob;
