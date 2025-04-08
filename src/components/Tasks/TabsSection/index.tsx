"use client";

import { Button } from "@/components/ui/button";
import {
  Plus,
  SlidersHorizontal,
  Edit,
  Edit2Icon,
  Save,
  LoaderIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTaskStore } from "@/components/Store/useTaskStore";
import PopUp from "@/components/shared/PopUp";
import { Input } from "@/components/ui/input";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";

import { ImagePlus } from "lucide-react";
import { useState } from "react";
import { dummyUsers } from "@/lib/dummyUsers";
import { filter } from "lodash";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/shared/Toast";
import { useMutation } from "@tanstack/react-query";
import { addTodo } from "./util";
export default function TabsSection() {
  const { t } = useTranslation();
  const { show, tasks, setShow } = useTaskStore();
  const { toast } = useToast();

  const [isClosed, setClosed] = useState(false);

  const [title, setTitle] = useState<string>();

  const { mutate, isPending } = useMutation({
    mutationFn: addTodo,
    onSuccess: (data) => {
      toast({
        title: `Task saved successfully !`,
        description: "octave have been here 😉 ",
      });
      setClosed(true);

      console.log("added successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Error adding todo:", error);
    },
  });

  const handleSubmit = () => {
    mutate({
      id: 66,
      todo: ` ${title}` as string,
      completed: false,
      userId: 1,
    });
  };

  return (
    <div className="flex h-full flex-wrap items-center justify-between gap-2 rounded-2xl bg-white px-4 py-4 shadow-sm dark:bg-gray-800 lg:h-20 lg:py-0">
      <div className="flex h-full flex-wrap items-center">
        {["all", "completed", "in-progress", "todo", "sideTasks"].map(
          (status, idx) => (
            <Button
              key={idx}
              onClick={() =>
                setShow(
                  `${status as "all" | "completed" | "in-progress" | "todo" | "sideTasks"}`
                )
              }
              className={`group relative flex h-full max-h-none w-max items-center gap-2 rounded-b-lg border-primary bg-transparent px-4 hover:scale-100 hover:text-primary ${status === show ? `text-primary` : ``}`}
            >
              {show === status && (
                <motion.span
                  layoutId="active"
                  className="absolute inset-x-0 bottom-0 left-0 hidden h-1 w-full rounded-t-lg bg-primary lg:inline-block"
                />
              )}
              {t(`task:${status}`)}{" "}
              <span
                className={`inline-block rounded-sm  px-2 py-1 text-xs  transition-all group-hover:bg-highlight-blue group-hover:text-primary  dark:group-hover:bg-gray-700 ${status === show ? `dark:bg-gray-700 text-primary group-hover:text-primary bg-highlight-blue` : `bg-gray-100 text-gray-500 dark:bg-gray-900 dark:text-gray-200`}`}
              >
                {
                  tasks.filter((task) =>
                    status === "all" ? tasks.length : task.status === status
                  ).length
                }
              </span>
            </Button>
          )
        )}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button
          className="flex items-center gap-2 rounded-lg bg-transparent dark:border-gray-700 dark:text-gray-200"
          variant="outline"
        >
          <SlidersHorizontal className="size-4" />
          Filter & Sort
        </Button>
        <PopUp
          manualClosing={isClosed}
          setClosed={setClosed}
          childrenTrigger={
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-lg bg-transparent dark:border-gray-700 dark:text-gray-200"
            >
              <Plus className="size-4" /> {t(`task:newTask`)}
            </Button>
          }
        >
          <div className="flex flex-col pb-5">
            <div className="sticky top-0 mb-4 z-20 flex w-full items-center justify-between pt-3 text-xs ">
              <h2 className="flex  font-semibold text-foreground xl:text-base">
                New task
              </h2>
              <Button
                variant="default"
                onClick={handleSubmit}
                className="flex bg-primary items-center gap-2 rounded-lg text-white  dark:border-gray-700 dark:text-gray-200"
              >
                {isPending ? (
                  <LoaderIcon className="size-4" />
                ) : (
                  <>
                    <Save className="size-4" /> SAVE{" "}
                  </>
                )}
              </Button>
            </div>
            <form>
              <div className="flex h-36 flex-col gap-2">
                <Input
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input placeholder="Description" />

                <div className="flex h-52  flex-col bg-gray-100 dark:bg-gray-800 items-center justify-center rounded-xl border border-dashed  py-8 hover:cursor-pointer dark:border-gray-500 ">
                  <input
                    type="file"
                    hidden
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <span className="hover:shadow:sm flex h-20 w-20 items-center justify-center rounded-full bg-white dark:bg-hc-darkgray-400">
                    <ImagePlus
                      size={34}
                      className="text-primary"
                      // stroke={1.5}
                      strokeLinejoin="miter"
                    />
                  </span>
                  <p className="mt-2 text-xs text-hc-gray-800 dark:text-gray-400">
                    Drop your image here or&nbsp;
                    <span className="cursor-pointer text-primary underline">
                      browse
                    </span>
                  </p>
                  <p className="mt-2 text-xsm text-hc-gray-400">
                    Max image size 5MB, PNG or JPEG type supported.
                  </p>
                </div>
                <DropdownHandleAssignees />
              </div>

              {/* <Input type="image" /> */}
            </form>
          </div>
        </PopUp>
        {/* <Button
          variant="outline"
          className="flex items-center gap-2 rounded-lg bg-transparent dark:border-gray-700 dark:text-gray-200"
        >
          <Plus className="size-4" /> New Task
        </Button> */}
      </div>
    </div>
  );
}

