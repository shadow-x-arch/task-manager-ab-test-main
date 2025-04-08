export const addTodo = async (newTodo: {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}) => {
  const response = await fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
