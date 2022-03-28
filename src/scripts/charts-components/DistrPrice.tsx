import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { Line } from "react-chartjs-2";
import Translate, { translate } from "@docusaurus/Translate";
import { officialData as od } from "../../data/data";
import { flatsData } from "../../data/data";
import { digestLatestDate2021ISO } from "../dateVariables";
import { chartSettings } from "../chartSettings";
import {
  theDayBefore as tdb,
  arrayOfDates as arrD,
  toLabelDateMD as lblDateMD,
  toLabelDateDM as lblDateDM,
} from "../utils";

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


// { FLATS DATA
//   "location": "Bemowo",
//   "area_category": "20_30",
//   "month_num": "2021-01",
//   "avg_price_per_m": 11601,
//   "num_flats": 2,
//   "month": "January2021"
// },

// COVID DATA
// "casesCumul": 74390,
// "deathsCumul": 8911,
// "hospi": 29722,
// "hospiNew": 2754,
// "icu": 7072,
// "icuNew": 478,
// "returnHomeCumul": 17250,
// "deathsHospiCumul": 6494,
// "deathsEhpadEmsCumul": 2417,
// "incidR": 47.5354007815524,
// "icuOccupR": 137.4

export const flats = flatsData;

interface FlatStats {
  location: string,
  area_category: string,
  month_num: string,
  avg_price_per_m: number,
  num_flats: number,
  month: string
}


const maxDur: number = 480;
const datesInMaxDur: string[] = arrD(digestLatestDate2021ISO, maxDur);
const dataInMaxDur = {
  cumul: datesInMaxDur.map((d) => od[d]?.casesCumul),
  new: datesInMaxDur.map((d) => od[d]?.casesCumul - od[tdb(d)]?.casesCumul),
};

console.log(flats)

// const dataInMaxDur = {
//   cumul: flats.avg_price_per_m,
//   new: flats.num_flats,
// };

const allDur = [15, 90, 180, 270, 360, 480]; // last one = maxDur
const marks = allDur.map((x) => {
  return { value: x, label: x };
});

const Cases = ({ flatArea, district}) => {
  const duration = 15
  const dateFmt = "d/m"

  const dates: string[] = datesInMaxDur.slice(maxDur - duration);

  // data
  const dataCasesCumul = dataInMaxDur.cumul.slice(maxDur - duration);
  const dataCasesNew = dataInMaxDur.new.slice(maxDur - duration);
  const data = {
    labels: dateFmt == "d/m" ? dates.map(lblDateDM) : dates.map(lblDateMD),
    datasets: [
      {
        ...chartSettings.lineStyle.blue,
        label: translate({
          id: "chartsComp.Cases.label.total",
          message: "Cumulative",
        }),
        data: dataCasesCumul,
        fill: false,
        yAxisID: "y-axis-cumul",
      },
      {
        ...chartSettings.barStyle.red,
        type: "bar",
        label: translate({
          id: "chartsCompo.Cases.label.new",
          message: "New",
        }),
        data: dataCasesNew,
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
            ...chartSettings.scales.yAxes.ticksStyle.red,
            min: 0, // because new cases could absurdly be negative...
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
  const [district, setDistrict] = React.useState('Ochota');

  const handleChange = (event) => {
    setFlatArea(event.target.value);
  };

  const chooseDistrict = (event) => {
    setDistrict(event.target.value)
  }

  return (
    <>
      <div className="chart-title">
        <Translate
          id="chartsComp.PriceDistrictMonth.title"
          description="Historical prices for a flat of size: <flatArea>"
          values={{ flatArea: flatArea, district: district }}
        >
          {"Historical prices for {flatArea} m2 flats in {district}"}
        </Translate>
      </div>
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
