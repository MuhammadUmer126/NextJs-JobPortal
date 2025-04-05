"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CommonCard from "../common-card";
import { Rocket } from "lucide-react";

function Activity({ getJobList, getJobApplications }) {
  const status = ["Applied", "Selected", "Rejected"];

  const [currentTab, setCurrentTab] = useState(status[0]);
  return (
    <React.Fragment>
      <div className="mx-auto max-w-7xl">
        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          className="w-full"
        >
          <div className="flex items-baseline dark:border-white justify-between border-b pb-6 pt-24">
            <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
              Your Activity
            </h1>
            <TabsList>
              {/* <TabsTrigger value={"applied"}>Applied</TabsTrigger>
              <TabsTrigger value={"selected"}>Selected</TabsTrigger>
              <TabsTrigger value={"rejected"}>Rejected</TabsTrigger> */}
              {status.map((s) => {
                return <TabsTrigger value={s}>{s}</TabsTrigger>;
              })}
            </TabsList>
          </div>
          <div className="pb-24 pt-6">
            <div className="container mx-auto p-0 space-y-8">
              <div className="flex flex-col gap-4">
                {status.map((s) => {
                  return (
                    <TabsContent value={s}>
                      {getJobList
                        .filter(
                          (jobItem) =>
                            getJobApplications
                              .filter(
                                (jobApplication) =>
                                  jobApplication.status[
                                    jobApplication.status.length - 1
                                  ] == s
                              )
                              .findIndex(
                                (finalItem) => jobItem?._id == finalItem.jobID
                              ) > -1
                        )
                        .map((item) => {
                          return (
                            <CommonCard
                              icon={<Rocket />}
                              title={item?.title}
                              description={item?.companyName}
                            />
                          );
                        })}
                    </TabsContent>
                  );
                })}
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </React.Fragment>
  );
}

export default Activity;
