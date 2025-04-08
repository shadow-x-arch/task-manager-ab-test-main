"use client";
import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import { ReactElement, createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCheckIcon, CheckCircle } from "lucide-react";

interface toastOptions {
  title: string;
  description: string;
}

interface contextType {
  toast: (x: toastOptions) => void;
}

const ToastContext = createContext<contextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastInfo, setToastInfo] = useState<toastOptions>({
    title: "",
    description: "",
  });

  const [open, setOpen] = React.useState(false);
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const toast = ({ title, description }: toastOptions) => {
    setOpen(false);
    setToastInfo({ title, description });
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, 100);
  };

  const value: contextType = {
    toast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="z-30 flex bg-white dark:bg-gray-700 items-center gap-3 rounded-lg  p-2 py-3 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] "
          open={open}
          onOpenChange={setOpen}
        >
          <span
            className={cn(
              " bg-green-200",
              "flex h-[40px] w-[50px] items-center justify-center rounded-lg"
            )}
          >
            <CheckCircle className="size-4 dark:text-gray-800" />
          </span>
          <div data-testid="toast-success" className="z-30 flex flex-col">
            <h3 className="text-sm mb-1 [grid-area:_title]">
              {toastInfo.title}
            </h3>
            <p className="text-xs text-hc-gray-600 dark:text-gray-300">
              {toastInfo.description}
            </p>
          </div>
        </Toast.Root>
        <Toast.Viewport className="[--viewport-padding:_25px] fixed top-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
