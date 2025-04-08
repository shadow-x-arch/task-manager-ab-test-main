"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeSwitch({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(
        "min-h-8 min-w-10 rounded-lg bg-gray-100 dark:bg-gray-800",
        className
      )}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" strokeWidth={1} />
      ) : (
        <Sun className="h-5 w-5" strokeWidth={1} />
      )}
    </Button>
  );
}
