"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommonForm from "@/components/common-form";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnBoardFromControls,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  "https://acykgthutmgdiyapwstx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjeWtndGh1dG1nZGl5YXB3c3R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MDI5NTYsImV4cCI6MjA1NTk3ODk1Nn0.sYB4mB3bMQKFY1QuD5M7WM_fL12ynSbCfBUWRlWTRQY"
);

function Onboard() {
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );
  const [file, setFile] = useState(null);

  const handleOnFileChange = (event) => {
    ("file changed");
    (event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const handleOnSupabaseFileUpload = async () => {
    const { data, error } = await supabaseClient.storage
      .from("jobprtal")
      .upload(`public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (data) {
      setCandidateFormData({ ...candidateFormData, resume: data.path });
    }
  };

  useEffect(() => {
    if (file) {
      handleOnSupabaseFileUpload();
    }
  }, [file]);
  const [currentTab, setCurrentTab] = useState("candidate");

  const { user } = useUser();

  const handleCreateProfile = async () => {
    const data =
      currentTab === "candidate"
        ? {
            candidateInfo: candidateFormData,
            role: "candidate",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          }
        : {
            recruiterInfo: recruiterFormData,
            role: "recruiter",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          };

    await createProfileAction(data, "/onboard");
  };
  return (
    <>
      <div className="bg-white">
        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          className="w-[400px]"
        >
          <div className="w-full">
            <div className="flex items-baseline justify-between border-b pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Welcome To Onboarding
              </h1>
              <TabsList>
                <TabsTrigger value="candidate">Candidate</TabsTrigger>
                <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
              </TabsList>
            </div>
          </div>
          <TabsContent value="candidate">
            <CommonForm
              action={handleCreateProfile}
              buttonText={"Onboard as candidate"}
              formControls={candidateOnboardFormControls}
              formData={candidateFormData}
              setFormData={setCandidateFormData}
              handleFileChange={handleOnFileChange}
            />
          </TabsContent>
          <TabsContent value="recruiter">
            <CommonForm
              action={handleCreateProfile}
              buttonText={"onboard as recruiter"}
              formControls={recruiterOnBoardFromControls}
              formData={recruiterFormData}
              setFormData={setRecruiterFormData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Onboard;
