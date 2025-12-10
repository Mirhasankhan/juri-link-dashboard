"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUserrsByTimeQuery } from "@/redux/features/authSlice/authApi";
import Image from "next/image";
import { useState } from "react";

export default function UserAnalyticsCard() {
  const [current, setCurrent] = useState("daily");
  const { data: users } = useUserrsByTimeQuery(current);
  console.log(users?.result?.profileImages);

  return (
    <Card className="w-full h-full flex flex-col justify-around bg-gray-50 ">
      <CardHeader className="pb-4">
        <div className="flex lg:flex-row md:flex-col flex-col items-center justify-between">
          <h3 className="text-sm font-medium text-gray-600">New Users {current}</h3>
          <div className="flex gap-3">
            <button
              onClick={() => setCurrent("daily")}
              className={`${
                current == "daily" &&
                "bg-bprimary text-white px-4 py-1 rounded-[6px]"
              } font-medium`}
            >
              Daily
            </button>
            <button
              onClick={() => setCurrent("weekly")}
              className={`${
                current == "weekly" &&
                "bg-bprimary text-white px-4 py-1 rounded-[6px]"
              } font-medium`}
            >
              Weekly
            </button>
            <button
              onClick={() => setCurrent("monthly")}
              className={`${
                current == "monthly" &&
                "bg-bprimary text-white px-4 py-1 rounded-[6px]"
              } font-medium`}
            >
              Monthly
            </button>
          </div>
        </div>
        <h1 className="text-2xl py-16 font-semibold">
          {users?.result?.totalUsers}
        </h1>
        <div>
          <h1 className="font-medium">Join {current}</h1>
          <div className="flex mt-4 gap-3">
            {users?.result?.profileImages?.map((image: string) => (
              <Image
                className="h-12 w-12 rounded-full"
                key={image}
                src={image}
                height={30}
                width={30}
                alt=""
              ></Image>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent></CardContent>
      <CardContent className="space-y-6"></CardContent>
    </Card>
  );
}
