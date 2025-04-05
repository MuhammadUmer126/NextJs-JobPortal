"use client";

import CandidateJobCard from "@/components/candidate-job-card";
import PostNewJob from "@/components/post-new-job";
import RecruiterJobCard from "@/components/recruiter-job-card";
import { Label } from "@/components/ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { createURLQuery, filterMenuDataArray } from "@/utils";
import { useSearchParams, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

function JobListing({
  user,
  profileInfo,
  getJobList,
  getJobApplication,
  jobFilters,
}) {
  const filterMenu = filterMenuDataArray.map((item) => ({
    id: item.id,
    name: item.label,
    option: [...new Set(jobFilters.map((filterItem) => filterItem[item?.id]))],
  }));

  const [filterParams, setFilterParams] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleOnFilterClick = (getSectionId, getCurrentOption) => {
    let cpyFilterParams = { ...filterParams };

    const indexofCurrentSection =
      Object.keys(filterParams).indexOf(getSectionId);

    if (indexofCurrentSection == -1) {
      cpyFilterParams = {
        ...cpyFilterParams,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilterParams[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption == -1) {
        cpyFilterParams[getSectionId].push(getCurrentOption);
      } else {
        cpyFilterParams[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilterParams(cpyFilterParams);
    sessionStorage.setItem("filterParams", JSON.stringify(cpyFilterParams));
  };

  useEffect(() => {
    if (filterParams && Object.keys(filterParams).length > 0) {
      let url = "";
      url = createURLQuery({
        dataToAdd: filterParams,
        params: searchParams.toString(),
      });

      router.push(url, { scroll: false });
    }
  }, [filterParams, searchParams]);

  useEffect(() => {
    let filterParamsFromSessionStorage = sessionStorage.getItem("filterParams");
    if (filterParamsFromSessionStorage) {
      setFilterParams(JSON.parse(filterParamsFromSessionStorage));
    }
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-baseline dark:border-white justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl dark:text-white font-bold tracking-tight text-gray-900">
            {profileInfo?.data?.role === "candidate"
              ? "Explore All Jobs"
              : "Jobs Dashboard"}
          </h1>
          <div className="flex items-center">
            {profileInfo?.data?.role === "candidate" ? (
              <Menubar>
                {filterMenu.map((item, index) => {
                  return (
                    <MenubarMenu key={index}>
                      <MenubarTrigger>{item.name}</MenubarTrigger>
                      <MenubarContent>
                        {item.option.map((opt, index) => {
                          return (
                            <MenubarItem
                              key={index}
                              className={"flex items-center"}
                              onClick={() => handleOnFilterClick(item?.id, opt)}
                            >
                              <div
                                className={`h-4 w-4 dark:border-white border rounded border-gray-900 ${
                                  filterParams &&
                                  Object.keys(filterParams).length > 0 &&
                                  filterParams[item?.id] &&
                                  filterParams[item?.id].indexOf(opt) > -1
                                    ? "bg-black dark:bg-white"
                                    : ""
                                }`}
                              ></div>
                              <Label
                                className={
                                  "ml-3 dark:text-white cursor-pointer text-sm text-gray-600"
                                }
                              >
                                {opt}
                              </Label>
                            </MenubarItem>
                          );
                        })}
                      </MenubarContent>
                    </MenubarMenu>
                  );
                })}
              </Menubar>
            ) : (
              <PostNewJob
                user={user}
                profileInfo={profileInfo}
                getJobApplication={JSON.parse(
                  JSON.stringify(getJobApplication)
                )}
              />
            )}
          </div>
        </div>
        <div className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <div className="lg:col-span-4">
              <div className="container mx-auto p-0 space-y-8">
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                  {getJobList &&
                    getJobList?.length &&
                    getJobList?.map((job, index) => {
                      return profileInfo?.data?.role == "recruiter" ? (
                        <RecruiterJobCard
                          key={index}
                          jobItem={job}
                          getJobApplication={getJobApplication}
                        />
                      ) : (
                        <CandidateJobCard
                          key={index}
                          jobItem={job}
                          profileInfo={profileInfo}
                          getJobApplication={getJobApplication}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobListing;
