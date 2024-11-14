import { EditEventTypeForm } from "@/app/component/EditEventTypeForm";
import prisma from "@/app/lib/db"
import { notFound } from "next/navigation";

async function getData(eventTypeId: string) {
    const data = await prisma.eventType.findUnique({
        where:{
            id: eventTypeId,
        },
        select:{
            title: true,
            duration: true,
            url: true,
            description: true,
            videoCallSoftware: true,
            id: true,
        }
    })

    if (!data) {
        return notFound();
    }

    return data;
}


export default async function EditRoute(props: {params: Promise<{eventTypeId: string}> }) {
    const params = await props.params;
    const data = await getData(params.eventTypeId);
    return (
        <EditEventTypeForm videoCallSoftware={data.videoCallSoftware} description={data.description} duration={data.duration} title={data.title} id={data.id} url={data.url}/>
    )
}