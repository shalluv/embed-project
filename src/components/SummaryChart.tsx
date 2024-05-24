"use client";
import "chart.js/auto";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

const LineChart = () => {
  const [labels, setLabels] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [pm10, setPm10] = useState([]);
  const [earliestDate, setEarliestDate] = useState(new Date());
  const [latestDate, setLatestDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/graph");
        const data = await res.json();
        setLabels(
          data.labels.map((label: any) =>
            new Date(label).toLocaleTimeString("th-th", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
          )
        );
        setTemperature(data.temperature);
        setHumidity(data.humidity);
        setPm10(data.pm10);
        setEarliestDate(new Date(data.labels[0]));
        setLatestDate(new Date(data.labels[data.labels.length - 1]));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="no-scrollbar w-full gap-8 overflow-scroll">
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl">
        กราฟข้อมูลเมื่อวันที่{" "}
        {earliestDate.toLocaleDateString("th-th", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        })}{" "}
        {earliestDate.getDate() !== latestDate.getDate() &&
          "ถึง " +
            latestDate.toLocaleDateString("th-th", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            })}
      </h1>
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: "Temperature",
              data: temperature,
              fill: false,
              borderColor: "#fb923c",
              tension: 0.1,
            },
            {
              label: "Humidity",
              data: humidity,
              fill: false,
              borderColor: "#0ea5e9",
              tension: 0.1,
            },
            {
              label: "PM10",
              data: pm10,
              fill: false,
              borderColor: "#a3a3a3",
              tension: 0.1,
            },
          ],
        }}
      />
    </div>
  );
};
export default LineChart;
