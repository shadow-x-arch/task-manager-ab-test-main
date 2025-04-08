import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TruncateTextProps {
  (text: string, maxCharacters: number): string;
}

export const truncateText: TruncateTextProps = (text, maxCharacters) => {
  if (text.length <= maxCharacters) {
    return text;
  } else {
    return text.slice(0, maxCharacters) + " ...";
  }
};
