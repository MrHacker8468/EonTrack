import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import EventVideo from "@/public/Calendar.gif";
import { Button } from "@/components/ui/button";
import Link from "next/link";  
import { CalendarCheck2 } from "lucide-react";
export default function OnboardingRouteTWO() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>You are almost there!</CardTitle>
          <CardDescription>
            We need to connect your personalized{" "}
            <span className="text-ellipsis text-blue-500">Calendar</span> to
            your account.
          </CardDescription>
          <div className="justify-center items-center flex flex-col gap-y-2"><Image
            src={EventVideo}
            alt="Event"
            width={300}
            height={300}
            className="rounded-lg items-center justify-center"
          /></div>
        </CardHeader>
        <CardContent>
            <Button asChild className="w-full">
                <Link href="/api/auth"><CalendarCheck2 className="size-4 mr-2" />
                Connect Calendar to your Account</Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
