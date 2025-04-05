'use client'

import React from 'react'
import { Button } from '../ui/button'
import CommonCard from '../common-card'
import { membershipPlans } from '@/utils'
import { Rocket } from 'lucide-react'
import { updateProfileAction } from '@/actions'

function Membership({ user, profileInfo }) {

    const handleCreateMembership = async (getCurrentPlan) => {
        await updateProfileAction(
            profileInfo?.data?.role === "candidate"
                ? {
                    _id: profileInfo?.data?._id,
                    userId: profileInfo?.data?.userId,
                    role: profileInfo?.data?.role,
                    email: profileInfo?.data?.email,
                    isPremiumUser: true,
                    memberShipType: getCurrentPlan.heading,
                    memberShipStartDate: new Date().toString(),
                    memberShipEndDate: new Date().getFullYear() + Number.parseInt(
                        getCurrentPlan?.type === "basic" ? 1 : getCurrentPlan?.type === "teams" ? 2 : 5
                    ),
                    candidateInfo: profileInfo?.data?.candidateInfo
                }
                : {
                    _id: profileInfo?.data?._id,
                    userId: profileInfo?.data?.userId,
                    role: profileInfo?.data?.role,
                    email: profileInfo?.data?.email,
                    isPremiumUser: true,
                    memberShipType: getCurrentPlan.heading,
                    memberShipStartDate: new Date().toString(),
                    memberShipEndDate: new Date().getFullYear() + Number.parseInt(
                        getCurrentPlan?.type === "basic" ? 1 : getCurrentPlan?.type === "teams" ? 2 : 5
                    ),
                    recruiterInfo: profileInfo?.data?.recruiterInfo
                },
            "/membership"
        );
    }

    return (
        <div className={"mx-auto max-w-7xl"}>
            <div className={"flex items-baseline dark:border-white justify-between border-b pb-6 pt-24"}>
                <h1 className="text-4xl font-bold dark:text-white tracking-tight text-gray-950">
                    Choose your Plan
                </h1>
                <Button>
                    {
                        profileInfo?.data?.memberShipType
                    }
                </Button>
            </div>

            <div className='py-20 pb-24 pt-6'>
                <div className='container mx-auto p-0 space-y-8'>
                    <div className='grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3'>
                        {
                            membershipPlans.map((item, index) => {
                                const t = profileInfo?.data?.memberShipType;
                                return <CommonCard icon={<Rocket />} title={`$ ${item?.price} /year`}
                                    description={item?.heading}
                                    key={index}
                                    footerContent={
                                        <Button disabled={
                                            index === 0 && (t === `Tier 1` || t === `Tier 2` || t === `Tier 3`) ? true : index === 1 && (t === `Tier 2` || t === `Tier 3`) ? true : index === 2 && (t === `Tier 3`) ? true : false
                                        } onClick={() => handleCreateMembership(item)} className="disabled:opacity-65 dark:bg-[#fffa27] flex h-11 items-center justify-center px-5">Go Premium</Button>

                                    }
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Membership