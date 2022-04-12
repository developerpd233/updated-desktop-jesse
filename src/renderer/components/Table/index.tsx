import React, {useState} from 'react'
import { Table,TableBody, TableCell,TableContainer, TableHead, TableRow, Paper, TablePagination, Box } from '@mui/material'
import { TableInterface } from '../../constant/Interface'
import Loader from "react-loader-spinner"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PortableWifiOffIcon from '@mui/icons-material/PortableWifiOff'
import {  faTrashAlt } from '@fortawesome/free-solid-svg-icons'
const TableComponent:React.FC<TableInterface> = ({columns, rows, loader}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(+event.target.value,"jj")
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return(
    <Paper sx={{background: 'rgba(235, 237, 239, 0.2)', borderRadius:4, marginLeft:10, marginRight:10, height:'min-content', maxHeight:'80vh', overflowY:'scroll'}} className='table-scroll'>
      <TableContainer>
        <Table sx={{ minWidth: 650,height:'100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column:any) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, color:'#fff', fontWeight: 900 }}>{column.label}</TableCell>
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
                  <Box display="flex" justifyContent="center" flexDirection='column' alignItems="center">
                    <FontAwesomeIcon icon={faTrashAlt} size="3x" />
                    {/* {errorMessage === 'Network Error' ? <PortableWifiOffIcon style={{ fontSize: 70 }} /> : <FontAwesomeIcon icon={faTrashAlt} size="3x" />} */}
                    <p className="error-text">No Records Found</p>
                  </Box>
                </TableCell>
              </TableRow>
              :
              rows.map((row:any) => (
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
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableComponent
