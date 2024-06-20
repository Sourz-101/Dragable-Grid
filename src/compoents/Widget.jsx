import React from "react";

const Widget = () => {
  return (
    <div className="rounded-2xl p-4 mb-10 border-2 shadow-lg flex">
      <div className="w-full">
        <h1 className="text-gray-700 text-lg whitespace-nowrap font-hind font-semibold">
          Motor Status
        </h1>
        <p className="text-green-700 font-semibold text-4xl flex-1 mt-3 z-10">ON</p>
      </div>

      <div className="flex justify-center items-center -z-10">
        <div className="h-16 w-16 rounded-full bg-green-500 border-[3px] border-green3"></div>
      </div>
    </div>
  );
};

export default Widget;
