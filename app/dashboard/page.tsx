import { notFound, redirect } from "next/navigation";
import { auth } from "../lib/auth";
import { requireUser } from "../lib/hooks";
import prisma from "../lib/db";
import { EmptyState } from "../component/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit3Icon, ExternalLinkIcon, Link2, Pencil, Settings2, Trash, Users2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CopyLinkMenuItem } from "../component/CopyLinkMenu";
import { MenuActiveSwitch } from "../component/EventTypeSwitcher";

async function getData(userId: string){
    const data = await prisma.user.findUnique({
        where:{
            id: userId,
        },
        select:{
            userName: true,
            eventTypes: {
                select: {
                  id: true,
                  active: true,
                  title: true,
                  duration: true,
                  url: true,
                }
            }
        },
    });

    if (!data){
        return notFound();
    }

    

    return data;
}

export default async function Dashboard() {
    const session = await requireUser();
    const data = await getData(session?.user?.id as string);


  return (
    <>
      {data.eventTypes.length === 0 ? (
        <EmptyState title="You have no Event Types" description="You can create one by clicking the button below." buttonText="Add Event Type" href="/dashboard/new" />
      ): (
        <>
          <div className="flex items-center justify-between px-2">
            <div className="hidden sm:grid gap-y-1">
              <h1 className="text-2xl md:text-3xl font-semibold">Event Types</h1>
              <p className="text-muted-foreground"> Create and manage your event types here.</p>
            </div>
            <Button asChild>
              <Link href="/dashboard/new">
                Create New Event
              </Link> 
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {data.eventTypes.map((item) => (
              <div key={item.id} className="overflow-hidden shadow rounded-lg border relative">

                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Settings2 className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Event</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild><Link href={`/${data.userName}/${item.url}`}><ExternalLinkIcon className="mr-2 size-4" />Preview</Link></DropdownMenuItem>
                        <CopyLinkMenuItem meetingUrl={`${process.env.NEXT_PUBLIC_URI}/${data.userName}/${item.url}`} />
                        <DropdownMenuItem asChild ><Link href={`/dashboard/event/${item.id}`}><Pencil className="mr-2 size-4" /> Edit</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href={`/dashboard/event/${item.id}/delete`}><Trash className="mr-2 size-4" />Delete </Link></DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Link href={`/`} className="flex items-center p-5">
                  <div className="flex-shrink-0 ">
                    <Users2 className="size-6" />
                  </div>
                  <div className="ml-5 w=0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500">
                        {item.duration} mins
                      </dt>
                      <dd className="text-xl font-medium">
                        {item.title}
                      </dd>
                    </dl>
                  </div>
                </Link>
                <div className="bg-muted px-5 py-3 justify-between items-center flex">
                  <MenuActiveSwitch inintChecked={item.active} eventTypeId={item.id} />
                  <Button asChild><Link href={`/dashboard/event/${item.id}`}><Edit3Icon className="size-6" />Edit Event</Link></Button>
                </div>

              </div>
            ))}
          </div>

        </>
      )}
    </>
  );
}