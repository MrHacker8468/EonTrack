import { nylus, nylusConfig } from "@/app/lib/nylas";
import { redirect } from "next/navigation";

export async function GET(){
    const authURL = nylus.auth.urlForOAuth2({
        clientId:nylusConfig.clientId,
        redirectUri:nylusConfig.redirectUri,
    });

    return redirect(authURL);
} 