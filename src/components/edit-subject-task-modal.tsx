"use client";
import dayjs from "dayjs";
import { toast } from "sonner";
import React, { ChangeEvent, useEffect, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "./ui/dialog";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { trpc } from "@/app/_trpc/client";
import { DatePicker } from "./ui/date-picker";
import { Task } from "@/lib/types";

type Props = {
  taskId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

dayjs.extend(relativeTime);

const EditSubjectTaskModal = ({ taskId, open, onOpenChange }: Props) => {
  const { data, isLoading, isError } = trpc.taskRouter.getSingleTask.useQuery({
    id: taskId,
  });
  const [editedTask, setEditedTask] = useState<Task | undefined>(data);
  const utils = trpc.useContext();

  const { mutateAsync: updateTask } = trpc.taskRouter.updateTask.useMutation();

  useEffect(() => {
    setEditedTask(data);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error, something went wrong</div>;

  const handleEdit = () => {
    if (!editedTask) {
      toast.error("Morate uneti zadatak.");
      return;
    }
    if (!editedTask.task) {
      toast.error("Morate uneti zadatak.");
      return;
    }

    if (!editedTask.deadline) {
      toast.error("Morate uneti datum završetka zadatka.");
      return;
    }

    const promise = updateTask(editedTask, {
      onSuccess: () => {
        utils.taskRouter.getTaskBySubject.invalidate();
        utils.taskRouter.getAllUserTask.invalidate();
        utils.taskRouter.getSingleTask.invalidate({ id: taskId });
      },
    });

    toast.promise(promise, {
      loading: "Izmena zadatka...",
      success: "Zadatak uspesno izmenjen.",
      error: "Greška prilikom izmene zadatka.",
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTask((prev) => {
      if (!prev) return prev;
      return { ...prev, task: e.target.value };
    });
  };

  const handleDateChange = (date?: Date) => {
    setEditedTask((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        deadline: date?.toISOString() || new Date().toISOString(),
      };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data?.subject}</DialogTitle>
          <DialogDescription>Izmeni zadatak</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-4 justify-between">
          <Input
            value={editedTask?.task}
            onChange={handleInputChange}
            placeholder="Uradi projekat..."
            className="basis-2/3"
          />
          <DatePicker
            date={
              editedTask?.deadline ? new Date(editedTask?.deadline) : undefined
            }
            onDateChange={handleDateChange}
          />
        </div>
        <Button onClick={handleEdit} className="w-full">
          Izmeni
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditSubjectTaskModal;
