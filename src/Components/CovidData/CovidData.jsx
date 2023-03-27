import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import './CovidData.css'
import Horizontalchart from '../Chart/Chart';

export const CovidData = (props) => {


    let [data, setData] = useState({
        'Total Cases_text':"0",
        'Total Recovered_text':'0',
        'Total Deaths_text':'0'
    });
    
    let countryName = props.value;
    console.log(countryName);

    let resp;
    const fetchCovidData = async () => {
        try {
            if (countryName) {
                resp = await axios.get('https://covid-19.dataflowkit.com/v1/' + countryName + '');

            }
            else {
                resp = await axios.get('https://covid-19.dataflowkit.com/v1/all');

            }

            setData(resp.data);
            console.log(resp.data);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetchCovidData()
    }, [countryName]);
   
    return (
        <>
                <div className="covid-19-box">
                    <h1>COVID-19</h1>
                    {data?<h3>{data['Country_text']}'s Data</h3>:<h3>No Data Available</h3>}
                </div>
            <Horizontalchart data={data} />
            <div className='stats-container'>
                <div className="shows-stats-parent">
                    <div className="shows-stats-childs">
                    <h3>Cases</h3>
                    {data?<p>{data['Total Cases_text']} </p>:<p>No Data Available</p>}
                    </div>
                    <div className="shows-stats-childs">
                    <h3>Deaths</h3>
                    {data?<p>{data["Total Deaths_text"]}</p>:<p>No Data Available</p>}
                    </div>
                    <div className="shows-stats-childs">
                    <h3>Recovered </h3>
                    {data?<p>{data['Total Recovered_text']}</p>:<p>No Data Available</p>}
                    </div>
                </div>
            </div>
        </>


    )
}
