import { DeleteMeetingAction } from "@/app/action";
import { EmptyState } from "@/app/component/EmptyState";
import { SubmitButton } from "@/app/component/SubmitButtons";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { nylus } from "@/app/lib/nylas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format, fromUnixTime } from "date-fns";
import { Video } from "lucide-react";
import Link from "next/link";

async function getData(userId: string) {
    const userData = await prisma.user.findUnique({
        where:{
            id: userId,
        },
        select: {
            grantEmail: true,
            grantId: true,
        }
    })

    if (!userData) {
        throw new Error("User not found");
    }

    const data = await nylus.events.list({
        identifier: userData.grantId as string,
        queryParams:{
            calendarId: userData.grantEmail as string,
        }
    });
    return data;
}




export default async function MeetingsRoute() {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);

    // console.log(data.data.when);

    return(
        <>
        {data.data.length < 1 ? (
            <>
                <EmptyState title="No Meetings" description="You have not created any meetings yet" buttonText="Create Meeting" href="/dashboard/new" />
            </>
        ):(
            <>
                <Card>
                    <CardHeader>
                        <CardTitle>Bookings</CardTitle>
                        <CardDescription>See the upcomming event which where booked with you and the event type link.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {data.data.map((item, index) => (
                            <form action={DeleteMeetingAction} key={item.id} >
                                <input type="hidden" name="eventId" value={item.id} />
                                <div className="grid grid-cols-3 justify-between items-center" key={index}>
                                    <div> 
                                        <p className="text-muted-foreground text-sm">
                                            {/*@ts-ignore*/}
                                            {format(fromUnixTime(item.when.startTime), "EEE, dd MMM")}
                                        </p>
                                        <p className="text-muted-foreground text-sm pt-1">
                                            {/*@ts-ignore*/}
                                            {format(fromUnixTime(item.when.startTime), "hh:mm a")} - {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                                        </p>

                                        <div className="flex items-center mt-1">
                                            <Video className="size-4 mr-2 text-primary " />
                                            {/*@ts-ignore*/}
                                            <a className="text-xs text-primary underLine underline-offset-4" href={item.conferencing.details.url} target="_blank">Join Meeting</a>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <h2 className="text-sm font-medium">{item.title}</h2>
                                        <p className="text-sm text-muted-foreground">You and {item.participants[0].name}</p>
                                    </div>

                                    <SubmitButton text="Cancle Event" variant="destructive" className="w-fit flex ml-auto"/>
                                </div>
                                <Separator className="my-3"/>
                            </form>
                        ))}
                    </CardContent>
                </Card>
            </>
        )}
        </>
    )
}