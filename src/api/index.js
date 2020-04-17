import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country) {
        changeableUrl = `${url}/countries/${country}`;
    }

    try {
        const response = await axios.get(changeableUrl);
        const data = response.data;
        const modifiedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate
        }

        return modifiedData;
    } catch (e) {
        console.log(e);
    }
}

export const fetchDailyData = async () => {
    try {
        const response = await axios.get(`${url}/daily`);
        const data = response.data;
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }));
        return modifiedData;
    } catch(e) {
        console.log(e);
    }
}

export const fetchCountries = async () => {
    try {  
        const response = await axios.get(`${url}/countries`);
        const data = response.data;

        return data.countries.map((country) => country.name);

    } catch(e) {
        console.log(e);
    }
}