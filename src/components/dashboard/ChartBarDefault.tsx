"use client";

// import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAdminEarningsQuery } from "@/redux/features/user/user.api";

export const description = "A bar chart";

const chartConfig = {
  earning: {
    label: "Earning",
    color: "#7172cc",
  },
} satisfies ChartConfig;

export function ChartBarDefault() {
  const {data} = useAdminEarningsQuery("")
  
  return (
      <Card >
        <CardHeader>
          <CardTitle>Earning Report</CardTitle>
          {/* <CardDescription>January - June 2024</CardDescription> */}
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px] w-full"  config={chartConfig}>
            <BarChart accessibilityLayer data={data?.result}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="earning" fill="var(--color-earning)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
      </Card>
  );
}
