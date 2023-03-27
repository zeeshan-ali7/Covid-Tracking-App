import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CovidData } from '../CovidData/CovidData';
import './CountryData.css'

export default function CountryData() {
  let [country, setCountry] = useState([])
  let [value, setValue] = useState()

  async function countarydata() {
    try {

      let resp = await axios.get("https://restcountries.com/v3.1/all")
      setCountry(resp.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    countarydata()
  }, []);

  const countryName = (e) => {
    let getCountryName = e.target.value
    setValue(getCountryName);
  }

  return (
    <>
      <div className='main-box' >

        <select onChange={countryName} className='select-tag'>
          <option value=''>Global</option>
          {
            country.map((country) => {
              return <option >{country.name.common}</option>
            })
          }
        </select>
        <CovidData value={value} />
      </div>

    </>
  );
}