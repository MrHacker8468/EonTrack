"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import Googlelogo from "@/public/Google-logo.svg"
import GitHublogo from "@/public/GItHub-logo.svg"

import Image from "next/image";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface iSubmitButtonProps {
    text: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    className?: string;
} 

export function SubmitButton({text, variant, className} : iSubmitButtonProps) {
    const {pending} = useFormStatus();
    return(
        <>
        {
            pending ? (
                <Button disabled variant="outline" className={cn("w-fit",className)}> 
                    <Loader2 className="mr-2 size-4 animate-spin"/> Please wait
                </Button>
            ):(
                <Button type="submit" variant={variant} className={cn("w-fit",className)} >{text}</Button>
            )
        }
        </>
    )
}

export function GoogleAuthButton() {
    const {pending} = useFormStatus();
    return (
        <>
        {pending ? (
            <Button disabled variant="outline" className="w-full">
                <Loader2 className="mr-2 size-4 animate-spin"/> Please wait
            </Button>
        ):(
            <Button variant="outline" className="w-full">
                <Image src={Googlelogo} alt="Google logo" className="size-4 mr-2"/> 
                Sign in with Google
            </Button>
        )}
        </>
    );  
}

export function GitHubAuthButton() {
    const {pending} = useFormStatus();
    return (
        <>
        {pending ? (
            <Button disabled variant="outline" className="w-full">
                <Loader2 className="mr-2 size-4 animate-spin"/> Please wait
            </Button>
        ):(
            <Button variant="outline" className="w-full">
                <Image src={GitHublogo} alt="GitHub logo" className="size-4 mr-2"/>
                Sign in with GitHub
            </Button>
        )}
        </>
    );  
}