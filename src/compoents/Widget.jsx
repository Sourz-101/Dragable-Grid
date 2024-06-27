import React from "react";

const Widget = () => {
  return (
    <div className="rounded-2xl p-4 border-2 flex shadow-2xl">
      <div className="w-full max-w-48">
        <h1 className="text-gray-700 text-lg whitespace-nowrap font-hind font-semibold">
          Motor Status
        </h1>
        <div className="flex justify-between items-center">
          <p className="text-green-700 font-semibold text-4xl flex-1 mt-3">
            ON
          </p>
          <div className="h-16 w-16 rounded-full bg-green-700 border-[3px] border-green3 place-self-end"></div>
        </div>
      </div>
    </div>
  );
};

export default Widget;