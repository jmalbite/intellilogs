import React, { useState } from 'react';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import BorrowersTableHead from './borrowers.tablehead';
import ItemStatus from './itemstatus.chip';
import ItemInfo from './item.info';
import theme from '../../theme/Theme';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Grid,
  TablePagination,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#EEEEEE',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const useStyles = makeStyles({
  tableContainer: {
    marginTop: '20px',
    height: '75vh',
  },

  table: {
    minWidth: 650,
  },

  moreInfo: {
    fontWeight: 'bold',
    fontSize: '0.75rem',
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 8,
    padding: '3px 10px',
    display: 'inline-block',

    '&:hover, &:focus': {
      cursor: 'pointer',
      backgroundColor: theme.palette.info.light,
    },
  },

  stickyHeader: {
    backgroundColor: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const sortedRowInformation = (rowArray, comparator) => {
  const stabilizedRowArray = rowArray.map((element, index) => [element, index]);
  stabilizedRowArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedRowArray.map((element) => element[0]);
};

const BorrowersData = (props) => {
  const { borrowers } = props;
  const classes = useStyles();
  const [orderDirection, setOrderDirection] = useState('desc');
  const [valueToOrderBy, setValueToOrderBy] = useState('date_time_borrowed');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === 'asc';
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? 'desc' : 'asc');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value), 9);
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          {/* Table Head */}
          <BorrowersTableHead
            valueToOrderBy={valueToOrderBy}
            orderDirection={orderDirection}
            handleRequestSort={handleRequestSort}
          />

          <TableBody>
            {sortedRowInformation(borrowers, getComparator(orderDirection, valueToOrderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((borrower, index) => (
                <StyledTableRow key={borrower.borrowers_id}>
                  <TableCell>
                    {borrower.firstname.toUpperCase()} {borrower.lastname.toUpperCase()}{' '}
                  </TableCell>
                  <TableCell>{borrower.company.toUpperCase()}</TableCell>
                  <TableCell>{borrower.item_borrowed.toUpperCase()}</TableCell>

                  <TableCell>{moment(borrower.date_time_borrowed).format('lll')}</TableCell>

                  <TableCell>
                    {borrower.date_time_returned && moment(borrower.date_time_returned).format('lll')}
                  </TableCell>

                  <TableCell>
                    <ItemInfo
                      info={{
                        handed_by: borrower.handed_by,
                        signature: borrower.borrowers_signature,
                        received_by: borrower.received_by,
                        signature_returned: borrower.borrowers_signature_returned,
                        remarks: borrower.item_remarks,
                        status: borrower.item_status,
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <ItemStatus id={borrower.borrowers_id} status={borrower.item_status} />
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <Grid container justifyContent="center">
          {!borrowers.length && (
            <Typography variant="subtitle1" fontSize="25px">
              No data found!
            </Typography>
          )}
        </Grid>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={borrowers.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleRowsPerPage}
      />
    </>
  );
};

export default BorrowersData;
