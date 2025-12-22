"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScanEye } from "lucide-react";

export default function ViewServiceModal(id) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className=" rounded-[6px] font-medium  cursor-pointer">
          <ScanEye
            className="text-bprimary rounded-[6px] p-1 bg-bprimary/20"
            size={30}
          ></ScanEye>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Service Details</DialogTitle>
        </DialogHeader>
        gfsfsdfsdfsdf
      </DialogContent>
    </Dialog>
  );
}
