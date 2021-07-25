import { useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';


function DatePicker(props) {

    useEffect(() => {

        minimumDate()
        maximumDate()
        
        return () => {
           // cleanup
        }
    }, [props.startDate,props.enDate])

    function minimumDate() {
        //get startdate from six months ago
        const monthPeriod = 6;
        return props.isEndDate ? moment(props.startDate) : moment().add(-monthPeriod, 'M');
    }

    function maximumDate() {
        //initialise maximum date to the current date using moment
         return moment();
    }
    return (
     
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    id={props.id}
                    label={props.label}
                    value={props.value}
                    className="Dates-container"
                    minDate={minimumDate()}
                    maxDate={maximumDate()}
                    onChange={(value) => props.onDateChange(value)} />
            </MuiPickersUtilsProvider>
      
    )
}

export default DatePicker



