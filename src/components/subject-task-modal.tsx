"use client";
import dayjs from "dayjs";
import React, { ChangeEvent, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { Check, CircleX } from "lucide-react";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { trpc } from "@/app/_trpc/client";
import { DatePicker } from "./ui/date-picker";
import { toast } from "sonner";

type Props = {
  subject: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hideTasks?: boolean;
};

dayjs.extend(relativeTime);

const SubjectTaskModal = ({
  subject,
  open,
  onOpenChange,
  hideTasks,
}: Props) => {
  const [deadline, setDeadline] = useState<Date>();
  const [task, setTask] = useState<string>("");

  const utils = trpc.useContext();

  const { data, isLoading, isError } =
    trpc.taskRouter.getTaskBySubject.useQuery({ subject });

  const { mutateAsync: createTask } = trpc.taskRouter.createTask.useMutation();
  const { mutateAsync: updateTask } = trpc.taskRouter.updateTask.useMutation();
  const { mutateAsync: deleteTask } = trpc.taskRouter.deleteTask.useMutation();

  const handleAddTask = async () => {
    if (!task) {
      toast.error("Morate uneti zadatak.");
      return;
    }

    if (!deadline) {
      toast.error("Morate uneti datum završetka zadatka.");
      return;
    }

    const promise = createTask(
      {
        subject,
        deadline: deadline.toISOString(),
        task,
      },
      {
        onSuccess: () => {
          utils.taskRouter.getTaskBySubject.invalidate();
          utils.taskRouter.getAllUserTask.invalidate();

          setTask("");
          setDeadline(undefined);
        },
      }
    );

    toast.promise(promise, {
      loading: "Dodavanje zadatka...",
      success: "Zadatak uspešno dodat.",
      error: "Greška prilikom dodavanja zadatka.",
    });
  };

  const handleFinishTask = (taskId: string, done: boolean) => {
    const promise = updateTask(
      {
        id: taskId,
        done: !done,
        subject,
      },
      {
        onSuccess: () => {
          utils.taskRouter.getTaskBySubject.invalidate();
        },
      }
    );

    toast.promise(promise, {
      loading: "Označavanje zadatka...",
      success: "Zadatak označen kao završen.",
      error: "Greška prilikom označavanja zadatka.",
    });
  };

  const handleDeleteTask = (taskId: string) => {
    const promise = deleteTask(
      {
        id: taskId,
      },
      {
        onSuccess: () => {
          utils.taskRouter.getTaskBySubject.invalidate();
        },
      }
    );

    toast.promise(promise, {
      loading: "Brisanje zadatka...",
      success: "Zadatak uspešno obrisan.",
      error: "Greška prilikom brisanja zadatka.",
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleDateChange = (date?: Date) => {
    setDeadline(date);
  };

  //sort data by date of creation
  data?.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{subject}</DialogTitle>
          <DialogDescription>
            {hideTasks
              ? "Dodaj zadatak za ovaj predmet"
              : "Dodaj, izmeni ili obriši zadatke za ovaj predmet."}
          </DialogDescription>
        </DialogHeader>

        {hideTasks ? (
          <></>
        ) : (
          <div className="flex flex-col gap-2">
            {data?.map((task) => (
              <div
                className="p-4 border border-gray-800/20 rounded-lg flex justify-between"
                key={task.id}
              >
                <p
                  className={cn({
                    "line-through": task.done,
                  })}
                >
                  {task.task}
                </p>

                <div className="flex gap-2 items-center">
                  <p className={cn("text-gray-700 dark:text-gray-400")}>
                    {dayjs(task.deadline).fromNow()}
                  </p>
                  <Check
                    onClick={() => {
                      handleFinishTask(task.id, task.done);
                    }}
                    className={cn(
                      "hover:cursor-pointer stroke-black dark:stroke-white w-6",
                      {
                        "stroke-green-500 dark:stroke-green-400": task.done,
                      }
                    )}
                  />
                  <CircleX
                    onClick={() => {
                      handleDeleteTask(task.id);
                    }}
                    className="hover:cursor-pointer stroke-red-500 dark:stroke-red-400 w-6"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 justify-between">
          <Input
            value={task}
            onChange={handleInputChange}
            placeholder="Uradi projekat..."
            className="basis-2/3"
          />
          <DatePicker date={deadline} onDateChange={handleDateChange} />
        </div>
        <Button onClick={handleAddTask} className="w-full">
          Dodaj
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SubjectTaskModal;
