import React, { useCallback, useEffect, useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Line } from "react-chartjs-2";
import { translate } from "@docusaurus/Translate";
import { chartSettings } from "../chartSettings";
import axios from "axios";

const flat_areas = [
  {
    value: '20_or_less',
    label: '20 metres or less',
  },
  {
    value: '20_30',
    label: '20 - 30 metres',
  },
  {
    value: '30_40',
    label: '30 - 40 metres',
  },
  {
    value: '40_50',
    label: '40 - 50 metres',
  },
  {
    value: '50_60',
    label: '50 - 60 metres',
  },
  {
    value: '60_70',
    label: '60 - 70 metres',
  },
  {
    value: '70_80',
    label: '70 - 80 metres',
  },
  {
    value: '80_or_more',
    label: 'more than 80 metres',
  },
];

const districts = [
  {value: 'Bemowo', label: 'Bemowo'},
  {value: 'Białołęka', label: 'Białołęka'},
  {value: 'Bielany', label: 'Bielany'},
  {value: 'Mokotów', label: 'Mokotów'},
  {value: 'Ochota', label: 'Ochota'},
  {value: 'Praga Południe', label: 'Praga Południe'},
  {value: 'Praga Północ', label: 'Praga Północ'},
  {value: 'Rembertów', label: 'Rembertów'},
  {value: 'Targówek', label: 'Targówek'},
  {value: 'Ursus', label: 'Ursus'},
  {value: 'Ursynów', label: 'Ursynów'},
  {value: 'Wawer', label: 'Wawer'},
  {value: 'Wesoła', label: 'Wesoła'},
  {value: 'Wilanów', label: 'Wilanów'},
  {value: 'Wola', label: 'Wola'},
  {value: 'Włochy', label: 'Włochy'},
  {value: 'Śródmieście', label: 'Śródmieście'},
  {value: 'Żoliborz', label: 'Żoliborz'},
]

const Cases = ({ flatArea, district}) => {
  //to jest taki maly trick zeby wyciagnac tylko pojedyncze miesiace z calego zbioru z danych
  // wiecej do poczytania tutaj https://yagisanatode.com/2021/07/03/get-a-unique-list-of-objects-in-an-array-of-object-in-javascript/
  
  //tutaj nam staty potrzebne zeby dynamicznie zmieniac dane na wykresie
  const [averagePrices, setAveragePrices] = useState([]);
  const [flatsData, setFlatsData] = useState([]);
  const [numFlats, setNumFlats] = useState([]);
  const [months, setMonths] = useState([]);
  

  const fetchData = useCallback(async () => {
    const res = await axios.get('https://raw.githubusercontent.com/mbalcerzak/warsaw_flats_api/raspberry-updates/json_dir/flats.json');
    setFlatsData(res.data.price_m_loc_area_cat.map(t=>t));
    setMonths([...new Map(res.data.price_m_loc_area_cat.map((item) => [item["month"], item.month])).values()])
    setAveragePrices(res.data.price_m_loc_area_cat.filter(f => f.location === district && f.area_category === flatArea).map(f => f.avg_price_per_m))
    setNumFlats(res.data.price_m_loc_area_cat.filter(f => f.location === district && f.area_category === flatArea).map(f => f.num_flats))
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
    labels: months,//tutaj podaje te months unikalne
    datasets: [
      {
        ...chartSettings.lineStyle.blue,
        label: translate({
          id: "chartsComp.Cases.label.total",
          message: "Average price",
        }),
        data: averagePrices,//tutaj ceny
        fill: false,
        yAxisID: "y-axis-cumul",
      },
      {
        ...chartSettings.barStyle.red,
        type: "bar",
        label: translate({
          id: "chartsCompo.Cases.label.new",
          message: "Ads posted",
        }),
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

export const PriceDistrictMonth = () => {
  const dateFmt = translate({ id: "dateFmt", message: "m/d" });
  const [flatArea, setFlatArea] = React.useState('40_50');
  const [district, setDistrict] = React.useState('Mokotów');

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
