"use client";

import {useState} from "react";
import Chart from "react-apexcharts";

function ChartPage() {
   // `GET	/posts/1/comments`
   // Сторінка з графіком для відображення кількості коментарів для кожної статті.

   const [chartData, setChartData] = useState({
      options: {
         chart: {
            id: "basic-bar"
         },
         xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
         }
      },
      series: [
         {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
         }
      ]
   });

   return (
      <div className="app">
         <div className="row">
            <div className="mixed-chart">
               <Chart
                  options={chartData.options}
                  series={chartData.series}
                  type="bar"
                  width="500"
               />
            </div>
         </div>
      </div>
   );
};

export default ChartPage;




