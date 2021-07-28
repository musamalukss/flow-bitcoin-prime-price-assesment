import { useEffect, useState, useCallback, FC } from 'react'

import DatePicker from './DatePicker';
import { Card } from '@material-ui/core';
import Header from './Header';
import moment from 'moment';
import BitcoinPriceList from './BitcoinPriceList';
import { BitcoinPriceData, fetchBitcoinPrice } from "../api/BitcoinApi";
import _ from "lodash";



/**
 * Home component parent component to Header Component, DatePicker Component and the BitcoinPriceList component
 * todo: look at useEffect as it has missing dependancy
 * @returns rendered view of the above mentioned components
 */


const Home: FC = () => {

    const dateFormt = 'YYYY-MM-DD';
    const [monthPeriod] = useState(6)
    const [startDate, setStartDate] = useState(moment().add(-monthPeriod, 'M').format(dateFormt));
    const [endDate, setEndDate] = useState(moment().format(dateFormt));
    const [bitcoinPriceData, setBitcoinPriceData] = useState<BitcoinPriceData[]>(
        []
    )

    const deriveBitcoinPriceData = (data: any) => {
        if (!_.isEmpty(data) && _.isArray(data)) {
            setBitcoinPriceData(data);

            if (_.isEmpty(data)) {
                alert("No results for the given criteria");
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchBitcoinPrice(startDate, endDate);
                deriveBitcoinPriceData(data);
            } catch (error) {
                alert(error);
            }
        };
        fetchData();
    }, [endDate, startDate]);

  
    const onDateChanged = useCallback((value, type) => {
        if (type === 'Start')
            setStartDate(moment(value).format(dateFormt));
        else
            setEndDate(moment(value).format(dateFormt));
    }, [])


    return (

        <div className="home" >
            <Header />
            <Card className="Bitcoin-results-card">
                <div className="row">
                    <div className="col-md-12">
                        <div className="rowDatePicker">
                            <div className="col-md-12" >
                                <DatePicker label="Start Date" value={startDate} onDateChange={(value) => onDateChanged(value, 'Start')} id="dtpStartDate" />
                            </div>
                        </div>
                        <div className="rowDatePicker">
                            <div className="col-md-6">
                                <DatePicker label="End Date" startDate={startDate} value={endDate} isEndDate={true} onDateChange={(value) => onDateChanged(value, 'end')} id="dtpEndDate" />
                            </div>
                        </div>
                       

                        <div className="rowDatePicker">
                            <h6>Disclaimer : Today's Bitcoin price will only be available once the market has closed for the day.</h6>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <BitcoinPriceList bitcoinList={bitcoinPriceData} />
                    </div>
                </div>
            </Card>



        </div>
    )
}

export default Home
