import {
  ReactNode,
  ReactElement,
  MouseEventHandler,
  useState,
  useEffect,
} from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface PopupProps {
  children: ReactElement | ReactElement[];
  setClosed?: (x: boolean) => void;
  childrenTrigger?: React.ReactNode;
  dialogFooter?: React.ReactNode;
  manualClosing?: boolean;
}
export default function PopUp({
  children,
  dialogFooter,
  manualClosing,
  setClosed,
  childrenTrigger,
}: PopupProps) {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (manualClosing && manualClosing === true) setOpen(false);
    setClosed && setClosed(false);
  }, [manualClosing]);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger>{childrenTrigger}</DialogTrigger>

      <DialogContent className="min-w-[35%] relative h-[70vh]  rounded-xl border bg-white dark:bg-gray-900 px-5 text-left align-middle  shadow-xl transition-all scrollbar-thin ">
        {children}
        <div
          className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
          )}
        >
          {dialogFooter}
        </div>
      </DialogContent>
    </Dialog>
  );
}
