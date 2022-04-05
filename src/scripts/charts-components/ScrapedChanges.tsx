import React, { useCallback, useEffect, useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Line } from "react-chartjs-2";
import { translate } from "@docusaurus/Translate";
import { chartSettings } from "../chartSettings";
import axios from "axios";
import { districts, flat_areas } from "../../data/data";


const Scraped = ({ flatArea, district}) => {
  //to jest taki maly trick zeby wyciagnac tylko pojedyncze miesiace z calego zbioru z danych
  // wiecej do poczytania tutaj https://yagisanatode.com/2021/07/03/get-a-unique-list-of-objects-in-an-array-of-object-in-javascript/
  
  //tutaj nam staty potrzebne zeby dynamicznie zmieniac dane na wykresie
  const [averagePrices, setAveragePrices] = useState([]);
  const [flatsData, setFlatsData] = useState([]);
  const [numFlats, setNumFlats] = useState([]);
  const [months, setMonths] = useState([]);
  const [dates, setDates] = useState([]);
  

  const fetchData = useCallback(async () => {
    const res = await axios.get('https://raw.githubusercontent.com/mbalcerzak/warsaw_flats_api/raspberry-updates/json_dir/flats.json');
    setFlatsData(res.data.price_m_loc_area_cat.map(t=>t));
    setMonths([...new Map(res.data.price_m_loc_area_cat.map((item) => [item["month"], item.month])).values()]);
    setAveragePrices(res.data.price_m_loc_area_cat.filter(f => f.location === district && f.area_category === flatArea).map(f => f.avg_price_per_m));
    setNumFlats(res.data.price_m_loc_area_cat.filter(f => f.location === district && f.area_category === flatArea).map(f => f.num_flats));

    const res2 = await axios.get('https://raw.githubusercontent.com/mbalcerzak/warsaw_flats_api/raspberry-updates/json_dir/flats.json');
    const dates = res2.data.scraped_per_day;
  }, [])

  
  // useEffect odpala sie za kazdym razem jak wartosci podane jako drugi argument sie zmienia
  useEffect(() => {
    // tutaj filtrujemy po flatArea i district i uzywane set state zeby wlasnie react wykryl ze dane sie zmienily i przerysowal wykres :)
    setAveragePrices(flatsData.filter(f => f.location === district && f.area_category === flatArea).map(f => f.avg_price_per_m))
    setNumFlats(flatsData.filter(f => f.location === district && f.area_category === flatArea).map(f => f.num_flats))
  },[flatArea,district])// << te wartosci tutaj. czyli jak nasze dropdowny sie zmienia :)
  

  useEffect( () => {
    fetchData().catch(e=>console.log(e)) 
  },[])

  const data = {
    labels: dates,//tutaj podaje te daty unikalne
    datasets: [
      {
        ...chartSettings.lineStyle.blue,
        label: "Average price",
        data: averagePrices,//tutaj ceny
        fill: false,
        yAxisID: "y-axis-cumul",
      },
      {
        ...chartSettings.barStyle.red,
        type: "bar",
        label: "Ads posted",
        data: numFlats,//tutaj ilosci
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
          ticks: chartSettings.scales.yAxes.ticksStyle.blue,
        },
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

export const AdsScraped = () => {
  const dateFmt = translate({ id: "dateFmt", message: "m/d" });
  const [flatArea, setFlatArea] = React.useState('40_50');
  const [district, setDistrict] = React.useState('Mokotów');

  return (
    <>
      <Scraped />
    </>
  );
};
