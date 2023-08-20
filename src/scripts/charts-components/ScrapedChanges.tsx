import React, { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { chartSettings } from "../chartSettings";
import axios from "axios";


const Scraped = () => {
  const [dates, setDates] = useState([]);
  const [scraped, setScraped] = useState([]);
  const [scrapedAvg, setScrapedAvg] = useState([]);
  
  const fetchData = useCallback(async () => {
    const res = await axios.get('https://raw.githubusercontent.com/mbalcerzak/idealista-mongo/mabdata-json/output/flats_mabdata.json');
    setDates(Object.keys(res.data.scraped_per_day));
    setScraped(Object.values(res.data.scraped_per_day));
    setScrapedAvg(Object.values(res.data.scraped_per_day_m_avg));
  }, [])

  useEffect( () => {
    fetchData().catch(e=>console.log(e)) 
  },[])

  const data = {
    labels: dates,
    datasets: [
      {
        ...chartSettings.lineStyle.orange,
        label: "Scraped (Moving Average, 5 days)",
        data: scrapedAvg,
        fill: false,
        yAxisID: "y-axis-cumul",
      },
      {
        ...chartSettings.barStyle.red,
        type: "bar",
        label: "Scraped",
        data: scraped,
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
          id: "y-axis-cumul",
          position: "right",
          gridLines: chartSettings.scales.yAxes.gridLinesStyle.visible,
          ticks: {
            ...chartSettings.scales.yAxes.ticksStyle.blue,
            max: 8000
          }
        },
        {
          id: "y-axis-var",
          position: "left",
          gridLines: chartSettings.scales.yAxes.gridLinesStyle.hidden,
          ticks: {
            ...chartSettings.scales.yAxes.ticksStyle.red,
            max: 8000
          }
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
};

// --------
// EXPORTS
// --------

export const AdsScraped = () => {
  return (
    <>
      <Scraped />
    </>
  );
};
