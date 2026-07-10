"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Lightbulb,
  AlertCircle,
  FileText,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";

interface ViewServiceModalProps {
  service: any;
  children: React.ReactNode;
}

export default function ViewServiceModal({
  service,
  children,
}: ViewServiceModalProps) {
  const [open, setOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            {service?.serviceName}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {/* Service Image */}
            <div className="relative h-64 w-full rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={service?.serviceMedia}
                height={200}
                width={500}
                alt={service?.serviceName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm font-semibold">
                  {service?.totalBooked || 0} Bookings
                </Badge>
              </div>
            </div>

            {/* Importance Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-blue-900">
                <AlertCircle className="h-5 w-5" />
                <h3 className="font-bold text-lg">Why It&apos;s Important</h3>
              </div>
              <p className="text-sm text-blue-900 leading-relaxed">
                {service?.importance}
              </p>
            </div>

            {/* Description Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-900">
                <FileText className="h-5 w-5" />
                <h3 className="font-bold text-lg">Service Description</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {service?.description}
              </p>
            </div>

            <Separator />

            {/* Did You Know Section */}
            {service?.dyk && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-yellow-900">
                  <Lightbulb className="h-5 w-5" />
                  <h3 className="font-bold text-lg">Did You Know?</h3>
                </div>
                <p className="text-sm text-yellow-900 leading-relaxed">
                  {service?.dyk}
                </p>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 mb-5 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs font-medium">Total Bookings</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {service?.totalBooked || 0}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg  p-4 border">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs font-medium">Created On</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {formatDate(service?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
