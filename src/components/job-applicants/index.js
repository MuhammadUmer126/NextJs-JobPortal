"use client";
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "../ui/scroll-area";
import CandidateList from "../candidate-list";

function JobApplicants({
  showApplicatsDrawer,
  setShowApplicatsDrawer,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
  jobApplications,
}) {
  return (
    <>
      <Drawer open={showApplicatsDrawer} onOpenChange={setShowApplicatsDrawer}>
        <DrawerContent>
          <ScrollArea className={"h-auto overflow-y-auto"}>
            <CandidateList
              currentCandidateDetails={currentCandidateDetails}
              setCurrentCandidateDetails={setCurrentCandidateDetails}
              showCurrentCandidateDetailsModal={
                showCurrentCandidateDetailsModal
              }
              setShowCurrentCandidateDetailsModal={
                setShowCurrentCandidateDetailsModal
              }
              jobApplications={jobApplications}
            />
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default JobApplicants;
