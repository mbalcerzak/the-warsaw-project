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
import { digestLatestDate2021ISO } from "../dateVariables";
import { chartSettings } from "../chartSettings";
import {
  theDayBefore as tdb,
  arrayOfDates as arrD,
  toLabelDateMD as lblDateMD,
  toLabelDateDM as lblDateDM,
} from "../utils";

const maxDur: number = 480;
const datesInMaxDur: string[] = arrD(digestLatestDate2021ISO, maxDur);
const dataInMaxDur = {
  cumul: datesInMaxDur.map((d) => od[d]?.casesCumul),
  new: datesInMaxDur.map((d) => od[d]?.casesCumul - od[tdb(d)]?.casesCumul),
};

const allDur = [15, 90, 180, 270, 360, 480]; // last one = maxDur
const marks = allDur.map((x) => {
  return { value: x, label: x };
});





const Cases = ({ duration, dateFmt }) => {
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
  const defaultValue = allDur[0];
  const [duration, setDuration] = useState(defaultValue);

  return (
    <>
      <div className="chart-title">
        <Translate
          id="chartsComp.PriceDistrictMonth.title"
          description="Trend over the last <duration> days"
          values={{ duration: duration }}
        >
          {"Flat size in square metres: {duration} "}
        </Translate>
      </div>
      {/* <Slider
        defaultValue={defaultValue}
        aria-labelledby="discrete-slider-restrict"
        valueLabelDisplay="off"
        step={15}
        marks={marks}
        max={maxDur}
        min={allDur[0]}
        onChange={(e, v) => {
          if (typeof v == "number") setDuration(v);
        }}
      /> */}
        <FormControl variant="filled">
          <InputLabel htmlFor="filled-age-simple">Age</InputLabel>
          <Select
            value={defaultValue}
            onChange={(e, v) => {
              if (typeof v == "number") setDuration(v);
            }}
            input={<FilledInput name="age" id="filled-age-simple" />}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      <Cases duration={duration} dateFmt={dateFmt} />
    </>
  );
};
