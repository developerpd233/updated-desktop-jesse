import React, {useState} from 'react'
import { Table,TableBody, TableCell,TableContainer, TableHead, TableRow, Paper, TablePagination, Box, TableSortLabel, Pagination } from '@mui/material'
// import {DataGrid} from '@mui/x-data-grid'

// import 'jquery/dist/jquery.min.js';

// //Datatable Modules
// import "datatables.net-dt/js/dataTables.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css"

import { TableInterface } from '../../constant/Interface'
import Loader from "react-loader-spinner"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Circle } from '@mui/icons-material'
import { color } from '@mui/system'
const pageSize =3;
const TableComponent:React.FC<TableInterface> = ({columns, rows, loader}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [pagination, setPagination] = useState({
    count:rows.length,
    from:0,
    to: rowsPerPage
  })

 
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    console.log(+event.target.value,"jj")
    setRowsPerPage(+event.target.value)
    setPage(0)
     setPagination({ 
    count:rows.length,
    from:0,
    to: +event.target.value
  });
  }
 
  const data =rows.slice(pagination.from,pagination.to);
  // console.log("^^",pagination.to);
  
  // console.log("@@",data);
  
  return(
    <Paper sx={{background: 'none', marginLeft:10, marginRight:10, height:'min-content', maxHeight:'80vh'}} className='table-scroll'>
      <TableContainer>
        <Table id="example" sx={{ minWidth: 600,height:'100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column:any) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, color:'#fff', fontWeight: 900 }}>{column.label} </TableCell>
              
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              loader ?
              <TableRow>
                <TableCell component="th" scope="row" colSpan={8} rowSpan={3}>
                  <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
                    <Loader type="Bars" color="#DA792D" height={80} width={80}  />
                  </Box>
                </TableCell>
              </TableRow>
              :
              rows.length === 0 ?
              <TableRow>
                <TableCell component="th" scope="row" colSpan={8} rowSpan={3}>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <FontAwesomeIcon icon={faTrashAlt} size="3x" />
                    {/* {errorMessage === 'Network Error' ? <PortableWifiOffIcon style={{ fontSize: 70 }} /> : <FontAwesomeIcon icon={faTrashAlt} size="3x" />} */}
                    <p className="error-text" style={{color:'white'}}>No Records Found</p>
                  </Box>
                </TableCell>
              </TableRow>
              :
              data.map((row:any) => (
                <TableRow  key={row.name}>
                  {columns.map((column:any) => {
                    return(
                    
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, color:'#fff', textTransform: column.textTransform }}>{row[column.id]}</TableCell>
                      
                    )
                  })}
                </TableRow>
              ))
            }
          </TableBody>
          
        </Table>
      </TableContainer>
    
      <TablePagination
        sx={{color:'#fff'}}
        rowsPerPageOptions={[5,10,15, 25,50,75,100]}
        component="div"
        labelDisplayedRows={({ from, to, count }) => ` Displaying rows  ${from}-${to}   of total  ${rows.length} rows`}
       
        // count={Math.ceil(rows.length/pageSize)}
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        {/* <Pagination sx={{color:'#fff'}} count={10} style={{listStyle: 'decimal', color:'white!important'}} /> */}
    
    </Paper>
  )
}

export default TableComponent
