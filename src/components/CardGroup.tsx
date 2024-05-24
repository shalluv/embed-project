"use client";
import { useEffect, useState } from "react";
import Card from "./Card";

type Props = {};

const CardGroup = (props: Props): JSX.Element => {
  const [data, setData] = useState({
    aqi: 0,
    temperature: 0,
    humidity: 0,
    pm10: 0,
    timestamp: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/data");
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex w-full flex-col gap-8">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl">
        ข้อมูลล่าสุด (
        {new Date(data.timestamp).toLocaleDateString("th-th", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
        )
      </h2>
      <div className="flex w-full flex-wrap justify-center gap-4 lg:flex-nowrap lg:justify-between">
        <Card title="AQI" value={data.aqi} unit="" />
        <Card title="Temperature" value={data.temperature} unit="&deg;C" />
        <Card title="Humidity" value={data.humidity} unit="%" />
        <Card title="PM10" value={data.pm10} unit="&mu;g/m^3" />
      </div>
    </div>
  );
};

export default CardGroup;
