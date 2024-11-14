import { nylus, nylusConfig }  from '@/app/lib/nylas';
import { requireUser } from "@/app/lib/hooks";
import { NextRequest } from "next/server";
import prisma from '@/app/lib/db';
import { redirect } from 'next/navigation';

export async function GET(req: NextRequest){
    const session = await requireUser();
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    if (!code) {
        return Response.json("No code found in the request", { status: 400 });
    }

    try {
        const response = await nylus.auth.exchangeCodeForToken({
            clientSecret: nylusConfig.apiKey,
            clientId: nylusConfig.clientId,
            redirectUri: nylusConfig.redirectUri,
            code,
        });

        const {grantId, email} = response

        await prisma.user.update({
            where:{
                id: session.user?.id,
            },
            data:{
                grantId: grantId,
                grantEmail: email,
            }
        })

    } catch (error) {
        console.log("error somthing went wrong", error);
    }

    redirect("/dashboard");
}