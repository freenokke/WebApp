import { Button } from "../shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/ui/dialog";
import { FC } from "react";
import { LucideIcon } from "lucide-react";
import React from "react";

interface ModalTriggerProps {
  dialogTitle: string;
  children: React.ReactNode;
  dialogDescription?: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  triggerButtonLabel?: LucideIcon | string;
}

const ModalTrigger: FC<ModalTriggerProps> = ({
  children,
  dialogTitle,
  triggerButtonLabel: TriggerLabel,
  dialogDescription,
  isOpen,
  setIsOpen
}) => {

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {TriggerLabel && (
        <DialogTrigger asChild>
          <Button>{typeof TriggerLabel === 'string' ? TriggerLabel : <TriggerLabel />}</Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default ModalTrigger;
