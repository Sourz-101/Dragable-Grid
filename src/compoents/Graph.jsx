import * as React from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import Stack from "@mui/material/Stack";

const worldElectricityProduction = [
  {
    country: "World",
    year: 1985,
    Temperature: 1110.7847,
    Humidity: 1426.3086,
  },
  {
    country: "World",
    year: 1986,
    Temperature: 1168.3097,
    Humidity: 1432.6683,
  },
  {
    country: "World",
    year: 1987,
    Temperature: 1783.1947,
    Humidity: 1516.4941,
  },
  {
    country: "World",
    year: 1988,
    Temperature: 4256.5684,
    Humidity: 1540.9414,
  },
  {
    country: "World",
    year: 1989,
    Temperature: 2150.2358,
    Humidity: 1728.5189,
  },
  {
    country: "World",
    year: 1990,
    Temperature: 1364.6844,
    Humidity: 1789.7031,
  },
  {
    country: "World",
    year: 1991,
    Temperature: 1349.9071,
    Humidity: 1815.2444,
  },
  {
    country: "World",
    year: 1992,
    Temperature: 1328.2163,
    Humidity: 1829.3868,
  },
  {
    country: "World",
    year: 1993,
    Temperature: 1266.6155,
    Humidity: 1863.8153,
  },
  {
    country: "World",
    year: 1994,
    Temperature: 1302.1187,
    Humidity: 1925.1002,
  },
  {
    country: "World",
    year: 1995,
    Temperature: 1259.9452,
    Humidity: 2036.3821,
  },
  {
    country: "World",
    year: 1996,
    Temperature: 1245.6957,
    Humidity: 2101.594,
  },
  {
    country: "World",
    year: 1997,
    Temperature: 1244.647,
    Humidity: 2271.0615,
  },
  {
    country: "World",
    year: 1998,
    Temperature: null,
    Humidity: 2408.5476,
  },
  {
    country: "World",
    year: 1999,
    Temperature: 1266.6599,
    Humidity: 2600.75,
  },
  {
    country: "World",
    year: 2000,
    Temperature: 1209.51,
    Humidity: 2681.11,
  },
  {
    country: "World",
    year: 2001,
    Temperature: 1197.6,
    Humidity: 2827.65,
  },
  {
    country: "World",
    year: 2002,
    Temperature: 1175.58,
    Humidity: 3033.78,
  },
  {
    country: "World",
    year: 2003,
    Temperature: 1198.2,
    Humidity: 3165.78,
  },
  {
    country: "World",
    year: 2004,
    Temperature: 1177.47,
    Humidity: 3408.19,
  },
  {
    country: "World",
    year: 2005,
    Temperature: 1186.13,
    Humidity: 3579.99,
  },
  {
    country: "World",
    year: 2006,
    Temperature: 2097.06,
    Humidity: 3792.38,
  },
  {
    country: "World",
    year: 2007,
    Temperature: 4119.39,
    Humidity: 4109.47,
  },
  {
    country: "World",
    year: 2008,
    Temperature: 6078.99,
    Humidity: 4210.51,
  },
  {
    country: "World",
    year: 2009,
    Temperature: 7005.12,
    Humidity: 4247.72,
  },
  {
    country: "World",
    year: 2010,
    Temperature: 6011.78,
    Humidity: 4701.27,
  },
  {
    country: "World",
    year: 2011,
    Temperature: 3103.87,
    Humidity: 4767.24,
  },
  {
    country: "World",
    year: 2012,
    Temperature: 2157.13,
    Humidity: 5042.66,
  },
  {
    country: "World",
    year: 2013,
    Temperature: 1518.61,
    Humidity: 4939.52,
  },
  {
    country: "World",
    year: 2014,
    Temperature: 1063.74,
    Humidity: 5096.07,
  },
  {
    country: "World",
    year: 2015,
    Temperature: 1068.09,
    Humidity: 5418.55,
  },
  {
    country: "World",
    year: 2016,
    Temperature: 1004.96,
    Humidity: 5669.08,
  },
  {
    country: "World",
    year: 2017,
    Temperature: 913.07,
    Humidity: 5791.83,
  },
  {
    country: "World",
    year: 2018,
    Temperature: 841.34,
    Humidity: 6015.24,
  },
  {
    country: "World",
    year: 2019,
    Temperature: 776.78,
    Humidity: 6176.34,
  },
  {
    country: "World",
    year: 2020,
    Temperature: 1041,
    Humidity: 6132.47,
  },
  {
    country: "World",
    year: 2021,
    Temperature: 1693.53,
    Humidity: 6326,
  },
  {
    country: "World",
    year: 2022,
    Temperature: 3884.98,
    Humidity: 6309.46,
  },
];

const keyToLabel = {
  Temperature: "Temp",
  Humidity: "Humid",
};

const colors = {
  Temperature: "rgb(25, 118, 210)",
  Humidity: "rgb(74, 222, 128)",
};

const set_id = {
  Temperature: "Temp",
  Humidity: "Hum",
};

const stackStrategy = {
  stack: "total",
  area: true,
  stackOffset: "0", // To stack 0 on top of others
};

const customize = {
  // height: 300,
  legend: { hidden: false },
  margin: { top: 5 },
  stackingOrder: "descending",
};

const Graph = () => {
  const [connectNulls, setConnectNulls] = React.useState(true);
  return (
    <Stack sx={{ width: {xs: "105%", lg: "102%"}, height: { xs: 400, md: "100%" }, my: 2 }}>
      <LineChart
        sx={{
          // [`& .${lineElementClasses.root}`]: {
          //   strokeDasharray: '10 5',
          //   strokeWidth: 4,
          // },
          "& .MuiAreaElement-series-Hum": {
            fill: "url('#myGradient2')",
            // fill: "rgba(74, 222, 128, 0)",
          },
          "& .MuiAreaElement-series-Temp": {
            fill: "url('#myGradient')",
            // fill: "rgba(25, 118, 210, 0.2)",
          },
        }}
        xAxis={[
          {
            dataKey: "year",
            valueFormatter: (value) => value.toString(),
            min: 1985,
            max: 2022,
          },
        ]}
        series /*
        {[
          { 
            id:"Temp",
            dataKey:Object.keys(keyToLabel)[0] ,
            stack: 'total',
            area: true,
            showMark: true,
          },
          {
            id:"Hum",
            dataKey: Object.keys(keyToLabel)[1],
            stack: 'total',
            area: true,
            showMark: true,
          },
        ]}
        */=// /*

        {Object.keys(keyToLabel).map((key) => ({
          id: set_id[key],
          dataKey: key,
          label: keyToLabel[key],
          color: colors[key],

          showMark: true,
          connectNulls,
          area: true,
          // stack: '0',
        }))}
        // */
        dataset={worldElectricityProduction}
        {...customize}
      >
        <defs>
          <linearGradient id="myGradient" gradientTransform="rotate(90)">
            <stop offset="5%" stopColor="rgba(25, 118, 210, 0.5)" />
            <stop offset="100%" stopColor="rgba(25, 118, 210, 0)" />
          </linearGradient>
          <linearGradient id="myGradient2" gradientTransform="rotate(90)">
            <stop offset="5%" stopColor="rgba(74, 222, 128, 0.5)" />
            <stop offset="100%" stopColor="rgba(74, 222, 128, 0)" />
          </linearGradient>
        </defs>
      </LineChart>
    </Stack>
  );
};
export default Graph;
