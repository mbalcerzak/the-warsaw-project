import React, { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { chartSettings } from "../chartSettings";
import axios from "axios";


const SizeCount = () => {
  const [size, setSize] = useState([]);
  const [sizeCount, setSizeCount] = useState([]);

  const fetchData = useCallback(async () => {
    const res = await axios.get('https://raw.githubusercontent.com/mbalcerzak/idealista-mongo/mabdata-json/output/flats_mabdata.json');
    setSize(Object.keys(res.data.flats_per_area_cat));
    setSizeCount(Object.values(res.data.flats_per_area_cat));
  }, [])

  useEffect( () => {
    fetchData().catch(e=>console.log(e)) 
  },[])

  console.log("size", size)
  console.log("sizeCount", sizeCount)

  const data = {
    labels: size,
    datasets: [
      {
        ...chartSettings.barStyle.red,
        type: "bar",
        label: "Flat count",
        data: sizeCount,
        yAxisID: "y-axis-var",
      },
    ],
  };
  const options = {
    legend: chartSettings.legend,
    tooltips: chartSettings.tooltips,
    scales: {
      xAxes: [{ ...chartSettings.scales.xAxes, offset: true }],
      yAxes: [
        {
          id: "y-axis-var",
          position: "left",
          gridLines: chartSettings.scales.yAxes.gridLinesStyle.hidden,
          ticks: {
            ...chartSettings.scales.yAxes.ticksStyle.red
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
};

// --------
// EXPORTS
// --------

export const SizeCountGraph = () => {
  return (
    <>
      <SizeCount />
    </>
  );
};
