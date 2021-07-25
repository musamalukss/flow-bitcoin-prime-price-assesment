import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import TablePagination from '@material-ui/core/TablePagination'

// 
// Displays daily Bitcoin Price, With
// 
const BitcoinPriceList = ({bitcoinList}) => {

    const classes = useStyles();
    const [page,setPage] = useState(0);
    const [rowsPerPage,setRowsPerPage] = useState(10);
    const [bitcoinLists, setBitcoinList] = useState({})
    


    const handleChangePage = (event,newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value,10));
        setPage(0);
    }

    useEffect(() => {      
        setBitcoinList(bitcoinList);
       
    }, [JSON.stringify(bitcoinList)])

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell >Price</StyledTableCell>
                        <StyledTableCell>Prime Number</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>


                    {bitcoinList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage )
                    .map((item, index) => {
                        return <StyledTableRow key={`item-${index}`}>

                            <StyledTableCell component="th" scope="row" >{moment(item.date).format('DD-MM-YYYY')}</StyledTableCell>
                            <StyledTableCell >{formatCurrenyType.format(item.value)}</StyledTableCell>
                            <StyledTableCell style={{ color: item.isPrime ? '#FF7418' : '#000' }}> {item.isPrime ? 'Yes' : 'No'}</StyledTableCell>

                        </StyledTableRow>
                    })}

                </TableBody>
            </Table>
            <TablePagination
            rowsPerPageOptions = {[10,20]}
            component = "div"
            count = {bitcoinList.length}
            rowsPerPage= {rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowPerPage= {handleChangeRowsPerPage}
            />



        </TableContainer>
    );
}


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 16,
    },
}))(TableCell);

const formatCurrenyType = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);




const useStyles = makeStyles({
    table: {
        minWidth: 900,
    },
});




export default BitcoinPriceList
