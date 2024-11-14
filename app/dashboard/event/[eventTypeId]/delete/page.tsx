import { deleteEventType } from "@/app/action";
import { SubmitButton } from "@/app/component/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function DeleteEvent(props: {params: Promise<{eventTypeId: string}>}) {
    const params = await props.params;
    return (
        <div className="flex flex-1 items-center justify-center">
            <Card className="max-w-[500px]">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle><span className="text-red-500">Delete Meeting Event</span></CardTitle>
                    <CardDescription>Are you sure you want to delete this meeting event?</CardDescription>
                </CardHeader>
                <CardFooter className="w-full flex justify-between">
                    <Button variant="outline" className="">
                        <Link href="/dashboard">Cancel</Link>
                    </Button>
                    <form action={deleteEventType}>
                        <input type="hidden" name="id" value={params.eventTypeId} />
                        <SubmitButton text="Delete" variant={"destructive"} />
                    </form>
                </CardFooter>
            </Card>

        </div>
    )
}