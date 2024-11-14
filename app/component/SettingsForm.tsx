"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./SubmitButtons";
import { useFormState } from "react-dom";
import { SettingsAction } from "../action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingsSchema } from "../lib/zodSchemas";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Delete, icons, Trash2 } from "lucide-react";
import { UploadDropzone } from "../lib/uploadthing";
import { error } from "console";
import { toast } from "sonner";

interface iSettingsFormProps {
    fullName: string;
    email: string;
    profleImage: string;
}

export function SettingsForm({email, fullName, profleImage} : iSettingsFormProps) {

    const [lastResult, action] = useFormState(SettingsAction, undefined);
    const [currentProfileImage, setCurrentProfileImage] = useState(profleImage);
    const [form, fields] = useForm({
        lastResult,
        onValidate({formData}){
            return parseWithZod(formData, {
                schema: settingsSchema,
            });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    const handleProfileImageChange = () => {
        setCurrentProfileImage("");
    }

    return(
        <Card>
            <CardHeader>
                <CardTitle>
                    Settings
                </CardTitle>
                <CardDescription>Manage your account settings.</CardDescription>
            </CardHeader>

            <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
                <CardContent className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-2">
                        <Label>Full Name</Label>
                        <Input name={fields.fullName.name} key={fields.fullName.key} defaultValue={fullName} placeholder="Full Name" />
                        <p className="text-sm text-red-500">{fields.fullName.errors}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Email</Label>
                        <Input disabled defaultValue={email} placeholder="Email" />
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <Label>Profile Image</Label>
                        <input type="hidden" name={fields.profileImage.name} key={fields.profileImage.key} value={currentProfileImage} />
                        {
                            currentProfileImage ?(
                                <div className="relative size-24">    
                                    <img src={currentProfileImage} alt="profile" className="size-24 rounded-md" />
                                    <Button  onClick={handleProfileImageChange} type="button" size="icon" variant="destructive" className="absolute -right-2 -top-2 " >
                                        <Trash2 className="size-4"/>
                                    </Button>
                                </div>
                            ) : (
                                <UploadDropzone onClientUploadComplete={(res) => {
                                    setCurrentProfileImage(res[0].url);
                                    toast.success("Profile Image Uploaded Successfully");
                                }} 
                                onUploadError={(error) => {
                                    console.log("error", error);
                                    toast.error(error.message);
                                }}
                                endpoint='imageUploader'/>
                            )
                        }
                        <p className="text-sm text-red-500">{fields.profileImage.errors}</p>
                    </div>
                </CardContent>
                <CardFooter> <SubmitButton text="Save Changes" /> </CardFooter>
            </form>

        </Card>
    )
}