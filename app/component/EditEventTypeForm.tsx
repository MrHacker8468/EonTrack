"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useState } from "react";
import { useFormState } from "react-dom";
import { UpdateEventTypeAction } from "../action";
import { eventTypeSchema } from "../lib/zodSchemas";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "./SubmitButtons";
import Link from "next/link";


type VideoCallProvider = "Google Meet" | "Zoom Meeting" | "Microsoft Teams";

interface EditEventTypeFormProps {
    id: string;
    title: string;
    description: string;
    duration: number;
    url: string;
    videoCallSoftware: string;
}

export function EditEventTypeForm({videoCallSoftware,description,duration,title,id,url} : EditEventTypeFormProps) {
    const [activePlatform, setActivePlatform] = useState<VideoCallProvider>(videoCallSoftware as VideoCallProvider);   
    
    const [lastResult, action] = useFormState(UpdateEventTypeAction, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({formData}){
            return parseWithZod(formData, {
                schema: eventTypeSchema,
            });
        },

        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <div className="w-full h-full flex flex-1 intem-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Edit appointment type</CardTitle>
                    <CardDescription>Edit your appointment type that allows people to book appointments with you.</CardDescription>
                </CardHeader>
                <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                    <input type="hidden" name="id" value={id} />
                    <CardContent className="grid gap-y-5">
                        <div className="flex flex-col gap-y-3">
                            <Label>Title</Label>
                            <Input name={fields.title.name} key={fields.title.key} defaultValue={title} placeholder="30 Minutes Meeting" />
                            <p className="text-sm text-red-500">{fields.title.errors}</p>
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <Label>URL Slug</Label>
                            <div className="flex rounded-md">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">EonTrack.com/</span>
                                <Input name={fields.url.name} key={fields.url.key} defaultValue={url} className="rounded-l-none" placeholder="Example-url-1"/>
                                <p className="text-sm text-red-500">{fields.url.errors}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-3">
                            <Label>Description</Label>
                            <Textarea name={fields.description.name} key={fields.description.key} defaultValue={description} placeholder="Describe the agenda for the meeting!"/>
                            <p className="text-sm text-red-500">{fields.description.errors}</p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Duration</Label>
                            <Select name={fields.duration.name} key={fields.duration.key} defaultValue={String(duration)}>  
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a duration" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Duration</SelectLabel>
                                        <SelectItem value="15">15 Min</SelectItem>
                                        <SelectItem value="30">30 Min</SelectItem>
                                        <SelectItem value="45">45 Min</SelectItem>
                                        <SelectItem value="60">1 Hour</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-red-500">{fields.duration.errors}</p>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Meet Platform</Label>
                            <input type="hidden" name={fields.videoCallSoftware.name} key={fields.videoCallSoftware.key} value={activePlatform} />
                            <ButtonGroup  className="gap-x-2">
                                <Button type="button" onClick={() => setActivePlatform("Google Meet")} className="w-full " variant={activePlatform === "Google Meet" ? "secondary" : "outline"}>Google Meet</Button>
                                <Button type="button" onClick={() => setActivePlatform("Zoom Meeting")} className="w-full "variant={activePlatform === "Zoom Meeting" ? "secondary" : "outline"}>Zoom Meeting</Button>
                                <Button type="button" onClick={() => setActivePlatform("Microsoft Teams")} className="w-full "variant={activePlatform === "Microsoft Teams" ? "secondary" : "outline"}>Microsoft Teams</Button>
                            </ButtonGroup>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between w-full ">
                        <Button variant="secondary" className="hover:bg-red-700" asChild>
                            <Link href='/dashboard'>Cancel</Link>
                        </Button>
                        <SubmitButton className="hover:bg-green-600" text="Edit Event"/>
                    </CardFooter>
                </form>
            </Card>
 
        </div>
    )
}