import { CreateMeetingAction } from "@/app/action";
import { RenderCalendar } from "@/app/component/bookingForm/RenderCalendar";
import { TimeTable } from "@/app/component/bookingForm/TimeTable";
import { SubmitButton } from "@/app/component/SubmitButtons";
import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import { notFound } from "next/navigation";

async function getData(eventUrl: string, userName: string) {
    const data = await prisma.eventType.findFirst({
        where: {
            url: eventUrl,
            User: {
                userName: userName,
            },
            active: true,
        },
        select: {
            id: true,
            title: true,
            duration: true,
            description: true,
            videoCallSoftware: true,
            User: {
                select: {
                    image: true,
                    name: true,
                    availability: {
                        select: {
                            day: true,
                            isActive: true,
                        },
                    },
                },
            },
        },
    });

    if (!data) {
        return notFound();
    }

    return data;
}

export default async function BookingFormRoute(
    props: {
        params: Promise<{ username: string; eventUrl: string }>;
        searchParams: Promise<{ date?: string; time?: string }>;
    }
) {
    const searchParams = await props.searchParams;
    const params = await props.params;
    // Ensure correct usage of params
    const data = await getData(params.eventUrl, params.username);

    const selectedDate = searchParams.date ? new Date(searchParams.date) : new Date();

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
    }).format(selectedDate);

    const showFrom = !!searchParams.date && !!searchParams.time;

    return (
        <div className="min-h-screen w-screen flex items-center justify-center">

            {showFrom ? (
                <Card className="max-w-[600px] w-full">
                <CardContent className="p-5 grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-5">
                    <div>
                        <img
                            src={data.User?.image as string}
                            alt="user"
                            className="w-10 h-10 rounded-s-lg"
                        />
                        <p className="text-sm font-medium text-muted-foreground mt-1">{data.User?.name}</p>
                        <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
                        <p className="text-sm font-medium text-muted-foreground">{data.description}</p>
                        
                        <div className="mt-5 flex flex-col gap-y-3">
                            <p className="flex items-center">
                                <CalendarX2 className="size-4 mr-2 text-primary"/>
                                <span className="text-sm font-medium text-muted-foreground">{formattedDate}</span>
                            </p>
                            <p className="flex items-center">
                                <Clock className="size-4 mr-2 text-primary"/>
                                <span className="text-sm font-medium text-muted-foreground">{data.duration} Minutes</span>
                            </p>
                            <p className="flex items-center">
                                <VideoIcon className="size-4 mr-2 text-primary"/>
                                <span className="text-sm font-medium text-muted-foreground">{data.videoCallSoftware}</span>
                            </p>
                        </div>
                    </div>

                    <Separator orientation="vertical" className="w-[1px] h-full" />
                    
                    <form className="flex flex-col gap-y-4 mt-4" action={CreateMeetingAction}>
                        <input type="hidden" name="fromTime" value={searchParams.time} />
                        <input type="hidden" name="eventDate" value={searchParams.date} />
                        <input type="hidden" name="meetingLength" value={data.duration} />
                        <input type="hidden" name="provider" value={data.videoCallSoftware} />
                        <input type="hidden" name="username" value={params.username} />
                        <input type="hidden" name="eventTypeId" value={data.id} />

 
                        <div className="flex flex-col gap-y-2">
                            <Label>Your Name</Label>
                            <Input name="name" placeholder="Your Name" className="w-full" />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Your Email</Label>
                            <Input name="email" placeholder="EonTrack@eon.com" className="w-full" />
                        </div>
                        <SubmitButton text="Book Meeting" className="w-full mt-5 " />
                    </form>

                </CardContent>
                </Card>
            ):(
                <Card className="max-w-[1000px] w-full mx-auto">
                    <CardContent className="p-5 grid grid-cols-1 md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-5">
                        <div>
                            <img
                                src={data.User?.image as string}
                                alt="user"
                                className="w-10 h-10 rounded-s-lg"
                            />
                            <p className="text-sm font-medium text-muted-foreground mt-1">{data.User?.name}</p>
                            <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
                            <p className="text-sm font-medium text-muted-foreground">{data.description}</p>
                            
                            <div className="mt-5 flex flex-col gap-y-3">
                                <p className="flex items-center">
                                    <CalendarX2 className="size-4 mr-2 text-primary"/>
                                    <span className="text-sm font-medium text-muted-foreground">{formattedDate}</span>
                                </p>
                                <p className="flex items-center">
                                    <Clock className="size-4 mr-2 text-primary"/>
                                    <span className="text-sm font-medium text-muted-foreground">{data.duration} Minutes</span>
                                </p>
                                <p className="flex items-center">
                                    <VideoIcon className="size-4 mr-2 text-primary"/>
                                    <span className="text-sm font-medium text-muted-foreground">{data.videoCallSoftware}</span>
                                </p>
                            </div>
                        </div>

                        <Separator orientation="vertical" className="w-[1px] h-full" />
                        
                        <RenderCalendar availability={data.User?.availability as any} />
                        
                        <Separator orientation="vertical" className="w-[1px] h-full" />

                        <TimeTable duration={data.duration}  selectedDate={selectedDate} userName={params.username} />

                    </CardContent>
                </Card>
            )}
        </div>
    );
}
 
