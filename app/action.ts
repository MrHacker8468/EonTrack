"use server";

import { parseWithZod } from "@conform-to/zod";
import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import {  eventTypeSchema, onboardingSchemaValidator, settingsSchema } from "./lib/zodSchemas";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { nylus } from "./lib/nylas";

export async function OnboardingAction(prevState: any, formData: FormData) {
    const session = await requireUser();
    
    const submission = await parseWithZod(formData, {
        schema: onboardingSchemaValidator({
            async isUsernameUnique(){
                const exisitingUsername = await prisma.user.findUnique({
                    where: {
                        userName: formData.get("userName") as string,
                    },
                });
                return !exisitingUsername;
            },
        }),
        async: true,
    });
 
    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.user.update({
        where:{  
            id: session.user?.id,
        },
        data:{
            userName: submission.value.userName,
            name: submission.value.fullName,
            availability : {
                createMany: {
                    data:[
                        {
                            day: "Monday",
                            fromTime: "12:00",
                            tillTime: "13:00",
                            
                        },
                        {
                            day: "Tuesday",
                            fromTime: "12:00",
                            tillTime: "13:00",
                        },
                        {
                            day: "Wednesday",
                            fromTime: "12:00",
                            tillTime: "13:00",
                        },
                        {
                            day: "Thursday",
                            fromTime: "12:00",
                            tillTime: "13:00",
                        },
                        {
                            day: "Friday",
                            fromTime: "12:00",  
                            tillTime: "13:00",
                        },
                        {
                            day: "Saturday",
                            fromTime: "12:00",
                            tillTime: "13:00",
                        }, 
                        {
                            day: "Sunday",
                            fromTime: "12:00",  
                            tillTime: "13:00",
                        }
                    ]
                }
            }
        }
    });

    return redirect("/onboarding/grand-id");
} 

export async function SettingsAction(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = await parseWithZod(formData, {
        schema: settingsSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const user = await prisma.user.update({
        where:{  
            id: session.user?.id,
        },
        data:{
            name: submission.value.fullName,
            image: submission.value.profileImage,
        }
    });

    return redirect("/dashboard");
}

export async function upadateAvailabilityAction(formData: FormData) {
    const session = await requireUser();
    const rawData = Object.fromEntries(formData.entries());
    const availabilityData = Object.keys(rawData).filter((key) => key.startsWith("id-")).map((key) => {
        const id = key.replace("id-", "");
        const isActive = rawData[`isActive-${id}`] === "on";
        const fromTime = rawData[`fromTime-${id}`] as string;
        const tillTime = rawData[`tillTime-${id}`] as string;
        return {
            id,
            isActive,
            fromTime,
            tillTime,
        }
    });

    try {
        await prisma.$transaction(
            availabilityData.map((item) => prisma.availability.update({
                where:{
                    id: item.id,
                },
                data:{
                    isActive: item.isActive,
                    fromTime: item.fromTime,
                    tillTime: item.tillTime,
                }
            }))
        );
        revalidatePath("/dashboard/availability");
    } catch (error) {
        console.log(error)
    }
}

export async function createEventType(prevState: any, formData: FormData) {
    const session = await requireUser();
    const submission = parseWithZod(formData, {
        schema: eventTypeSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const userId = session.user?.id; // Define userId separately

    // Build the data object conditionally
    const data: any = {
        title: submission.value.title,
        duration: submission.value.duration,
        url: submission.value.url,
        description: submission.value.description,
        videoCallSoftware: submission.value.videoCallSoftware,
        ...(userId ? { userId } : {}),  // Include userId only if defined
    };

    await prisma.eventType.create({ data });

    return redirect("/dashboard");
}


export async function CreateMeetingAction(formData: FormData) {
    const getUserData = await prisma.user.findUnique({
        where: {
            userName: formData.get("username") as string,
        },
        select: {
            grantEmail: true,
            grantId: true,
        },
    });

    if (!getUserData) {
        throw new Error("User not found");
    }

    const eventTypeData = await prisma.eventType.findUnique({
        where: {
            id: formData.get("eventTypeId") as string,
        },
        select: {
            title: true,
            description: true,
        },
    });


    const fromTime = formData.get("fromTime") as string;
    const eventDate = formData.get("eventDate") as string;
    const meetingLength = Number(formData.get("meetingLength"));
    const provider = formData.get("provider") as string;

    const startDateTime = new Date(`${eventDate}T${fromTime}:00`);
    const endDateTime = new Date(startDateTime.getTime() + meetingLength * 60 * 1000);

    await nylus.events.create({
        identifier: getUserData.grantId as string,
        requestBody: {
            title: eventTypeData?.title,
            description: eventTypeData?.description,
            when: {
                startTime: Math.floor(startDateTime.getTime() / 1000),
                endTime: Math.floor(endDateTime.getTime() / 1000),
            },
            conferencing: {
                autocreate: {},
                provider: provider as any,
            },
            participants: [
                {
                    name: formData.get("name") as string,
                    email: formData.get("email") as string,
                    status: "yes",
                },
            ],
        },
        queryParams: {
            calendarId: getUserData.grantEmail as string,
            notifyParticipants: true,
        },
    });

    return redirect("/success");
}

export async function DeleteMeetingAction(formData: FormData) {
    const session = await requireUser();
    const userData = await prisma.user.findUnique({
        where: {
            id : session.user?.id,
        },
        select: {
            grantEmail: true,
            grantId: true,
        },
    });

    if (!userData) {
        throw new Error("User not found");
    }

    const data = await nylus.events.destroy({
        eventId: formData.get("eventId") as string,
        identifier: userData.grantId as string,
        queryParams:{
            calendarId: userData.grantEmail as string,
        }
    });
    
    revalidatePath("/dashboard/meetings");
}

export async function UpdateEventTypeAction(prevState: any, formData: FormData) {
    const session = await requireUser();
    const submission = parseWithZod(formData, {
        schema: eventTypeSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.eventType.update({
        where: {
            id : formData.get("id") as string,
            userId: session.user?.id,
        },
        data: {
            title: submission.value.title,
            duration: submission.value.duration,
            url: submission.value.url,
            description: submission.value.description,
            videoCallSoftware: submission.value.videoCallSoftware,
        }
    });

    return redirect(`/dashboard`);
}

export async function UpdateEventTypeSwitchAction(prevState: any, {eventTypeId, isChecked}: {eventTypeId: string, isChecked: boolean}) {
    try {
        const session = await requireUser();
        const data = await prisma.eventType.update({
            where: {
                id: eventTypeId,
                userId: session.user?.id,
            },
            data:{
                active: isChecked,
            }
        });

        revalidatePath("/dashboard");

        return { 
            status: "success",
            message: "Event Type Status updated",
        }
    } catch (error) {
        return{
            status: "error",    
            message: "Failed to update event type status",
        }
        
    }
}


export async function deleteEventType(formData: FormData) {
    const session = await requireUser()
    const data = await prisma.eventType.delete({
        where: {
            id: formData.get("id") as string,
            userId: session.user?.id,
        },
    })
    
    return redirect("/dashboard")
}