import React, { useCallback, useEffect, useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Line } from "react-chartjs-2";
import { chartSettings } from "../chartSettings";
import axios from "axios";


const AdLink = ({ flatID }) => {
    if (flatID.length > 0) {
      return <a href={"http://idealista.com/inmueble/"+flatID}> Link to idealista </a>;
    }
    else {
      return <a></a>;
    }
}

const FlatInfo = ({ flatID }) => {
  // const [flatID_list, setFlatIDs] = useState([])
  const [flatInfo, setFlatInfo] = useState([])
  const [image, setImage] = useState([])
  const [flatType, setType] = useState([])
  const [floor, setFloor] = useState([])
  const [lift, setLift] = useState([])
  const [size, setSize] = useState([])
  const [rooms, setRooms] = useState([])
  const [bathrooms, setBathRooms] = useState([])
  const [Address, setAddress] = useState([])
  const [Data, setData] = useState([])

  const fetchData = useCallback(async () => {
    const res = await axios.get('https://raw.githubusercontent.com/mbalcerzak/idealista-mongo/mabdata-json/output/flat_info.json');
    setFlatInfo(res.data.map(t=>t))
  }, [])

  useEffect( () => {
    fetchData().catch(e=>console.log(e))
  },[])

  console.log("Check FlatInfo ID: " + flatID)
  console.log("INFO " + flatInfo)
  console.log("Address: " + Address)
  console.log("Image " + image)

  useEffect(() => { 
    setImage(flatInfo.filter(f => f.propertyCode === flatID).map(f => f.thumbnail));
    setType(flatInfo.filter(f => f.propertyCode === flatID).map(f => f.propertyType));
    setFloor(flatInfo.filter(f => f.propertyCode === flatID).map(f => f.floor));
    setLift(flatInfo.filter(f => f.propertyCode === flatID).map(f => f.lift));
    setSize(flatInfo.filter(f => f.propertyCode === flatID).map(f => f.size));
    setRooms(flatInfo.filter(f => f.propertyCode === flatID).map(f => f.rooms));
    setBathRooms(flatInfo.filter(f => f.propertyCode === flatID).map(f => f.bathrooms));
    setAddress(flatInfo.filter(f => f.propertyCode === flatID).map(f=>f.address));
  },[flatID])


  if (flatID.length > 0) {
    return [
      <h3> {flatType} in {Address} </h3>,
      <ul> 
        <li>{size} m2</li>
        <li>{rooms} rooms</li>
        <li>{bathrooms} bathrooms</li>
        <li>{floor} floor</li> 
      </ul>];
  }
  else {
    return <a></a>;
  }

  // return <img src={image.toString()} alt="My image"> </img>;
}


const Cases = ({ flatID }) => {
  const [flatID_list, setFlatIDs] = useState([])
  const [priceHistData, setPriceHistData] = useState([]);
  const [prices, setPrices] = useState([]);
  const [dates, setDates] = useState([]);

  const fetchData = useCallback(async () => {
    const res = await axios.get('https://raw.githubusercontent.com/mbalcerzak/idealista-mongo/mabdata-json/output/latest_price_changes.json');
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
        label: "Price in EUR",
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
    const url = 'https://raw.githubusercontent.com/mbalcerzak/idealista-mongo/mabdata-json/output/ad_titles.json';
    axios.get(url).then(response => {
      setFlatID_list(response.data.map(f=>f));
    });
  },[])

  const handleChange = (event) => {
    setFlatID(event.target.value);
  };

  return (
    <>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Choose the apartment</InputLabel>
          <Select
            variant="filled"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            value={flatID}

          >
          {flatID_list.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
      <Cases flatID={flatID}/>
      <br></br>
      <FlatInfo flatID={flatID}/>
      <AdLink flatID={flatID}/>
    </>
  );
};
