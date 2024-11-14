"use client";
import { Switch } from "@/components/ui/switch";
import { useFormState } from "react-dom";
import { UpdateEventTypeSwitchAction } from "../action";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";



export function MenuActiveSwitch({inintChecked, eventTypeId}: {inintChecked: boolean, eventTypeId: string}) {
    
    const [isPending, startTransition] = useTransition();
    const [state, action] = useFormState(UpdateEventTypeSwitchAction, undefined);
    useEffect(() => {
        if (state?.status === "success") {
            toast.success(state.message);
        }else if (state?.status === "error") {
            toast.error(state.message);
        } 
    }, [state]);
    return <Switch disabled={isPending} onCheckedChange={(isChecked) =>{
        startTransition(() => {
            action({
                eventTypeId: eventTypeId,
                isChecked: isChecked,
            });
        });
    }} defaultChecked = {inintChecked} />
}