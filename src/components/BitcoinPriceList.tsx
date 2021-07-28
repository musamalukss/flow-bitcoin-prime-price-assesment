import React, { useState, useEffect, FC } from 'react';
import { withStyles, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import TablePagination from '@material-ui/core/TablePagination'

interface Props {
  bitcoinList: {
    date: string,
    value: number,
    isPrime: boolean

  }[]
}

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const formatCurrenyType = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});


/**
 * BitcoinPriceList Component renders Table with a list of daily bitcoin prices
 * @param Bitcoinlist as a prop 
 * @returns 
 */


const BitcoinPriceList: FC<Props> = ({ bitcoinList }) => {

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [bitcoinLists, setBitcoinList] = useState([{ date: "", value: 0, isPrime: false }])

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }


  useEffect(() => {
    setBitcoinList(bitcoinList);
    return () => {
      setPage(0);
    };
  }, [bitcoinList]);

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
          {bitcoinLists.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
        component="div"
        count={bitcoinList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />



    </TableContainer>
  );
}

export default BitcoinPriceList
