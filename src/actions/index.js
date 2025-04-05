"use server";

import { connectToDb } from "@/database/connectToDb";
import Application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

export const createProfileAction = async (formData, pathToRevalidate) => {
  try {
    await connectToDb();
    const data = await Profile.create(formData);
    if (data) {
      return {
        success: true,
        message: "Profile created successfully",
        data,
      };
    } else {
      return {
        success: false,
        message: "Failed to create profile",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while creating the profile",
      error,
    };
  } finally {
    revalidatePath(pathToRevalidate);
  }
};

export const fetchProfileAction = async (userId) => {
  try {
    await connectToDb();

    const result = await Profile.findOne({ userId });

    if (result) {
      return {
        success: true,
        message: "Profile fetched successfully",
        data: result,
      };
    } else {
      throw new Error("Couldn't find profile");
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching the profile",
      error,
    };
  }
};

//create job action

export const createJobAction = async (formData, pathToRevalidate) => {
  try {
    await connectToDb();
    const data = await Job.create(formData);
    if (data) {
      return {
        success: true,
        message: "Job created successfully",
        data,
      };
    } else {
      throw new Error("Couldn't create job");
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while creating the job",
      error,
    };
  } finally {
    revalidatePath(pathToRevalidate);
  }
};

//fetch job action
// recruiter

export const fetchJobsRecruiterAction = async (userId) => {
  try {
    await connectToDb();

    const result = await Job.find({ recruiterId: userId });

    if (result) {
      return result;
    } else {
      throw new Error("Couldn't find any jobs");
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching the jobs",
      error,
    };
  }
};

// candidate

export const fetchJobsCandidateAction = async (filterParams = {}) => {
  console.log("💕💕💕💕💕");

  try {
    await connectToDb();

    let updatedParams = {};

    Object.keys(filterParams).forEach((filterKey) => {
      updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") };
    });

    console.table(JSON.parse(JSON.stringify(updatedParams)) + "👍👍👍");

    const result = await Job.find(
      filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {}
    );

    if (result) {
      return result;
    } else {
      throw new Error("Couldn't find any jobs");
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching the jobs",
      error,
    };
  }
};

// create a new job application

export const createJobApplicationAction = async (
  formData,
  pathToRevalidate
) => {
  try {
    await connectToDb();
    const data = await Application.create(formData);
    if (data) {
      return {
        success: true,
        message: "Application created successfully",
        data,
      };
    } else {
      throw new Error("Failed to create application");
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while creating the job",
      error,
    };
  } finally {
    revalidatePath(pathToRevalidate);
  }
};

// fetch job application --> candidate

export const fetchJobApplicationCandidateAction = async (candidateId) => {
  try {
    await connectToDb();
    const result = await Application.find({ candidateUserID: candidateId });
    return result;
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching the applications",
      error,
    };
  }
};

// fetch job application --> recruiter

export const fetchJobApplicationRecruiterAction = async (recruiterId) => {
  try {
    await connectToDb();
    const result = await Application.find({ recruiterUserID: recruiterId });
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching the applications",
      error,
    };
  }
};

//get current candidate details by id

export const fetchCandidateByIdAction = async (candidateId) => {
  try {
    await connectToDb();
    const result = await Profile.findOne({ userId: candidateId });
    return JSON.parse(JSON.stringify(result));
  } catch (err) {
    return {
      success: false,
      message: "An error occurred while fetching the candidate details",
      error,
    };
  }
};

// update job application

export const updateJobApplicationAction = async (data, pathToRevalidate) => {
  try {
    await connectToDb();
    const {
      recruiterUserID,
      name,
      email,
      candidateUserID,
      status,
      jobID,
      jobAppliedDate,
      _id,
    } = data;

    await Application.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        recruiterUserID,
        name,
        email,
        candidateUserID,
        status,
        jobID,
        jobAppliedDate,
      },
      { new: true }
    );
    revalidatePath(pathToRevalidate);
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while updating the application",
      error,
    };
  }
};

// update profile action

export const updateProfileAction = async (data, pathToRevalidate) => {
  try {
    await connectToDb();
    const {
      userId,
      role,
      email,
      isPremiumUser,
      memberShipType,
      memberShipStartDate,
      memberShipEndDate,
      recruiterInfo,
      candidateInfo,
      _id,
    } = data;

    await Profile.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        userId,
        role,
        email,
        isPremiumUser,
        memberShipType,
        memberShipStartDate,
        memberShipEndDate,
        recruiterInfo,
        candidateInfo,
      },
      {
        new: true,
      }
    );
    revalidatePath(pathToRevalidate);
    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while updating the profile",
      error,
    };
  }
};

// create filter categories
export const createFilterCategories = async () => {
  try {
    await connectToDb();
    const result = await Job.find({});
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    return {
      success: false,
      message: "An error occurred",
      error,
    };
  }
};
