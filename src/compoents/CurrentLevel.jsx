import React from "react";
import { FaSortDown } from "react-icons/fa6";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";



const CurrentLevel = () => {
  return (
    <div className="h-32 rounded-2xl p-4 border-2 shadow-lg flex bg-slate-100">
      <div className="w-full">
        <h1 className="text-gray7 text-lg whitespace-nowrap font-hind font-semibold">
          Current Level
        </h1>
        <div className="flex-col text-white text-lg justify-startf">
          <p className="text-red-600 font-semibold flex flex-nowrap">
            <FaSortDown /> 30%
          </p>
          <p className="text-gray-700">vs last week</p>
        </div>
      </div>

      <div className="flex items-center justify-center overflow-hidden">
        <Gauge
          sx={(theme) => ({
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 35,
            },
          })}
          cornerRadius="50%"
          width={160}
          height={160}
          value={75}
          startAngle={-115}
          endAngle={115}
        />
      </div>
    </div>
  );
};

export default CurrentLevel;
