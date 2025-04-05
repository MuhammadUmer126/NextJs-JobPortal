"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

function HomepageButtonControls({ user, profileInfo }) {
  const router = useRouter();

  return (
    <div className="flex space-x-4">
      <Button
        onClick={() => router.push("/jobs")}
        className={"flex h-11 items-center justify-center px-5"}
      >
        {user
          ? profileInfo?.data?.role === "candidate"
            ? "Browse Jobs"
            : "Jobs Dashboard"
          : "Find Jobs"}
      </Button>
      <Button
        onClick={() =>
          router.push(
            user
              ? profileInfo?.data?.role === "candidate"
                ? "/activity"
                : "/jobs"
              : "/jobs"
          )
        }
        className={"flex h-11 items-center justify-center px-5"}
      >
        {user
          ? profileInfo?.data?.role === "candidate"
            ? "Your Activity"
            : "Post New Job"
          : "Post New Job"}
      </Button>
    </div>
  );
}

export default HomepageButtonControls;
