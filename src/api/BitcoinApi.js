import axios from 'axios'

export const fetchBitcoinPrice = (startDate,endDate) => {
    return axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`);
}

