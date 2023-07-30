import React, { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { chartSettings } from "../chartSettings";
import axios from "axios";


const LocationCount = () => {
  const [districts, setDistr] = useState([]);
  const [districtsCount, setDistrCount] = useState([]);

  const fetchData = useCallback(async () => {
    const res = await axios.get('https://raw.githubusercontent.com/mbalcerzak/idealista-mongo/mabdata-json/output/flats_mabdata.json');
    setDistr(Object.keys(res.data.flats_per_location));
    setDistrCount(Object.values(res.data.flats_per_location));
  }, [])

  useEffect( () => {
    fetchData().catch(e=>console.log(e)) 
  },[])

  console.log("districts", districts)
  console.log("districtsCount", districtsCount)

  const data = {
    labels: districts,
    datasets: [
      {
        ...chartSettings.barStyle.red,
        type: "bar",
        label: "Number of flats per district",
        data: districtsCount,
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

export const LocationCountGraph = () => {
  return (
    <>
      <LocationCount />
    </>
  );
};
