import { FC } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';



/**
 * Props recieved when this componenet is rendered
 */

interface Props {
    label: String,
    startDate?: string,
    isEndDate?: Boolean,
    endDate?: String,
    id: string,
    value: string | MaterialUiPickersDate | null,
    onDateChange: (value: Date | MaterialUiPickersDate | null) => void,
}


/**
 * Date picker component responsible for the date pickers that allows user to select date range to be used for to get bitcoin price
 * 
 * @param label 
 * @param id
 * @param isEndDate
 * @param startDate
 * @param value 
 * @param onDateChange
 * @returns  Datepickers displayed in the Home component
 */

const DatePicker: FC<Props> = ({ label, id,endDate, onDateChange, startDate, value }) => {

    const monthPeriod = 6;
    const minimumDate = startDate ? startDate : moment().add(-monthPeriod, "M");
    const maximumDate = endDate ? endDate : moment();
  
    return (

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                id={id}
                label={label}
                value={value}
                className="Dates-container"
                minDate={minimumDate}
                maxDate={maximumDate}
                onChange={(value) => onDateChange(value)} />
        </MuiPickersUtilsProvider>

    )
}

export default DatePicker



