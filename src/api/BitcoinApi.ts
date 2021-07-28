import axios from "axios";
import _ from "lodash";

export interface BitcoinPriceData {
  date: string;
  isPrime: boolean;
  value: number;
}

const isPrimeNumber = (value: number) => {
  let isPrime = true;
  for (let i = 2; i <= Math.sqrt(value); i++) {
    if (Math.floor(value) % i === 0) {
      isPrime = false;
      break;
    }
  }
  return isPrime && value > 1;
};

export const fetchBitcoinPrice = async (startDate: string, endDate: string) => {
  try {
    const result = await axios.get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
    );
    const bitCoinValues = _.get(result, "data.bpi", []);
    return Object.keys(bitCoinValues).map((key) => {
      // round off the value to two decimal places
      const roundedValue = Math.round(bitCoinValues[key] * 100) / 100;
      // check if the value is a prime number
      const isPrime = isPrimeNumber(roundedValue);
      const bitCoinValue = isPrime ? Math.floor(roundedValue) : roundedValue;

      const record: BitcoinPriceData = {
        date: key,
        value: bitCoinValue,
        isPrime,
      };
      return record;
    });
  } catch (error) {
    throw error;
  }
};
