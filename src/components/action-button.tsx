import React, { useState } from "react";
import { FilePenLine } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import SubjectTaskModal from "./subject-task-modal";

type Props = {
  subject: string;
};

const ActionButton = ({ subject }: Props) => {
  const [open, setOpen] = useState(false);

  const { isSignedIn } = useAuth();

  if (!isSignedIn) return null;

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <FilePenLine
        onClick={handleOpen}
        className={cn("hover:stroke-black/50 hover:cursor-pointer")}
      />
      <SubjectTaskModal
        subject={subject}
        open={open}
        onOpenChange={handleOpenChange}
      />
    </div>
  );
};

export default ActionButton;
