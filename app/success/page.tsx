"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccessRoute() {
    const router = useRouter();

    useEffect(() => {
        // Set a 3-second delay before redirecting
        const timer = setTimeout(() => {
            router.push("/");
        }, 3000);

        // Clear the timeout if the component unmounts
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Card className="max-w-[600px] w-full mx-auto">
                <CardContent className="p-6 flex flex-col w-full items-center">
                    <div className="size-16 bg-green-500/10 rounded-full flex items-center justify-center">
                        <Check className="text-green-500 size-8" />
                    </div>
                    <h1 className="text-2xl font-semibold mt-4">
                        The meeting has been booked <span className="text-green-500">Successfully</span>
                    </h1>
                    <p className="text-sm font-medium text-muted-foreground mt-2 text-center">
                        You will receive an email with the meeting details
                    </p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" variant="outline" asChild>
                        <Link href="/">Close this Page</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
