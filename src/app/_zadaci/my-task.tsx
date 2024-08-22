"use client";

import { Task } from "@/lib/types";
import { trpc } from "../_trpc/client";
import { Check, CircleX, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "@/components/ui/button";
import SubjectTaskModal from "@/components/subject-task-modal";
import { useState } from "react";
import { toast } from "sonner";
import EditSubjectTaskModal from "@/components/edit-subject-task-modal";

type GroupedTask = {
  subject: string;
  tasks: Task[];
};

dayjs.extend(relativeTime);

function groupBySubject(tasks: Task[]): GroupedTask[] {
  const groupedTasks = tasks.reduce<Record<string, GroupedTask>>(
    (acc, task) => {
      const { subject } = task;
      if (!acc[subject]) {
        acc[subject] = {
          subject: subject,
          tasks: [],
        };
      }
      acc[subject].tasks.push(task);
      return acc;
    },
    {}
  );

  return Object.values(groupedTasks);
}

const MyTasks = () => {
  const { data, isLoading, isError } =
    trpc.taskRouter.getAllUserTask.useQuery();

  const { mutateAsync: updateTask } = trpc.taskRouter.updateTask.useMutation();
  const { mutateAsync: deleteTask } = trpc.taskRouter.deleteTask.useMutation();

  const utils = trpc.useContext();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error, something went wrong</div>;

  const groupedTasks = groupBySubject(data);

  const handleFinishTask = (taskId: string, done: boolean, subject: string) => {
    const promise = updateTask(
      {
        id: taskId,
        done: !done,
        subject,
      },
      {
        onSuccess: () => {
          utils.taskRouter.getAllUserTask.invalidate();
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
          utils.taskRouter.getAllUserTask.invalidate();
        },
      }
    );
    toast.promise(promise, {
      loading: "Brisanje zadatka...",
      success: "Zadatak uspešno obrisan.",
      error: "Greška prilikom brisanja zadatka.",
    });
  };

  groupedTasks.forEach((group) => {
    group.tasks.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  });

  return (
    <div className="flex flex-1 flex-col gap-4 w-full">
      <h1 className="text-3xl">Moji zadaci</h1>
      {groupedTasks.map((group) => (
        <div key={group.subject}>
          <TaskSubjectHeader subject={group.subject} />
          <ul>
            {group.tasks.map((task) => (
              <li
                className="p-4 border my-2 rounded-lg flex items-center justify-between"
                key={task.id}
              >
                <span
                  className={cn("", {
                    "line-through mr-2": task.done,
                  })}
                >
                  {task.task}
                </span>
                <span className="flex items-center gap-4">
                  <p className={cn("text-gray-700 dark:text-gray-400")}>
                    {dayjs(task.deadline).fromNow()}
                  </p>
                  {task.done ? <></> : <EditTask taskId={task.id} />}
                  <Check
                    onClick={() => {
                      handleFinishTask(task.id, task.done, task.subject);
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
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const TaskSubjectHeader = ({ subject }: { subject: string }) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className="flex items-center justify-between my-4">
      <p className="text-xl font-medium">{subject}</p>

      <Button variant="secondary" onClick={handleOpen}>
        Dodaj zadatak
      </Button>

      <SubjectTaskModal
        hideTasks={true}
        subject={subject}
        open={open}
        onOpenChange={handleOpenChange}
      />
    </div>
  );
};

const EditTask = ({ taskId }: { taskId: string }) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Pencil
        onClick={handleOpen}
        className="hover:cursor-pointer stroke-black dark:stroke-white w-6"
      />
      <EditSubjectTaskModal
        taskId={taskId}
        open={open}
        onOpenChange={handleOpenChange}
      />
    </>
  );
};

export default MyTasks;
