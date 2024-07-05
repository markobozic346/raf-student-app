import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DatePicker } from "./ui/date-picker";

type Props = {
  subject: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SubjectTaskModal = ({ subject, open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{subject}</DialogTitle>
          <DialogDescription>
            Dodaj, izmeni ili obriši zadatke za ovaj predmet.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 justify-between">
          <Input placeholder="Uradi projekat..." className="basis-2/3" />
          <DatePicker />
        </div>
        <Button className="w-full">Dodaj</Button>
      </DialogContent>
    </Dialog>
  );
};

export default SubjectTaskModal;
