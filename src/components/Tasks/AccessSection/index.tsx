"use client";

import { AvatarGroup } from "@/components/shared/AvatarGroup";
import { Button } from "@/components/ui/button";
import { dummyUsers } from "@/lib/dummyUsers";
import {
  BetweenHorizonalStart,
  LayoutGrid,
  Link,
  LockKeyhole,
  Plus,
} from "lucide-react";

export default function AccessSection() {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-200 sm:flex-row sm:items-center">
        <p className="flex items-center gap-2 text-sm font-semibold text-black dark:text-white">
          <LockKeyhole className="size-4" strokeWidth={2} /> Do you have Access?
        </p>
        <div className="flex sm:ml-4  sm:border-l sm:px-4">
          <AvatarGroup showTooltip items={dummyUsers} />
          <Button
            size="icon"
            className="ml-4 flex min-h-8 min-w-10 items-center justify-center rounded-full border bg-primary text-white"
          >
            <Plus className="size-4" strokeWidth={2} />
          </Button>
        </div>
      </div>
      <div className="ml-auto flex items-center sm:gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="min-h-8 min-w-10 rounded-lg bg-transparent text-black dark:text-white"
        >
          <Link className="size-4" strokeWidth={2} />
        </Button>
        <div className="space-x-2 sm:ml-4 sm:border-l sm:px-4">
          <Button
            size="icon"
            variant="ghost"
            className="min-h-8 min-w-10 rounded-lg bg-transparent text-black dark:text-white"
          >
            <BetweenHorizonalStart className="size-4" strokeWidth={2} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="min-h-8 min-w-10 rounded-lg bg-primary text-white dark:text-white"
          >
            <LayoutGrid className="size-4" strokeWidth={2} />
          </Button>
        </div>
      </div>
    </div>
  );
}
