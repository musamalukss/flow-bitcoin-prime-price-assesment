import { FC } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';


interface Props {
    label:String,
    startDate? :string,
    isEndDate? : Boolean,
    enDate? : String,
    id : string,
    value: string |MaterialUiPickersDate |null,
    onDateChange : (value :Date |MaterialUiPickersDate | null)=> void,
}




const DatePicker : FC<Props> = ({label,id,isEndDate,onDateChange,startDate,value}) => {

    

    function minimumDate() {
        //get startdate from six months ago
        const monthPeriod = 6;
        return isEndDate ? moment(startDate) : moment().add(-monthPeriod, 'M');
    }
        
    function maximumDate() {
        //initialise maximum date to the current date using moment
         return moment();
    }



    
    return (
     
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    id={id}
                    label={label}
                    value={value}
                    className="Dates-container"
                    minDate={minimumDate()}
                    maxDate={maximumDate()}
                    onChange={(value) => onDateChange(value)} />
            </MuiPickersUtilsProvider>
      
    )
}

export default DatePicker



