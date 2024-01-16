import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Avatar from "@mui/material/Avatar";
import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TableHead } from "@mui/material";

interface User {
  name: string;
  avatar: string;
  hero_project: string;
  notes: string;
  email: string;
  phone: string;
  rating: string;
  status: boolean;
  id: string;
}
// const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
const TableComponent = ({ rows, setClickCount }: 
  { rows: any[]; setClickCount: React.Dispatch<React.SetStateAction<Record<string, number>>> }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleRowClick = (row: User) => {
    console.log(row.name);
    setClickCount((prevClickCount) => ({
      ...prevClickCount,
      [row.id]: (prevClickCount[row.id] || 0) + 1,
    }));
    window.open(`/notes/${row.id}`);
  };

  return (
    <div className="Table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Avatar</TableCell>
              <TableCell align="right">Hero Project</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => handleRowClick(row)}
                >
                  <TableCell scope="row">{row.name}</TableCell>
                  <TableCell align="right">
                    {<Avatar src={row.avatar}></Avatar>}
                  </TableCell>
                  <TableCell align="right">{row.hero_project}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">{row.rating}</TableCell>
                  <TableCell align="right">
                    {row.status ? "true" : "false"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TableComponent;
