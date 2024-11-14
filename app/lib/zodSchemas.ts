import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";
export const onboardingSchema = z.object({
        fullName: z.string().min(3).max(100),
        userName: z.string().min(3).max(100).regex(/^[a-zA-Z0-9-]+$/, {
            message: "Username must be alphanumeric, number, special characters only!",
        }),
});

export function onboardingSchemaValidator(options?: {
    isUsernameUnique: () => Promise<boolean>;
}) {
    return z.object({
        userName: z.string().min(3).max(100).regex(/^[a-zA-Z0-9-]+$/, {
            message: "Username must be alphanumeric, number, special characters only!",
        })
        .pipe(
            z.string().superRefine((_, ctx) => {
                if(typeof options?.isUsernameUnique !== "function"){
                    ctx.addIssue({
                        code: "custom",
                        message: conformZodMessage.VALIDATION_UNDEFINED,
                        fatal: true,
                    });
                    return;
                }
                return options.isUsernameUnique().then((isUnique) =>{
                    if(!isUnique){
                        ctx.addIssue({
                            code: "custom",
                            message: "Username already exists!",
                        });
                    }
                });   
            })
        ),

        fullName: z.string().min(3).max(100),
    })
}

export const settingsSchema = z.object({
    fullName: z.string().min(3).max(100), 

    profileImage: z.string(),
    
});

export const eventTypeSchema = z.object({
    title: z.string().min(1).max(100),
    duration: z.number().min(15).max(60),
    url: z.string().min(3).max(150),
    description: z.string().min(3).max(500),
    videoCallSoftware: z.string().min(3),
});