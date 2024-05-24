"use client";
import "chart.js/auto";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

const data = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Temperature",
      data: [12, 25, 36, 37, 36],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
    {
      label: "Humidity",
      data: [20, 70, 80, 90, 52],
      fill: false,
      borderColor: "rgb(75, 25, 192)",
      tension: 0.1,
    },
    {
      label: "PM10",
      data: [10, 20, 60, 45, 52],
      fill: false,
      borderColor: "rgb(185, 25, 192)",
      tension: 0.1,
    },
  ],
};

const LineChart = () => {
  // const [data, setData] = useState({
  //   temperature: [],
  //   humidity: [],
  //   pm10: [],
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/graph");
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <Line data={data} />
    </div>
  );
};
export default LineChart;
