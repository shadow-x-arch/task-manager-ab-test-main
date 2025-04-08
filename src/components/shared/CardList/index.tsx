"use client";

import { useQuery } from "@tanstack/react-query";
import Card from "../Card";
import { useEffect } from "react";
import { TaskType, useTaskStore } from "@/components/Store/useTaskStore";

const CardList = () => {
  const { data, isLoading, isFetching } = useQuery<{
    todos: { id: number; todo: string; completed: boolean; userId: number }[];
  }>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const { tasks, show, setTasks } = useTaskStore();

  useEffect(() => {
    if (isFetching || isLoading) return;

    const statuses = ["completed", "todo", "in-progress", "sideTasks"];

    setTasks(
      (data?.todos ?? []).map((info, i) => {
        return {
          id: info.id,
          title: info.todo,
          status: statuses[i % statuses.length] as
            | "completed"
            | "todo"
            | "in-progress"
            | "sideTasks",
          userId: generateUniqueRandomUsers((i + 1) % 4),
        };
      })
    );
  }, [data?.todos, isFetching, isLoading, setTasks]);

  return (
    <>
      {filteredTasks(show, tasks).map((obj, idx) => (
        <Card
          key={idx}
          index={idx}
          id={obj.id}
          status={obj.status}
          title={obj.title}
          users={[]}
        />
      ))}
    </>
  );
};

export default CardList;
const getTodos = async () => {
  const res = await fetch(`https://dummyjson.com/todos`);
  return res.json();
};
function generateUniqueRandomUsers(length: number): number[] {
  const possibleValues = [1, 2, 3, 4];
  const result: number[] = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * possibleValues.length);
    result.push(possibleValues[randomIndex]);
    possibleValues.splice(randomIndex, 1);
  }

  return result;
}
export const filteredTasks = (
  show: "all" | "completed" | "in-progress" | "todo" | "sideTasks",
  tasks: TaskType[]
) => {
  switch (show) {
    case "all":
      return tasks;
    case "completed":
      return tasks?.filter((task) => task.status === "completed");
    case "todo":
      return tasks?.filter((task) => task.status === "todo");
    case "in-progress":
      return tasks?.filter((task) => task.status === "in-progress");
    case "sideTasks":
      return tasks?.filter((task) => task.status === "sideTasks");
    default:
      return [];
  }
};
