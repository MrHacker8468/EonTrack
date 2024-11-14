import { Button } from "@/components/ui/button";
import { AriaButtonProps, useButton, useFocusRing } from "react-aria";
import { CalendarState } from "react-stately";
import {mergeProps} from "@react-aria/utils";
import { useRef } from "react";

export function CalendarButton(props: AriaButtonProps<"button"> & {
    state?: CalendarState;
    side?: "left"|"right";
}) {

    const ref = useRef(null);
    const {buttonProps} = useButton(props, ref);
    const {focusProps} = useFocusRing()

    return(
        <Button
                variant="outline"
                size="icon" 
                ref={ref}
                disabled={props.isDisabled}
                {...mergeProps(buttonProps, focusProps )}
        >
            {props.children}
        </Button>
    )
}
