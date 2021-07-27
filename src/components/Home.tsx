import { useEffect, useState, useCallback ,FC } from 'react'
import Button from '@material-ui/core/Button';
import DatePicker from './DatePicker';
import { Card } from '@material-ui/core';
import Header from './Header';
import moment from 'moment';
import BitcoinPriceList from './BitcoinPriceList';
import { fetchBitcoinPrice } from '../api/BitcoinApi';



const Home : FC = () => {

    const dateFormt = 'YYYY-MM-DD';
    const [monthPeriod] = useState(6)
    const [startDate, setStartDate] = useState(moment().add(-monthPeriod, 'M').format(dateFormt));
    const [endDate, setEndDate] = useState(moment().format(dateFormt));
    const [bitcoinPriceData, setBitcoinPriceData] = useState([{date: "", value: 0, isPrime: false}])


    const getDailyBitcoinPrice = () => {



        fetchBitcoinPrice(startDate, endDate).then(res => {
           
            const bitCoinValues = res.data.bpi;

            const BitcoinPrice = Object.keys(bitCoinValues).map(key => {
                // round off the value to two decimal places
                const roundedValue = Math.round(bitCoinValues[key] * 100) / 100;
                // check if the value is a prime number
                const isPrime = isPrimeNumber(roundedValue);
                const bitCoinValue = isPrime ? Math.floor(roundedValue) : roundedValue;

                return { date: key, value: bitCoinValue, isPrime };
            });
            if (BitcoinPrice != null) {
                setBitcoinPriceData(BitcoinPrice)
            }
        })
    }
    const loadDefaults = () => {
        getDailyBitcoinPrice()
    }
   
    useEffect(() => {
        loadDefaults()

        return () => {

        }
        
    }, [])

 

    const isPrimeNumber = (value : number) => {
        let isPrime = true;
        for (let i = 2; i <= Math.sqrt(value); i++) {
            if (Math.floor(value) % i === 0) {
                isPrime = false;
                break;
            }
        }
        return isPrime && (value > 1);
    }


    const onDateChanged = useCallback((value, type) => {

     

     
        if (type === 'Start')
            setStartDate(moment(value).format(dateFormt));
        else
            setEndDate(moment(value).format(dateFormt));

    }, [])

    function getBitcoinList(event : React.MouseEvent<HTMLButtonElement>) {


        if(startDate <= endDate)
        getDailyBitcoinPrice();
        else

            
         console.log("Pop Up for error handling");
    }

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
                        <Button onClick={getBitcoinList.bind(this)} id="btnFilterDates" className="Btn-filter">Update Price</Button>
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
