import React, { useCallback, useEffect, useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Line } from "react-chartjs-2";
import { chartSettings } from "../chartSettings";
import axios from "axios";
// import { flat_ids, flat_price_hist } from "../../data/data";


const Cases = ({ flatID }) => {
  const [flatID_list, setFlatIDs] = useState([])
  const [priceHistData, setPriceHistData] = useState([]);
  const [prices, setPrices] = useState([]);
  const [dates, setDates] = useState([]);

  const fetchData = useCallback(async () => {
    const res = await axios.get('https://raw.githubusercontent.com/mbalcerzak/idealista-mongo/mabdata-json/output/most_price_changes.json');
    setPriceHistData(res.data.map(t=>t));
    setFlatIDs(res.data.map(f=>f.propertyCode))
  }, [])

  console.log(priceHistData)
  console.log(flatID)
  console.log(flatID_list)

  useEffect(() => {
    setPrices(priceHistData.filter(f => f.propertyCode === flatID).map(f => f.prices));
    setDates(priceHistData.filter(f => f.propertyCode === flatID).map(t => t.dates));
  },[flatID])

  console.log(prices[0])
  console.log(dates[0])

  useEffect( () => {
    fetchData().catch(e=>console.log(e))
  },[])

  const data = {
    labels: dates[0],//tutaj podaje te months unikalne
    datasets: [
      {
        ...chartSettings.lineStyle.blue,
        label: "Average price (district/size)",
        data: prices[0],
        fill: false
      }
    ],
  };

  return <Line data={data} />;
};

// --------
// EXPORTS
// --------

export const FlatPriceGraph = () => {
  const [flatID, setFlatID] = React.useState([]);
  const [flatID_list, setFlatID_list] = useState([])


  useEffect(() => {
    const url = 'https://raw.githubusercontent.com/mbalcerzak/idealista-mongo/mabdata-json/output/most_price_changes.json';
    axios.get(url).then(response => {
      setFlatID_list(response.data.map(f=>f.propertyCode));
    });
  },[])

  const handleChange = (event) => {
    setFlatID(event.target.value);
  };

  return (
    <>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">ID of the apartment</InputLabel>
          <Select
            variant="filled"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            value={flatID}
          >
          {flatID_list.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
      <Cases flatID={flatID}/>
    </>
  );
};
