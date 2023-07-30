import React, { useCallback, useEffect, useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Line } from "react-chartjs-2";
import { chartSettings } from "../chartSettings";
import axios from "axios";
import { districts, flat_areas } from "../../data/data";


const Cases = ({ flatArea, district}) => {
  //to jest taki maly trick zeby wyciagnac tylko pojedyncze miesiace z calego zbioru z danych
  // wiecej do poczytania tutaj https://yagisanatode.com/2021/07/03/get-a-unique-list-of-objects-in-an-array-of-object-in-javascript/
  
  //tutaj nam staty potrzebne zeby dynamicznie zmieniac dane na wykresie
  const [averagePricesDistrCat, setAveragePricesCat] = useState([]);
  const [averagePricesDistr, setAveragePricesDistr] = useState([]);
  const [flatsData, setFlatsData] = useState([]);
  const [numFlats, setNumFlats] = useState([]);
  const [months, setMonths] = useState([]);

  const fetchData = useCallback(async () => {
    const res = await axios.get('https://raw.githubusercontent.com/mbalcerzak/idealista-mongo/mabdata-json/output/flats_mabdata.json');
    setFlatsData(res.data.price_m_loc_area_cat.map(t=>t));
    setMonths(Array.from(new Set(res.data.price_m_loc_area_cat.map((item) => item.month))));
    setAveragePricesCat(res.data.price_m_loc_area_cat.filter(f => f.location === district && f.area_category === flatArea).map(f => f.avg_price_per_m));
    setAveragePricesDistr(res.data.price_m_location.filter(f => f.location === district).map(f => f.avg_price_per_m));
    setNumFlats(res.data.price_m_loc_area_cat.filter(f => f.location === district && f.area_category === flatArea).map(f => f.num_flats));
  }, [])

  
  // useEffect odpala sie za kazdym razem jak wartosci podane jako drugi argument sie zmienia
  useEffect(() => {
    // tutaj filtrujemy po flatArea i district i uzywane set state zeby wlasnie react wykryl ze dane sie zmienily i przerysowal wykres :)
    setAveragePricesCat(flatsData.filter(f => f.location === district && f.area_category === flatArea).map(f => f.avg_price_per_m));
    setAveragePricesDistr(flatsData.filter(f => f.location === district).map(f => f.avg_price_per_m));
    setNumFlats(flatsData.filter(f => f.location === district && f.area_category === flatArea).map(f => f.num_flats));
  },[flatArea,district])// << te wartosci tutaj. czyli jak nasze dropdowny sie zmienia :)


  useEffect( () => {
    fetchData().catch(e=>console.log(e))
  },[])

  const data = {
    labels: months,//tutaj podaje te months unikalne
    datasets: [
      {
        ...chartSettings.lineStyle.blue,
        label: "Average price (district/size)",
        data: averagePricesDistrCat,
        fill: false,
        yAxisID: "y-axis-cumul",
      },
      {
        ...chartSettings.lineStyle.orange,
        label: "Average price (district)",
        data: averagePricesDistr,
        fill: false,
        yAxisID: "y-axis-cumul-distr",
      },
      {
        ...chartSettings.barStyle.red,
        type: "bar",
        label:  "Ads posted",
        data: numFlats,//tutaj ilosci
        yAxisID: "y-axis-var",
      },
    ],
  };

  const max_value = Math.max(...averagePricesDistr);
  const max_yaxis = Math.round(max_value * 1.1 / 1000) * 1000;

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
            max: max_yaxis,
            min: 0
          }
        },
        {
          id: "y-axis-cumul-distr",
          position: "right",
          display: false,
          gridLines: chartSettings.scales.yAxes.gridLinesStyle.hidden,
          ticks: {
            ...chartSettings.scales.yAxes.ticksStyle.blue,
            max: max_yaxis,
            min: 0
          }
        },
        {
          id: "y-axis-var",
          position: "left",
          gridLines: chartSettings.scales.yAxes.gridLinesStyle.hidden,
          ticks: {
            ...chartSettings.scales.yAxes.ticksStyle.red,
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

export const PriceDistrictMonth = () => {
  const [flatArea, setFlatArea] = React.useState('3');
  const [district, setDistrict] = React.useState('Russafa');

  const handleChange = (event) => {
    setFlatArea(event.target.value);
  };

  const chooseDistrict = (event) => {
    setDistrict(event.target.value)
  }

  return (
    <>
      {/* <div className="chart-title">
        <Translate
          id="chartsComp.PriceDistrictMonth.title"
          description="Historical prices for a flat of size: <flatArea>"
          values={{ flatArea: flatArea, district: district }}
        >
          {"Historical prices for {flatArea} m2 flats in {district}"}
        </Translate>
      </div> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Size of the apartment</InputLabel>
          <Select
            variant="filled"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            value={flatArea}
          >
          {flat_areas.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="input-label-districr">District</InputLabel>
          <Select
            variant="filled"
            labelId="districts"
            id="districts"
            onChange={chooseDistrict}
            value={district}
          >
          {districts.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
      <Cases flatArea={flatArea} district={district}/>
    </>
  );
};