const DropdownHandleAssignees = () => {
  const [assignedUsers, setUsers] = useState<number[]>([]);

  return (
    <>
      <div className="flex items-center justify-between  border-gray-100 px-4 pb-2 pt-2 dark:border-gray-700 lg:px-0 lg:pb-0">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button
              variant="ghost"
              className="flex items-center gap-1 text-sm text-gray-400  dark:text-gray-300"
            >
              Assignees <Edit2Icon size="10" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Separator className="border" />

          <DropdownMenu.Content
            align="start"
            className="flex flex-col gap-2  p-2 z-100 rounded-lg bg-gray-100 w-72 dark:bg-gray-800"
          >
            {dummyUsers.map((user, idx) => (
              <div
                key={idx}
                className="flex border-none gap-2 p-1 rounded-lg cursor-pointer  hover:text-primary"
                onClick={() => {
                  !assignedUsers.includes(user.id)
                    ? setUsers([...assignedUsers, user.id]) // add user
                    : setUsers([
                        ...assignedUsers.filter((id) => user.id !== id),
                      ]);
                }} // remove user
              >
                <input
                  type="checkbox"
                  checked={assignedUsers.includes(user.id) as boolean}
                />
                <Image
                  height={30}
                  width={30}
                  src={user.image}
                  alt={user.image}
                  className=" relative !m-0 size-6 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500   group-hover:scale-105 dark:border-gray-700"
                />
                {user.name}
              </div>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <div className="grid grid-col w-40 gap-2 p-2  rounded-lg bg-highlight-blue dark:bg-gray-800">
        {dummyUsers.filter((user) => assignedUsers.includes(user.id)).length ===
        0 ? (
          <>No user assigned</>
        ) : (
          dummyUsers
            .filter((user) => assignedUsers.includes(user.id))
            .map((user, idx) => (
              <div
                key={idx}
                className="flex flex-row border-none gap-2 p-1 rounded-lg  hover:text-accent-foreground"
              >
                <Image
                  height={30}
                  width={30}
                  src={user.image}
                  alt={user.image}
                  className="  !m-0 size-6 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500  group-hover:scale-105 dark:border-gray-700"
                />
                {user.name}
              </div>
            ))
        )}
      </div>
    </>
  );
};
