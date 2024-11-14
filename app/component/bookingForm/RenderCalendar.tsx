"use client";
import { CloudCog } from "lucide-react";
import { Calendar } from "./Calendar";

import {today, getLocalTimeZone, parseDate, CalendarDate} from "@internationalized/date";
import { DateValue } from "react-aria";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface RenderCalendarProps {
    availability: {
        day: string;
        isActive: boolean;
    }[];
}

export function RenderCalendar({availability}: RenderCalendarProps) {
    const searchParam = useSearchParams();
    const router = useRouter();
    const [date, setDate] = useState(() => {
        const dateParam = searchParam.get("date");
        return dateParam ? parseDate(dateParam) : today(getLocalTimeZone());
    })

    useEffect(() => {
        const dateParam = searchParam.get("date");
        if (dateParam) {
            setDate(parseDate(dateParam));
        }
    },[searchParam])

    const handleDateChange = (date: DateValue) => {
        setDate(date as CalendarDate);
        const url = new URL(window.location.href);
        url.searchParams.set("date", date.toString());
        router.push(url.toString()); 
    }

    const isDateUnavailable = (date: DateValue) => {
        const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
        const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        return !availability[adjustedIndex].isActive;
    }
    return <Calendar minValue={today(getLocalTimeZone())} isDateUnavailable={isDateUnavailable} value={date} onChange={handleDateChange}/>  
} 
