"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Calendar,
  MessageCircleMore,
  Search,
  Send,
  Star,
  EllipsisVertical,
  Users,
} from "lucide-react";
import Ellipsis from "../../../assets/Ellipsis.svg";
import { AvatarGroup } from "../AvatarGroup";
import Image from "next/image";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";
import {
  TaskStatusType,
  TaskType,
  useTaskStore,
} from "@/components/Store/useTaskStore";
import { dummyUsers } from "@/lib/dummyUsers";

export interface CardProps {
  index: number;
  id: number;
  title: string;
  status: "completed" | "in-progress" | "todo" | "sideTasks";
  users: number[];
}

export default function Card({ index, id, title, status }: CardProps) {
  const hasImage = (index as number) % 2 === 0;

  const randomImage = () => {
    if (index % 3 === 0)
      return "https://images.nightcafe.studio/ik-seo/jobs/7rIoZDWybhIwoZRiQJ8m/7rIoZDWybhIwoZRiQJ8m--0--sza9m/the-good-samaritan-lessloraantique-watercolor-210greater.jpg?tr=w-1080,c-at_max";
    if (index % 4 === 0)
      return "https://images.nightcafe.studio/ik-seo/jobs/eh5AeSrtpeAFcK8I6prF/eh5AeSrtpeAFcK8I6prF--0--nlt3x/the-yellow-truck-at-dusk.jpg?tr=w-1600,c-at_max";
    else
      return "https://images.nightcafe.studio/ik-seo/jobs/L7OIczWcxNuE0JQOQhPH/L7OIczWcxNuE0JQOQhPH-TTdlP-adjusted_2x-real-esrgan-x4-plus/coastal-village.jpg?tr=w-1600,c-at_max";
  };

  return (
    <div
      data-testid="task-card"
      className={cn(
        "class flex max-h-max flex-col gap-4 rounded-xl border border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800 lg:p-4",
        {
          "row-span-2": hasImage,
          "row-span-1": !hasImage,
        }
      )}
    >
      {hasImage && (
        <figure className="relative h-64 w-full rounded-xl">
          <Image
            src={randomImage() as string}
            alt="task image"
            fill
            fetchPriority="auto"
            className="rounded-t-xl object-cover lg:rounded-xl"
          />
        </figure>
      )}
      <div
        className={cn("flex items-center justify-between px-4 lg:px-0", {
          "pt-4 lg:pt-0": !hasImage,
        })}
      >
        <Status variant={status} />
        <DropdownHandleStatus taskId={id} taskStatus={status} />
      </div>
      <div className="flex flex-col px-4 lg:px-0">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-100 dark:text-gray-200">Landing page</p>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-gray-100 px-4 pb-4 pt-2 dark:border-gray-700 lg:px-0 lg:pb-0">
        <div className="flex">
          <AvatarGroup showTooltip items={dummyUsers} />
        </div>
        <Sheet>
          <SheetTrigger>
            <Button
              variant="ghost"
              className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-300"
            >
              <MessageCircleMore className="size-5" />
              <p>17</p>
            </Button>
          </SheetTrigger>
          <SheetContent className="flex h-screen flex-col gap-8">
            <SheetHeader>
              <SheetTitle>
                <div className="flex items-center justify-between">
                  <h2>Project Overview</h2>
                  <Button variant="ghost" className="text-sm">
                    See all
                  </Button>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="relative flex flex-col gap-6 rounded-lg bg-highlight-blue p-4 pl-8 text-gray-500 dark:bg-gray-800 dark:text-gray-200">
              <span className="absolute  left-0 top-1/2 hidden h-3/5 w-1.5 -translate-y-1/2 rounded-r-lg bg-primary lg:inline-block" />
              <div className="flex items-center gap-2 text-sm">
                <p className="flex items-center gap-2 text-sm">
                  <Calendar className="size-4" /> Timeline:
                </p>
                <p className="text-sm font-medium text-black dark:text-white">
                  April 14 - May 7
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <p className="flex items-center gap-2 text-sm">
                  <Users className="size-4" /> Members:
                </p>
                <div className="flex flex-wrap items-center gap-1">
                  {[...new Array(6)].map((_, idx) => (
                    <Avatar className="size-8" key={idx}>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <p className="flex items-center gap-2 text-sm">
                  <Star className="size-4" /> Status:
                </p>
                <p className="text-sm font-medium text-black dark:text-white">
                  In progress
                </p>
              </div>
            </div>
            <div className="flex h-full flex-col gap-4">
              <div className="row-span-1 flex items-center justify-between">
                <h3 className="text-base font-semibold">Team Chat</h3>
                <EllipsisVertical className="size-4" />
              </div>
              <div className="hide-scrollbar row-span-4 flex h-[300px] flex-grow flex-col gap-8 overflow-auto px-4 py-4">
                {[...new Array(10)].map((_, idx) => (
                  <div key={idx} className="space-y-1">
                    <div
                      className={cn("flex items-center gap-2", {
                        "flex-row-reverse justify-start": idx % 2 == 0,
                      })}
                    >
                      <Avatar className="size-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <h4 className="text-base font-semibold text-black dark:text-white">
                        octave
                      </h4>
                      <p className="text-xs text-gray-500">12:33 AM</p>
                    </div>
                    <div
                      className={cn(
                        "w-11/12 rounded-xl bg-gray-100 px-4 py-2 dark:bg-gray-800",
                        {
                          "ml-auto": idx % 2 != 0,
                        }
                      )}
                    >
                      <p className="text-sm leading-8 ">
                        This looks promising! 🙌
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row-span-1 mt-auto">
                <div className="relative rounded-xl bg-gray-100 dark:bg-gray-700">
                  <input
                    className="h-12 w-full rounded-xl bg-transparent px-4 pr-12 text-sm outline-primary transition-all"
                    placeholder="Type your message..."
                  />
                  <Send
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
                    strokeWidth={1}
                    fill="rgba(0, 160, 220, 1)"
                  />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

interface statusProps {
  variant: TaskStatusType;
  className?: string;
}
const Status = ({ variant, className }: statusProps) => {
  const { t } = useTranslation();

  const variants = cva("rounded-lg  px-2 py-1 text-xs  max-w-max", {
    variants: {
      variant: {
        todo: "text-orange-500 bg-orange-100 dark:bg-orange-300 dark:text-orange-800",
        "in-progress":
          "bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-300",
        completed:
          "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-300",
        sideTasks: "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-300",
      },
    },
  });
  return (
    <p className={cn(variants({ variant, className }))}>
      {t(`task:${variant}`)}
    </p>
  );
};

const DropdownHandleStatus = ({
  taskId,
  taskStatus,
}: {
  taskId: number;
  taskStatus: TaskStatusType;
}) => {
  const { t } = useTranslation();

  const { tasks, setTasks } = useTaskStore();

  const handleChangeStatus = (newStatus: TaskStatusType) => {
    setTasks(updateTaskStatus(tasks, taskId, newStatus));
  };

  return (
    <div className="flex items-center justify-between  border-gray-100 px-4 pb-4 pt-2 dark:border-gray-700 lg:px-0 lg:pb-0">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button
            variant="ghost"
            data-testid="change-status-button"
            className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-300"
          >
            <EllipsisVertical className="size-4" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          align="end"
          className="flex flex-col gap-4 p-4 rounded-lg bg-highlight-blue dark:bg-gray-900"
        >
          <DropdownMenu.Item className="mr-auto">
            {t(`task:changeStatus`)}{" "}
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="border" />
          {["completed", "in-progress", "todo", "sideTasks"]
            .filter((status) => status !== taskStatus)
            .map((status, idx) => (
              <DropdownMenu.Item
                key={idx}
                className="hover:text-primary border-none cursor-pointer"
                onClick={() => handleChangeStatus(status as TaskStatusType)}
              >
                {t(`task:${status}`)}
              </DropdownMenu.Item>
            ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export function updateTaskStatus(
  tasks: TaskType[],
  id: number,
  newStatus: TaskStatusType
): TaskType[] {
  return tasks.map((task) => {
    if (task.id === id) {
      // Return a new object with the updated status
      return { ...task, status: newStatus };
    }
    // Return the task as is if the id doesn't match
    return task;
  });
}
