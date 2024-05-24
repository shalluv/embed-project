"use client";
import {
  CardContent,
  CardFooter,
  CardHeader,
  Card as CardTemplate,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Props {
  title: string;
  value: number;
  unit: string;
}

const Card = ({ title, value, unit }: Props): JSX.Element => {
  const [color, setColor] = useState("bg-gray-500/60");

  useEffect(() => {
    setColor(
      (() => {
        switch (title) {
          case "AQI":
            if (value < 50) return "bg-green-500/60";
            if (value < 100) return "bg-yellow-500/60";
            if (value < 150) return "bg-red-500/60";
            else return "bg-purple-500/60";
          case "Temperature":
            if (value < 10) return "bg-blue-600/60";
            if (value < 25) return "bg-blue-300/60";
            if (value < 35) return "bg-yellow-500/60";
            else return "bg-red-500/60";
          case "Humidity":
            if (value < 30) return "bg-gray-300/60";
            if (value < 50) return "bg-blue-300/60";
            if (value < 70) return "bg-blue-500/60";
            else return "bg-blue-700/60";
          case "PM10":
            if (value < 50) return "bg-green-500/60";
            if (value < 100) return "bg-yellow-500/60";
            if (value < 150) return "bg-red-500/60";
            else return "bg-purple-500/60";
          default:
            return "bg-gray-500/60";
        }
      })()
    );
  }, [title, value]);

  return (
    <CardTemplate className="relative aspect-[3/4] w-64">
      <CardHeader className="text-center">
        <CardTitle className="z-10 scroll-m-20 text-2xl font-semibold tracking-tight">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-7xl">
          {value}
        </p>
      </CardContent>
      <div
        className={cn(
          "absolute left-1/2 top-1/2 z-50 aspect-square w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
          color
        )}
      ></div>
      <CardFooter className="absolute bottom-0 w-full items-center justify-center text-center">
        <p className="scroll-m-20 text-xl font-semibold tracking-tight text-card-foreground/40">
          {unit}
        </p>
      </CardFooter>
    </CardTemplate>
  );
};

export default Card;
