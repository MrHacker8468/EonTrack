import Nylus from 'nylas';


export const nylus = new Nylus({
    apiKey: process.env.NYLUS_API_KEY!,
    apiUri: process.env.NYLUS_API_URI!,
});

export const nylusConfig = {
    clientId:process.env.NYLUS_CLIENT_ID!,
    redirectUri:process.env.NEXT_PUBLIC_URI + "/api/oauth/exchange", 
    apiKey: process.env.NYLUS_API_KEY!,
    apiUri: process.env.NYLUS_API_URI!
}